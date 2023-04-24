import classNames from 'classnames/bind';
import styles from '../Messages.module.scss';

const cx = classNames.bind(styles);

function Chats() {
    return <div className={cx('chat-container')}>Chats</div>;
}

export default Chats;
