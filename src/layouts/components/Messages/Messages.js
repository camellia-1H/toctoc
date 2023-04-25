import Chat from './components/Chat';
import SidebarMes from './components/SidebarMes';

import classNames from 'classnames/bind';
import styles from './Messages.module.scss';
import { ChatContextProvider } from './ChatContext/ChatContext';

const cx = classNames.bind(styles);

function Messages() {
    return (
        <div className={cx('inner')}>
            <ChatContextProvider>
                <SidebarMes />
                <Chat />
            </ChatContextProvider>
        </div>
    );
}

export default Messages;
