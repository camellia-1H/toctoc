import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AccountProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { updateDoc, doc, onSnapshot, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '~/components/AuthContext/firebase';

import Button from '~/components/Button/Button';
import * as videoService from '~/services/videoService';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import VideoItem from '~/components/VideoItem/VideoItem';
import ModalEditProfile from './ModalEditProfile';

const cx = classNames.bind(styles);

function AccountProfile() {
    const { user, userInfo } = UserAuth();
    console.log(user);
    console.log(userInfo);

    const [videoList, setVideoList] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await videoService.getVideo();

    //         setVideoList(result);
    //     };
    //     fetchApi();
    //     console.log(videoList);
    // }, []);

    // tương tự như kiểu like video ấy
    const [saved, setSaved] = useState(false);

    const videoId = doc(db, 'user_video', `${user?.email}`);

    // const upload = async () => {
    //     if (user?.email) {
    //         setSaved(true);
    //         await updateDoc(videoId, {
    //             video: arrayUnion({
    //                 video_id: '2',
    //                 play: 'https://yt3.ggpht.com/VWBZ360UFEUxVD-Udx81wsl2QpcMwWIievwhz34vRdACTr7S_tVkflfCzV2tOoOo_Fy95URJmQ=s88-c-k-c0x00ffffff-no-rj',
    //                 cover: 'https://yt3.ggpht.com/VWBZ360UFEUxVD-Udx81wsl2QpcMwWIievwhz34vRdACTr7S_tVkflfCzV2tOoOo_Fy95URJmQ=s88-c-k-c0x00ffffff-no-rj',
    //                 play_count: 200,
    //                 des: 'nguu2',
    //                 isPrivate: false,
    //                 isPublic: true,
    //             }),
    //         });
    //     } else {
    //         alert('dang nhap di da');
    //     }
    // };

    // const update = async () => {
    //     if (user?.email) {
    //         await updateDoc(videoId, {
    //             'video.play_count': 200,
    //         });
    //     }
    // };

    const deleteVideo = async (passId) => {
        try {
            const result = videoList.filter((item) => item.video_id != passId);
            await updateDoc(videoId, {
                video: result,
            });
        } catch (e) {}
    };

    useEffect(() => {
        onSnapshot(doc(db, 'user_video', `${user?.email}`), (doc) => {
            setVideoList(doc.data()?.video);
        });
    }, [user?.email]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('user-page')}>
                    <div className={cx('user-header')}>
                        <div className={cx('avatar')}>
                            <img className={cx('avatar-img')} src={userInfo.avatar} />
                        </div>
                        <div>
                            <h1 className={cx('nickname')}>{userInfo.nickname}</h1>
                            <h3 className={cx('username')}>{userInfo.username}</h3>
                            <Button text leftIcon={<FontAwesomeIcon icon={faEdit} />} onClick={() => setModalShow(true)}>
                                Edit profile
                            </Button>
                        </div>
                    </div>
                    <h3 className={cx('info')}>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{userInfo.following}</strong> <span className={cx('des')}>Following</span>
                        </div>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{userInfo.followers}</strong> <span className={cx('des')}>Followers</span>
                        </div>
                        <div className={cx('mr')}>
                            <strong className={cx('number')}>{userInfo.like}</strong> <span className={cx('des')}>Likes</span>
                        </div>
                    </h3>
                    <h3 className={cx('nickname')}>{userInfo.bio || 'No bio yet.'}</h3>

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

export default AccountProfile;
