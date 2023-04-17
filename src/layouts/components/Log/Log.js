import ReactModal from 'react-modal';

import classNames from 'classnames/bind';
import styles from './Log.module.scss';
import { CloseModalIcon } from '~/components/Icons';
import HeaderLog from './HeaderLog';
import FooterLog from './FooterLog';
import { FbLogIcon, GGLogIcon, UserLogIcon } from '~/components/Icons';
import Button from '~/components/Button/Button';

import { UserAuth } from '~/components/AuthContext/AuthContext';
import { config } from '~/config';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        inset: '50% auto auto 50%',
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

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// provider.setCustomParameters({
//     login_hint: 'user@example.com',
// });

function Log({ modalIsOpen, handleCloseModal }) {
    const { googleSignIn, facebookSignIn } = UserAuth();

    const handleSignInFb = async () => {
        try {
            await facebookSignIn();
        } catch (error) {}
    };

    const handleSignInGG = async () => {
        try {
            await googleSignIn();
        } catch (error) {}
    };

    return (
        <ReactModal isOpen={modalIsOpen} style={customStyles}>
            <div className={cx('container')}>
                <Button className={cx('modal-close')} onClick={handleCloseModal}>
                    <CloseModalIcon />
                </Button>

                <HeaderLog />
                <div className={cx('log-list')}>
                    <div className={cx('log-item')}>
                        <Button leftIcon={<FbLogIcon />} onClick={handleSignInFb}>
                            <span className={cx('log-title')}>Tiếp tục với Facebook</span>
                        </Button>
                    </div>
                    <div className={cx('log-item')}>
                        <Button leftIcon={<UserLogIcon />} to={config.routes.signup}>
                            <span className={cx('log-title')}>Tiếp tục với số điện thoại hoặc Email</span>
                        </Button>
                    </div>
                    <div className={cx('log-item')}>
                        <Button leftIcon={<GGLogIcon />} onClick={handleSignInGG}>
                            <span className={cx('log-title')}>Tiếp tục với Google</span>
                        </Button>
                    </div>
                </div>
                <FooterLog />
            </div>
        </ReactModal>
    );
}

export default Log;
