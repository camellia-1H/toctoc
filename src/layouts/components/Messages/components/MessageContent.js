import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import styles from '../Messages.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MessageContent() {
    return (
        <div className={cx('mess-container')}>
            <div>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
            <div>
                <FontAwesomeIcon style={{ color: 'red', marginLeft: '10px' }} icon={faCircleExclamation} />
            </div>
            <div style={{ borderRadius: '6px', overflow: 'hidden', width: 'fit-content', margin: '0 6px' }}>
                <p style={{ padding: '6px 10px', backgroundColor: 'rgba(255, 236, 232, 0.9)' }}>nguafdsgasauu</p>
            </div>
            <div>
                <Link>
                    <img
                        width={36}
                        height={36}
                        style={{ borderRadius: '50%' }}
                        alt="nguu"
                        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/172802b706443f4e7e063832a00d62be~c5_100x100.jpeg?x-expires=1682474400&x-signature=416rTGUZ9Z%2Bi3t07XSR8lFlz%2BHY%3D"
                    />
                </Link>
            </div>
        </div>
    );
}

export default MessageContent;
