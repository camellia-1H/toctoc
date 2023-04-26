import Chat from './components/Chat';
import SidebarMes from './components/SidebarMes';

import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import { ChatContextProvider } from './ChatContext/ChatContext';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Messages() {
    const location = useLocation();
    // kiểm tra 2 người đã follow nhau chưa
    const userFollow = location.state.follow;
    console.log(userFollow);
    return (
        <div className={cx('inner')}>
            <ChatContextProvider userFollow={userFollow}>
                <SidebarMes />
                <Chat />
            </ChatContextProvider>
        </div>
    );
}

export default Messages;
