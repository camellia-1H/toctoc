import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';

import styles from '../MainContent.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import { config } from '~/config';
const cx = classNames.bind(styles);

const Avatar = ({ data }) => {
    // const { username = data.user.username } = useParams();
    // const params = useParams();
    // const username = params.data.user.username;
    // let {nickname}
    // params
    return (
        // <Link to={`/@${data.user.username}`}>

        <Link to={config.routes.profileLink(data.user.username)}>
            <Image className={cx('avatar')} src={data.user.avatar} alt="m ngu" />
        </Link>
    );
};

const VideoContent = ({ data }) => {
    const handleVideoPlay = (e) => {
        e.target.play();
    };

    const handleVideoPause = (e) => {
        e.target.pause();
        e.target.currentTime = 0;
    };
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('des')}>
                <Link to={config.routes.profileLink(data.user.username)} className={cx('des-user')}>
                    <h3 className={cx('name')}>{data.user.username}</h3>
                    <p className={cx('nickname')}>{data.user.nickname}</p>
                    <span>.</span>
                    <span>2-11</span>
                </Link>
                <div className={cx('des-hastag')}>
                    <span className={cx('descipt')}>{data.video[0].des}</span>
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
                    <button className={cx('btn-icon')}>
                        <p className={cx('icon-con')}>
                            <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                        </p>
                        <h3 className={cx('quantity')}>{data.video[0].play_count}</h3>
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
            <Button small outline className={cx('btn')}>
                Follow
            </Button>
            <VideoContent data={data} />
        </div>
    );
}

export default Content;
