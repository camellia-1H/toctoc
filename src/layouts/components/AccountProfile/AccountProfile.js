import classNames from 'classnames/bind';
import styles from './AccountProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function AccountProfile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-page')}>
                <div className={cx('user-header')}>
                    <div className={cx('avatar')}>
                        <img
                            className={cx('avatar-img')}
                            src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/323441730_967739090854048_936390828444513617_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wghZizgvQaEAX8SzEZ1&_nc_ht=scontent.fhan15-1.fna&oh=00_AfChDKMH_8YEwxKsiiPFqqxxK3R6oIvYfnqUSV9nrerBPQ&oe=643921B8"
                        />
                    </div>
                    <div>
                        <h1 className={cx('username')}>manhdontcare</h1>
                        <h3 className={cx('nickname')}>nopem</h3>
                        <Button text leftIcon={<FontAwesomeIcon icon={faEdit} />}>
                            Edit profile
                        </Button>
                    </div>
                </div>
                <h3 className={cx('info')}>
                    <div className={cx('mr')}>
                        <strong className={cx('number')}>241</strong> <span className={cx('des')}>Following</span>
                    </div>
                    <div className={cx('mr')}>
                        <strong className={cx('number')}>32</strong> <span className={cx('des')}>Followers</span>
                    </div>
                    <div className={cx('mr')}>
                        <strong className={cx('number')}>5</strong> <span className={cx('des')}>Likes</span>
                    </div>
                </h3>
                <h3 className={cx('nickname')}>No bio yet.</h3>

                <div className={cx('user-layout')}>
                    <div className={cx('tag-contain')}>
                        <p className={cx('tag', 'tag1')}>Videos</p>
                        <p className={cx('tag', 'tag2')}>Liked</p>
                        <div className={cx('w230')}></div>
                    </div>
                    <div className={cx('video-contain')}>
                        <div className={cx('video-item')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountProfile;
