import ReactModal from 'react-modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, db } from '~/components/AuthContext/firebase';

import classNames from 'classnames/bind';
import styles from './AccountProfile.module.scss';
import { CloseModalIcon } from '~/components/Icons';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        inset: '50% auto auto 50%',
        minWidth: '700px',
        // innerHeightHeight: '550',
        // maxHeight: 'min((100vh - 96px) - 40px, 734px)',
        // maxHeight: '630px',
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
        overFlowY: 'hidden',
    },
};

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// provider.setCustomParameters({
//     login_hint: 'user@example.com',
// });

function ModalEditProfile({ modalIsOpen, handleCloseModal }) {
    const { userInfo, user } = UserAuth();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(userInfo.username);
    const [nickname, setNickname] = useState(userInfo.nickname);
    const [bio, setBio] = useState(userInfo.bio);

    const onFileChange = (e) => {
        const currentFile = e.target.files[0];
        setFile(currentFile);
        console.log(currentFile);
    };

    const uploadToDatabase = async (url) => {
        const userRef = doc(db, 'user_video', user?.email);
        await updateDoc(userRef, {
            avatar: `${url ? url : userInfo.avatar}`,
            bio: bio,
            followers: userInfo.followers,
            following: userInfo.following,
            like: userInfo.followers,
            nickname: nickname,
            user_id: userInfo.user_id,
            username: username,
        });
    };

    const handleClick = (e) => {
        if (file === null) {
            uploadToDatabase(null);
            navigate('/');
        } else {
            const fileRef = ref(storage, `files/${file.name}`);
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
                    navigate('/');
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        uploadToDatabase(downloadURL);
                        setFile(downloadURL);
                        console.log(downloadURL);
                    });
                },
            );
        }
    };

    return (
        <ReactModal isOpen={modalIsOpen} style={customStyles}>
            <div className={cx('container')}>
                <div className={cx('profile-head')}>
                    <h2 className={cx('title-head')}>Edit Profile</h2>
                    <Button className={cx('modal-close')} onClick={handleCloseModal}>
                        <CloseModalIcon />
                    </Button>
                </div>

                <div className={cx('profile-container')}>
                    <div className={cx('profile-photo')}>
                        <div className={cx('title')}>Profile photo</div>
                        <div className={cx('moe')}>
                            <div className={cx('profile-img-container')}>
                                <img className={cx('profile-img')} src={userInfo.avatar} alt="m ngu" />
                            </div>
                            <div className={cx('profile-edit')}>
                                <FontAwesomeIcon icon={faEdit} style={{ fontWeight: '400' }} />
                                <input className={cx('file-input')} type="file" accept=".jpg,.jpeg,.png,.tiff,.heic,.webp" onChange={onFileChange} />
                            </div>
                        </div>

                        {file && (
                            <div className={cx('d-flex')}>
                                <FontAwesomeIcon icon={faArrowRight} beat className={cx('icon')} />
                                <div className={cx('profile-img-container')}>
                                    <img className={cx('profile-img')} src={file} alt="m nguu" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={cx('profile-username')}>
                        <div className={cx('title-username')}>Username</div>
                        <div style={{ maxWidth: '382px' }}>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                defaultValue={userInfo?.username}
                                className={cx('text-input')}
                                type="text"
                                placeholder="username"
                            />
                            <span style={{ color: 'gray', fontSize: '13px' }}>
                                Usernames can only contain letters, numbers, underscores, and periods. Changing your username will also change your
                                profile link.
                            </span>
                        </div>
                    </div>
                    <div className={cx('profile-nickname')}>
                        <div className={cx('title-username')}>Nickname</div>
                        <div style={{ width: '382px', maxWidth: '382px' }}>
                            <input
                                onChange={(e) => setNickname(e.target.value)}
                                defaultValue={userInfo?.nickname}
                                className={cx('text-input')}
                                type="text"
                                placeholder="nickname"
                            />
                            <span style={{ color: 'gray', fontSize: '13px' }}>Your nickname can only be changed once every 7 days.</span>
                        </div>
                    </div>
                    <div className={cx('profile-bio')}>
                        <div className={cx('title-username')}>Bio</div>
                        <div style={{ maxWidth: '382px' }}>
                            <textarea
                                onChange={(e) => setBio(e.target.value)}
                                className={cx('text-input')}
                                rows="7"
                                cols="50"
                                placeholder="Bio"
                                defaultValue={userInfo.bio}
                            />
                        </div>
                    </div>
                    <div className={cx('profile-btn')}>
                        <Button text onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button primary onClick={handleClick}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}

export default ModalEditProfile;
