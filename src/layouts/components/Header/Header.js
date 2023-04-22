import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCoins, faEarthAsia, faEllipsisVertical, faGear, faKeyboard, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { config } from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, MoreIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import { useRef } from 'react';
const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header({ userIsLogin, handleShowModal }) {
    console.log(userIsLogin);
    // const params = useParams();
    // const nickname = params.email;

    const { user, logOut, userInfo } = UserAuth();
    console.log(user);
    console.log(userInfo?.username);
    const username = useRef(config.routes.profileLink(userInfo?.username));
    console.log(username);
    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const handleLogOut = async () => {
        await logOut();
    };
    // <Link to={`/@${data.nickname}`} className={cx('wrapper')}>

    //    profile: '/@:nickname',
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            // to: `/@${user.email}`,
            to: `${username.current}`,
            // to: config.routes.profileLink(nickname),
            // to: '/@manh',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            separate: true,
            onClickLogOut: handleLogOut,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {userIsLogin ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <Button
                                    text
                                    leftIcon={<MoreIcon />}
                                    // to={'/signin'}
                                    to={config.routes.upload}>
                                    Upload
                                </Button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button
                                text
                                leftIcon={<MoreIcon />}
                                // to={'/signin'}
                                onClick={handleShowModal}>
                                Upload
                            </Button>
                            <Button onClick={handleShowModal} primary>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={userIsLogin ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {userIsLogin ? (
                            <Image
                                className={cx('user-avatar')}
                                // src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/323441730_967739090854048_936390828444513617_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wghZizgvQaEAX8SzEZ1&_nc_ht=scontent.fhan15-1.fna&oh=00_AfChDKMH_8YEwxKsiiPFqqxxK3R6oIvYfnqUSV9nrerBPQ&oe=643921B8"
                                src={userInfo?.avatar}
                                alt="Dao Manh"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
