import classNames from 'classnames/bind';
import styles from '../Messages.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import MessageContent from './MessageContent';

const cx = classNames.bind(styles);

function Chat() {
    return (
        <div className={cx('chat-container')}>
            <div>
                <div className={cx('chat-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/172802b706443f4e7e063832a00d62be~c5_100x100.jpeg?x-expires=1682474400&x-signature=416rTGUZ9Z%2Bi3t07XSR8lFlz%2BHY%3D"
                        alt="mg"
                    />
                    <div className={cx('info')}>
                        <h4 style={{ fontWeight: '600', fontSize: '18px' }}>username</h4>
                        <p style={{ color: 'gray', fontSize: '14px' }}>nickname</p>
                    </div>
                </div>
            </div>
            <div style={{ padding: '10px', overflow: 'hidden' }}>
                <div style={{ height: '420px', overflowY: 'auto' }}>
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                </div>
            </div>

            <div className={cx('input')}>
                <input className={cx('input-text')} type="text" placeholder="type message...." />
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon style={{ fontSize: '15px' }} icon={faLink} />
                    <input className={cx('input-file')} type="file" />
                </div>
                <button style={{ backgroundColor: 'transparent' }}>
                    <FontAwesomeIcon style={{ fontSize: '18px', color: 'red' }} icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}

export default Chat;
