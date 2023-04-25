import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import styles from '../Messages.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { UserChat } from '../ChatContext/ChatContext';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function MessageContent({ message }) {
    const { userInfo } = UserAuth();
    const { data } = UserChat();

    const ref = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);
    return (
        <div ref={ref} className={message.sender == userInfo.username ? cx('mess-container-right') : cx('mess-container-left')}>
            {/* <div>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
            <div>
                <FontAwesomeIcon style={{ color: 'red', marginLeft: '10px' }} icon={faCircleExclamation} />
            </div> */}
            <div style={{ borderRadius: '6px', overflow: 'hidden', width: 'fit-content', margin: '0 6px' }}>
                {message.text && <p style={{ padding: '6px 10px', backgroundColor: 'rgba(255, 236, 232, 0.9)' }}>{message.text}</p>}
                {message.file && <img width={300} height={250} style={{ borderRadius: '6px' }} src={message.file} alt="ngfu" />}
            </div>
            <div>
                <Link>
                    <img
                        width={36}
                        height={36}
                        style={{ borderRadius: '50%' }}
                        alt="nguu"
                        src={message.sender == userInfo.username ? userInfo.avatar : data.userData.avatar}
                    />
                </Link>
            </div>
        </div>
    );
}

export default MessageContent;
