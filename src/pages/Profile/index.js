import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '~/components/AuthContext/firebase';
import classNames from 'classnames/bind';

import ModalEditProfile from '~/layouts/components/AccountProfile/ModalEditProfile';
import styles from '~/layouts/components/AccountProfile/AccountProfile.module.scss';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import VideoItem from '~/components/VideoItem/VideoItem';
import { UserAuth } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();
    const { userInfo } = UserAuth();
    // người đang đăng nhập

    console.log(userInfo);
    let { username } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState({});
    const [videoList, setVideoList] = useState([]);
    const [isFollow, setFollow] = useState(false);
    // const [followingList, setFollowingList] = useState([]);

    console.log(username);
    // Là user mà xem thông tin
    const userRef = query(collection(db, 'user_video'), where('username', '==', username));

    useEffect(() => {
        if (username == 'undefined') {
            const ngu = () => {
                setUser(userInfo);
                setVideoList(userInfo.video);
            };
            ngu();
        } else {
            console.log('try1');
            try {
                const ngu = async () => {
                    const querySnapshot = await getDocs(userRef);
                    console.log('nguu');
                    querySnapshot.forEach((element) => {
                        console.log(element.data());
                        setUser(element.data());
                        setVideoList(element.data().video);
                    });
                };
                ngu();
            } catch (error) {}
        }
    }, [userInfo, username]);

    const videoRef = doc(db, 'user_video', `${user?.user_id}`);
    const deleteVideo = async (passId) => {
        try {
            const result = videoList.filter((item) => item.video_id != passId);
            await updateDoc(videoRef, {
                video: result,
            });
        } catch (e) {}
    };

    useEffect(() => {
        const followingRef = query(collection(db, 'user_video'), where('following', 'array-contains', username));

        const ngu = async () => {
            try {
                const result = await getDocs(followingRef);
                // có result.docs.length > 0 thì mới có doc.data()
                result.forEach((doc) => {
                    if (doc?.data().username == userInfo.username) {
                        setFollow(true);
                    } else {
                        setFollow(false);
                    }
                });
                // if (result.docs.length == 0) {
                //     setFollow(false);
                // } else setFollow(true);
            } catch (error) {
                console.log(error);
            }
        };
        ngu();
    }, [username, isFollow, userInfo.following?.length]);

    // Lỗi unfollow, follow

    const handleUnFollow = async () => {
        const followingRef = doc(db, 'user_video', `${userInfo?.user_id}`);
        console.log(followingRef);
        if (isFollow) {
            const index = userInfo.following.indexOf(username);
            console.log(index);
            console.log(userInfo.following);

            if (index > -1) {
                const result = userInfo.following;
                result.splice(index, 1);
                console.log(result);

                await updateDoc(followingRef, {
                    following: result,
                });

                setFollow(false);
            }
        } else {
        }
    };

    const handleFollow = async () => {
        const followingRef = doc(db, 'user_video', `${userInfo?.user_id}`);
        if (isFollow == false) {
            userInfo.following.push(user.username); // push trả về length
            const result = userInfo.following;
            console.log(result);

            await updateDoc(followingRef, {
                following: result,
            });

            setFollow(true);
        }
    };

    const handleMessages = async () => {
        const messRef = doc(db, 'userChats', userInfo.username);
        const chatRef = doc(db, 'chats', `${userInfo.username}${user.username}`);

        const docSnap = await getDoc(messRef);
        if (docSnap.exists()) {
            navigate('/messages');
        } else {
            setDoc(messRef, {
                date: new Date(),
                userChats: {
                    avatar: user.avatar,
                    user_id: user.user_id,
                    username: user.username,
                },
            });
            setDoc(chatRef, {
                messages: [],
            });
            navigate('/messages');
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('user-page')}>
                    <div className={cx('user-header')}>
                        <div className={cx('avatar')}>
                            <img className={cx('avatar-img')} src={user.avatar} />
                        </div>
                        <div>
                            <h1 className={cx('nickname')}>{user.username}</h1>
                            <h3 className={cx('username')}>{user.nickname}</h3>

                            {userInfo?.user_id != user.user_id ? (
                                <div className={cx('button-container')}>
                                    {isFollow ? (
                                        <>
                                            <Button outline onClick={handleMessages}>
                                                Messages
                                            </Button>
                                            <Button onClick={handleUnFollow} primary>
                                                Unfollow
                                            </Button>
                                        </>
                                    ) : (
                                        <Button onClick={handleFollow} primary>
                                            Follow
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <Button text leftIcon={<FontAwesomeIcon icon={faEdit} />} onClick={() => setModalShow(true)}>
                                    Edit profile
                                </Button>
                            )}
                        </div>
                    </div>
                    <h3 className={cx('info')}>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{user.following?.length}</strong> <span className={cx('des')}>Following</span>
                        </div>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{user.followers}</strong> <span className={cx('des')}>Followers</span>
                        </div>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{user.like}</strong> <span className={cx('des')}>Likes</span>
                        </div>
                    </h3>
                    <h3 className={cx('nickname')}>{user.bio || 'No bio yet.'}</h3>

                    <div className={cx('user-layout')}>
                        <div className={cx('tag-contain')}>
                            <p className={cx('tag', 'tag1')}>Videos</p>
                            <p className={cx('tag', 'tag2')}>Liked</p>
                            <div className={cx('w230')}></div>
                        </div>
                        <div className={cx('video-contain')}>
                            <div className={cx('video-list')}>
                                {videoList?.map((video) => (
                                    <VideoItem
                                        key={video.video_id}
                                        video={video}
                                        deleteVideo={deleteVideo}
                                        // nếu khong phải người đang đăng nhập thì khong thể hiện nút xóa
                                        user={user}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalEditProfile modalIsOpen={modalShow} handleCloseModal={() => setModalShow(false)} />
        </>
    );
}

// đang suy nghĩ thử là Link theo nickname thì nó sẽ có prop và truyền qua như thế kia được

export default Profile;
