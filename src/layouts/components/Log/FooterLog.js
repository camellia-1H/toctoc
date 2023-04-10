import classNames from 'classnames/bind';
import styles from './Log.module.scss';

import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function FooterLog({ title }) {
    return (
        <footer className={cx('modal-footer')}>
            <p className={cx('des')}>Bạn không có tài khoản ?</p>
            <Button>
                <h4 className={cx('log')}>Đăng ký</h4>
            </Button>
        </footer>
    );
}

export default FooterLog;
