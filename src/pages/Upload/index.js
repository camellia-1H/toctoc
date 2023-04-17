import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '~/components/AuthContext/firebase';
import { addDoc, arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';

import DropFileInput from '~/components/DropFileInput/DropFileInput';
import Button from '~/components/Button/Button';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [fileURL, setFileURL] = useState(null);

    const [file, setFile] = useState(null);
    const [des, setDes] = useState('');

    const onFileChange = (files) => {
        const currentFile = files[0];
        setFile(currentFile);
        console.log(files);
    };

    const uploadToDatabase = async (url) => {
        const userRef = doc(db, 'user_video', user?.email);
        await updateDoc(userRef, {
            video: arrayUnion({
                video_id: `${user.email}${Math.floor(Math.random() * 100)}`,
                play: url,
                cover: url,
                play_count: 0,
                des: des,
                isPrivate: false,
                isPublic: true,
            }),
        });
    };

    const handleClick = (e) => {
        if (file === null) return;
        const fileRef = ref(storage, `videos/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                console.log('Tải lên khong thành công');
                alert('Tải lên khong thành công');
            },
            () => {
                console.log('success!!');
                alert('Đã tải lên thành công');
                navigate('/');
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    uploadToDatabase(downloadURL);
                    setFileURL(downloadURL);
                    console.log(downloadURL);
                });
            },
        );
    };

    // const handleVideoPlay = (e) => {
    //     e.target.play();
    // };

    // const handleVideoPause = (e) => {
    //     e.target.pause();
    //     e.target.currentTime = 0;
    // };
    return (
        <>
            <DropFileInput onFileChange={(files) => onFileChange(files)} />
            <div style={{ textAlign: 'center' }}>
                <input
                    onChange={(e) => setDes(e.target.value)}
                    type="text"
                    placeholder="something about video"
                    style={{
                        margin: 'auto',
                        marginBottom: '10px',
                        marginTop: '10px',
                        background: 'transparent',
                        width: '500px',
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 8px',
                        borderRadius: '8px',
                    }}
                />
                <Button primary onClick={handleClick}>
                    Upload
                </Button>
            </div>
            {/* {fileURL && <video onMouseEnter={handleVideoPlay} onMouseLeave={handleVideoPause} loop src={fileURL} width={200} height={200}></video>} */}
        </>
    );
}

export default Upload;
