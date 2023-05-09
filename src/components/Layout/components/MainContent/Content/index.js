import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { storage, db } from '~/components/AuthContext/firebase';

import styles from '../MainContent.module.scss';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import { config } from '~/config';
import { UserAuth } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

const Avatar = ({ data }) => {
    // const { username = data.user.username } = useParams();
    // const params = useParams();
    // const username = params.data.user.username;
    // let {nickname}
    // params
    return (
        // <Link to={`/@${data.user.username}`}>

        <Link to={config.routes.profileLink(data.username)}>
            <Image className={cx('avatar')} src={data.avatar} alt="m ngu" />
        </Link>
    );
};

const VideoContent = ({ data }) => {
    const { userInfo } = UserAuth();
    // console.log(userInfo);

    const handleVideoPlay = (e) => {
        e.target.play();
    };

    const handleVideoPause = (e) => {
        e.target.pause();
        e.target.currentTime = 0;
    };

    const [isLike, setLike] = useState(false);
    // const [countLike, setCountLike] = useState(data.video[0].)

    const handleLike = async () => {
        const userRef = doc(db, 'user_video', userInfo?.user_id);
        if (isLike) {
            let spliceIndex = -1;
            userInfo.like.map(async (liked, index) => {
                if (liked.video_id == data.video[0].video_id) {
                    spliceIndex = index;
                }
            });
            console.log(spliceIndex);

            if (spliceIndex > -1) {
                userInfo.like.splice(spliceIndex, 1);
                await updateDoc(userRef, {
                    like: userInfo.like,
                });
                console.log('eo lai nuwa');
                setLike(false);
            }
        } else {
            await updateDoc(userRef, {
                like: arrayUnion({
                    video_id: data.video[0].video_id,
                    play: data.video[0].play,
                    cover: data.video[0].cover,
                    play_count: data.video[0].play_count,
                    des: data.video[0].des,
                }),
            });
            setLike(true);
            console.log('da lai');
        }
    };

    // const handleLike = () => {
    //     if (isLike) {
    //         setLike(false);
    //         setCountLike((preCount) => (preCount -= 1));
    //     } else {
    //         setLike(true);
    //         setCountLike((preCount) => (preCount += 1));
    //     }
    // };

    useEffect(() => {
        console.log(data);
        const ngu = async () => {
            console.log('da goi');
            await updateDoc(doc(db, 'user_video', data?.user_id), {
                like: data.like,
            });
        };
        ngu();
    }, [data.like.length]);

    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('des')}>
                <Link to={config.routes.profileLink(data.username)} className={cx('des-user')}>
                    <h3 className={cx('name')}>{data.username}</h3>
                    <p className={cx('nickname')}>{data.nickname}</p>
                    <span>.</span>
                    <span>2-11</span>
                </Link>
                <div className={cx('des-hastag')}>
                    <span className={cx('descipt')}>{data.video.length > 0 ? data.video[0].des : ''}</span>
                    <Link to="/upload" className={cx('hastag')}>
                        #ngu
                    </Link>
                    <Link to="/upload" className={cx('hastag')}>
                        #ngu
                    </Link>
                </div>
                <div className={cx('des-music')}>
                    <FontAwesomeIcon icon={faMusic} />
                    <a href="#">
                        <h4>In the middle night</h4>
                    </a>
                </div>
            </div>

            <div className={cx('video')}>
                <div style={{ height: '400px' }}>
                    <video
                        // ref={videoRef}
                        className={cx('video-moe')}
                        onMouseEnter={handleVideoPlay}
                        onMouseLeave={handleVideoPause}
                        src={data.video[0].play}
                        loop
                        poster={data.video[0].cover}
                        // controls
                        // autoPlay
                    ></video>
                </div>

                <div className={cx('list-icon')}>
                    <button className={cx('btn-icon')} onClick={handleLike}>
                        <p className={isLike ? cx('icon-active') : cx('icon-con')}>
                            <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                        </p>
                        <h3 className={cx('quantity')}>{data.like.length}</h3>
                    </button>
                    <button className={cx('btn-icon')}>
                        <p className={cx('icon-con')}>
                            <FontAwesomeIcon icon={faComment} className={cx('icon')} />
                        </p>
                        <h3 className={cx('quantity')}>55.1k</h3>
                    </button>
                    <button className={cx('btn-icon')}>
                        <p className={cx('icon-con')}>
                            <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                        </p>
                        <h3 className={cx('quantity')}>55.1k</h3>
                    </button>
                </div>
            </div>
        </div>
    );
};

function Content({ data }) {
    return (
        <div className={cx('container')}>
            <Avatar data={data} />
            {/* <Button small outline className={cx('btn')}>
                Follow
            </Button> */}
            <VideoContent data={data} />
        </div>
    );
}

export default Content;
