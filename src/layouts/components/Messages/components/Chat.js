import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '~/components/AuthContext/firebase';

import styles from '../Messages.module.scss';
import MessageContent from './MessageContent';
import { UserChat } from '../ChatContext/ChatContext';
import { v4 as uuid } from 'uuid';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const cx = classNames.bind(styles);

function Chat() {
    const { userInfo } = UserAuth();
    const { data } = UserChat();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);

    const handleSend = async () => {
        if (file) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                // 'state_changed',
                (error) => {
                    // console.log('Tải lên khong thành công');
                    alert('Tải lên khong thành công');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                sender: userInfo.username,
                                time: Timestamp.now(),
                                file: downloadURL,
                            }),
                        });
                    });
                },
            );
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    sender: userInfo.username,
                    time: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db, 'userChats', userInfo.username), {
            [data.chatId]: {
                lastMessage: text,
                date: serverTimestamp(),
                userData: data.userData,
            },
        });
        setText('');
        setFile(null);
    };

    console.log(file);

    useEffect(() => {
        const ngu = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            console.log(doc.data());
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => ngu();
    }, [data.chatId]);
    console.log(messages);

    return (
        <div className={cx('chat-container')}>
            <div>
                <div className={cx('chat-item')}>
                    <img className={cx('avatar')} src={data.userData.avatar} alt="mg" />
                    <div className={cx('info')}>
                        <h4 style={{ fontWeight: '600', fontSize: '18px' }}>{data?.userData.username}</h4>
                        <p style={{ color: 'gray', fontSize: '14px' }}>{data?.userData.nickname}</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: '10px', overflow: 'hidden' }}>
                <div style={{ height: '420px', overflowY: 'auto' }}>
                    {messages.map((message) => (
                        <MessageContent key={uuid()} message={message} />
                    ))}
                </div>
            </div>

            <div className={cx('input')}>
                <input
                    className={cx('input-text')}
                    value={text}
                    type="text"
                    placeholder="type message...."
                    onChange={(e) => setText(e.target.value)}
                />
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon style={{ fontSize: '15px' }} icon={faLink} />
                    <input
                        className={cx('input-file')}
                        type="file"
                        accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <button onClick={handleSend} style={{ backgroundColor: 'transparent' }}>
                    <FontAwesomeIcon style={{ fontSize: '18px', color: 'red' }} icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}

export default Chat;
