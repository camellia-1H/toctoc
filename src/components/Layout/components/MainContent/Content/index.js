import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from '../MainContent.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

const Avatar = ({ data }) => {
    return (
        <Link to={`/@${data.id}`}>
            <Image className={cx('avatar')} src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt="" />
        </Link>
    );
};

const VideoContent = ({ data }) => {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('des')}>
                <Link to={`/@${data.id}`} className={cx('des-user')}>
                    <h3 className={cx('name')}>{data.title}</h3>
                    <p className={cx('nickname')}>{data.id}</p>
                    <span>.</span>
                    <span>2-11</span>
                </Link>
                <div className={cx('des-hastag')}>
                    <span className={cx('descipt')}>{data.overview}</span>
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
                <div>
                    <video
                        ref={videoRef}
                        className={cx('video-moe')}
                        src="https://player.vimeo.com/external/394718464.sd.mp4?s=e369f0eda883f16d097c348d9be0a5a7a3baf7e0&profile_id=165&oauth2_token_id=57447761"
                        loop
                        // controls
                        // autoPlay
                        onClick={handlePlay}
                    ></video>
                </div>
                <div className={cx('list-icon')}>
                    <button className={cx('btn-icon')}>
                        <p className={cx('icon-con')}>
                            <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                        </p>
                        <h3 className={cx('quantity')}>55.1k</h3>
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