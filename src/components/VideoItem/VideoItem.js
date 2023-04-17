import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import { PlayVideo } from '~/components/Icons';

const cx = classNames.bind(styles);

function VideoItem({ video, deleteShow }) {
    const handleVideoPlay = (e) => {
        e.target.play();
    };

    const handleVideoPause = (e) => {
        e.target.pause();
        e.target.currentTime = 0;
    };
    return (
        <div className={cx('video-item')}>
            <video onMouseEnter={handleVideoPlay} onMouseLeave={handleVideoPause} src={video.play} loop poster={video.cover}></video>
            <div className={cx('video-feed')}>
                <PlayVideo />
                <span className={cx('count')}>{video.play_count}</span>
            </div>
            <div className={cx('video-des')}>
                <p>{video.des}</p>
            </div>
            <button onClick={() => deleteShow(video.video_id)}>delete</button>
        </div>
    );
}

export default VideoItem;
