import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
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
    const [videoLikes, setVideoLikes] = useState([]);
    const [isFollow, setFollow] = useState(false);

    // profile hiện video đăng, đã like
    const [isShow, setShow] = useState(true);

    // const [followingList, setFollowingList] = useState([]);

    console.log(username);
    // Là user mà xem thông tin
    const userRef = query(collection(db, 'user_video'), where('username', '==', username));

    useEffect(() => {
        if (username == 'undefined') {
            const ngu = () => {
                setUser(userInfo);
                setVideoList(userInfo.video);
                setVideoLikes(userInfo.like);
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

    const handleUnFollow = async () => {
        const followingRef = doc(db, 'user_video', `${userInfo?.user_id}`);
        const followerRef = doc(db, 'user_video', `${user?.user_id}`);

        if (isFollow) {
            const indexFollower = user.followers.indexOf(userInfo.username);
            // số lượt follower
            if (indexFollower > -1) {
                const resultFollower = user.followers;
                resultFollower.splice(indexFollower, 1);
                console.log(resultFollower);

                await updateDoc(followerRef, {
                    followers: resultFollower,
                });
                setFollow(false);
            }

            const index = userInfo.following.indexOf(username);
            // số lượt following
            if (index > -1) {
                const result = userInfo.following;
                result.splice(index, 1);
                console.log(result);

                await updateDoc(followingRef, {
                    following: result,
                });

                setFollow(false);
            }
        }
    };

    const handleFollow = async () => {
        const followingRef = doc(db, 'user_video', `${userInfo?.user_id}`);
        const followerRef = doc(db, 'user_video', `${user?.user_id}`);

        if (isFollow == false) {
            userInfo.following.push(user.username); // push trả về length
            const result = userInfo.following;
            console.log(result);

            await updateDoc(followingRef, {
                following: result,
            });

            setFollow(true);
        }
        user.followers.push(userInfo.username); // push trả về length
        const resultFollower = user.followers;
        console.log(resultFollower);

        await updateDoc(followerRef, {
            followers: resultFollower,
        });
    };

    const handleMessages = async () => {
        const messRef = doc(db, 'userChats', userInfo.username);
        const combineId = userInfo.username > user.username ? userInfo.username + user.username : user.username + userInfo.username;
        const chatRef = doc(db, 'chats', combineId);
        const docSnap = await getDoc(messRef);
        const docSnapChat = await getDoc(chatRef);

        if (docSnap.exists()) {
            await updateDoc(doc(db, 'userChats', userInfo.username), {
                [combineId + '.userData']: {
                    avatar: user.avatar,
                    user_id: user.user_id,
                    username: user.username,
                    nickname: user.nickname,
                },
                [combineId + '.date']: serverTimestamp(),
            });
            navigate('/messages', {
                state: {
                    follow: userInfo.following.indexOf(user.username) > -1 && user.following.indexOf(userInfo.username) > -1 ? true : false,
                },
            });
        } else {
            await setDoc(doc(db, 'userChats', userInfo.username), {
                [combineId]: {
                    userData: {
                        avatar: user.avatar,
                        user_id: user.user_id,
                        username: user.username,
                        nickname: user.nickname,
                    },
                    date: serverTimestamp(),
                },
            });
            // navigate('/messages');
        }
        if (docSnapChat.exists()) {
            navigate('/messages', {
                state: {
                    follow: userInfo.following.indexOf(user.username) > -1 && user.following.indexOf(userInfo.username) > -1 ? true : false,
                },
            });
        } else {
            await setDoc(chatRef, {
                messages: [],
            });
        }
        navigate('/messages', {
            state: {
                follow: userInfo.following.indexOf(user.username) > -1 && user.following.indexOf(userInfo.username) > -1 ? true : false,
            },
        });
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
                            <strong className={cx('number')}>{user.followers?.length}</strong> <span className={cx('des')}>Followers</span>
                        </div>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{user.like?.length}</strong> <span className={cx('des')}>Likes</span>
                        </div>
                    </h3>
                    <h3 className={cx('nickname')}>{user.bio || 'No bio yet.'}</h3>

                    <div className={cx('user-layout')}>
                        <div className={cx('tag-contain')}>
                            <p className={cx('tag', 'tag1')} onClick={() => setShow(true)}>
                                Videos
                            </p>
                            <p className={cx('tag', 'tag2')} onClick={() => setShow(false)}>
                                Liked
                            </p>
                            <div className={isShow ? cx('w230') : cx('w2302')}></div>
                        </div>
                        <div className={cx('video-contain')}>
                            {/* hiện video mình đăng tải, và video của người khác đã like */}
                            {isShow ? (
                                <div className={cx('video-list')}>
                                    {videoList?.map((video) => (
                                        <VideoItem
                                            key={video.video_id}
                                            video={video}
                                            deleteVideo={deleteVideo}
                                            // nếu khong phải người đang đăng nhập thì khong thể hiện nút xóa video ở phần đã đăng
                                            user={user}
                                            isShow={isShow}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className={cx('video-list')}>
                                    {videoLikes?.map((video) => (
                                        <VideoItem
                                            key={video.video_id}
                                            video={video}
                                            deleteVideo={deleteVideo}
                                            // nếu khong phải người đang đăng nhập thì khong thể hiện nút xóa
                                            user={user}
                                            isShow={isShow}
                                        />
                                    ))}
                                </div>
                            )}
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
