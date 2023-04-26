import { useEffect, useState } from 'react';
import { doc, onSnapshot, query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '~/components/AuthContext/firebase';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import { UserChat } from '../ChatContext/ChatContext';

import classNames from 'classnames/bind';
import styles from '../Messages.module.scss';
const cx = classNames.bind(styles);

function SidebarMes() {
    const { userInfo } = UserAuth();
    const { dispatch, userFollow } = UserChat();
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const ngu = onSnapshot(doc(db, 'userChats', userInfo.username), (doc) => {
            setChatList(doc.data());
        });
        return () => ngu();
    }, [userInfo.username]);

    const handleSelect = (userData) => {
        dispatch({ type: 'CHANGE_USER', payload: userData });
    };

    // Object.entries(chatList).map((chat) => console.log(chat[1].date.toDate().toString()));
    console.log(chatList);

    return (
        <div className={cx('sidebar')}>
            <div className={cx('user-info')}>
                <img className={cx('avatar')} src={userInfo?.avatar} alt="mg" />
                <h2 style={{ margin: '0 20px' }}>Messages</h2>
            </div>
            <div className={cx('chat-lists')}>
                {Object.entries(chatList)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        <div key={chat[0]} className={cx('chat-item')} onClick={() => handleSelect(chat[1].userData)}>
                            <img className={cx('avatar')} src={chat[1].userData.avatar} alt="mg" />
                            <div className={cx('info')}>
                                <h4 style={{ fontWeight: '600' }}>{chat[1].userData.username}</h4>
                                <p style={{ color: 'gray', fontSize: '13px' }}>{chat[1]?.lastMessage}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SidebarMes;
