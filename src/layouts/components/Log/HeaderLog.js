import classNames from 'classnames/bind';
import styles from './Log.module.scss';

const cx = classNames.bind(styles);

function HeaderLog({ title }) {
    return (
        <header className={cx('header')}>
            <h1 className={cx('title')}>Đăng nhập TikTok</h1>
        </header>
    );
}

export default HeaderLog;
