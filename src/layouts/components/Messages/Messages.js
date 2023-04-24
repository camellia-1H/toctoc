import Chat from './components/Chat';
import SidebarMes from './components/SidebarMes';

import classNames from 'classnames/bind';
import styles from './Messages.module.scss';

const cx = classNames.bind(styles);

function Messages() {
    return (
        <div className={cx('inner')}>
            <SidebarMes />
            <Chat />
        </div>
    );
}

export default Messages;
