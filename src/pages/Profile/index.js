import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '~/components/AuthContext/firebase';
import classNames from 'classnames/bind';

import AccountProfile from '~/layouts/components/AccountProfile/AccountProfile';
import ModalEditProfile from '~/layouts/components/AccountProfile/ModalEditProfile';
import styles from '~/layouts/components/AccountProfile/AccountProfile.module.scss';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import VideoItem from '~/components/VideoItem/VideoItem';
import { UserAuth } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

function Profile() {
    // const params = useParams();
    // console.log(params?.username);
    // return <AccountProfile />;
    const { userInfo } = UserAuth();

    console.log(userInfo);
    let { username } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState({});
    const [videoList, setVideoList] = useState([]);

    console.log(username);
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
    }, [userInfo]);

    const videoRef = doc(db, 'user_video', `${user?.user_id}`);
    const deleteVideo = async (passId) => {
        try {
            const result = videoList.filter((item) => item.video_id != passId);
            await updateDoc(videoRef, {
                video: result,
            });
        } catch (e) {}
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
                            <h1 className={cx('nickname')}>{user.nickname}</h1>
                            <h3 className={cx('username')}>{user.username}</h3>

                            {userInfo?.user_id != user.user_id ? (
                                <Button primary>Follow</Button>
                            ) : (
                                <Button text leftIcon={<FontAwesomeIcon icon={faEdit} />} onClick={() => setModalShow(true)}>
                                    Edit profile
                                </Button>
                            )}
                        </div>
                    </div>
                    <h3 className={cx('info')}>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{user.following}</strong> <span className={cx('des')}>Following</span>
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
                                    <VideoItem key={video.video_id} video={video} deleteVideo={deleteVideo} />
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
