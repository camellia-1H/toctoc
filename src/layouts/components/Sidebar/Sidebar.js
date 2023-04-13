import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { HomeIcon, HomeActiveIcon, UserGroupIcon, UserGroupActiveIcon, LiveIcon, LiveActiveIcon } from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Sidebar({ userIsLogin, handleShowModal }) {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon />} />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            {userIsLogin ? (
                <>
                    <SuggestedAccounts label="Suggested accounts" />
                    <SuggestedAccounts label="Following accounts" />
                </>
            ) : (
                <>
                    <p className={cx('des')}>Log in to follow creators, like videos, and view comments.</p>
                    <Button outline large onClick={handleShowModal}>
                        Login
                    </Button>
                    <SuggestedAccounts label="Suggested accounts" />
                </>
            )}
        </aside>
    );
}

export default Sidebar;
