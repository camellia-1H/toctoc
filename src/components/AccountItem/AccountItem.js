import PropTypes from 'prop-types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';
import { config } from '~/config';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={config.routes.profileLink(data.username)} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.bio} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.username}</span>
                    {data.verified && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
