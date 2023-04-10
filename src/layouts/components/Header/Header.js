import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faCoins, faEarthAsia, faEllipsisVertical, faGear, faKeyboard, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, MoreIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import Log from '../Log/Log';

import ReactModal from 'react-modal';

import { CloseModalIcon } from '~/components/Icons';
import HeaderLog from '../Log/HeaderLog';
import FooterLog from '../Log/FooterLog';
import { FbLogIcon, GGLogIcon, UserLogIcon } from '~/components/Icons';

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
const customStyles = {
    content: {
        minWidth: '500px',
        maxHeight: 'min((100vh - 96px) - 40px, 734px)',
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
        overFlowY: 'hidden',
    },
};
function Header() {
    const currentUser = false;

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
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
            to: '/logout',
            separate: true,
        },
    ];

    const [modalIsOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleShow = () => setIsOpen(true);

    // <Log modalIsOpen={modalIsOpen} handleClose={handleClose} />;
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
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
                                onClick={handleShow}>
                                Upload
                            </Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/323441730_967739090854048_936390828444513617_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wghZizgvQaEAX8SzEZ1&_nc_ht=scontent.fhan15-1.fna&oh=00_AfChDKMH_8YEwxKsiiPFqqxxK3R6oIvYfnqUSV9nrerBPQ&oe=643921B8"
                                alt="Nguyen Van A"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
            <ReactModal isOpen={modalIsOpen} style={customStyles}>
                <div className={cx('container')}>
                    <Button className={cx('modal-close')} onClick={handleClose}>
                        <CloseModalIcon />
                    </Button>

                    <HeaderLog />
                    <div className={cx('log-list')}>
                        <div className={cx('log-item')}>
                            <Button leftIcon={<FbLogIcon />}>
                                <span className={cx('log-title')}>Tiếp tục với Facebook</span>
                            </Button>
                        </div>
                        <div className={cx('log-item')}>
                            <Button leftIcon={<UserLogIcon />}>
                                <span className={cx('log-title')}>Tiếp tục với số điện thoại hoặc Email</span>
                            </Button>
                        </div>
                        <div className={cx('log-item')}>
                            <Button leftIcon={<GGLogIcon />}>
                                <span className={cx('log-title')}>Tiếp tục với Google</span>
                            </Button>
                        </div>
                    </div>
                    <FooterLog />
                </div>
            </ReactModal>
        </header>
    );
}

export default Header;
