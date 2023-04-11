import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Log.module.scss';
import { CloseModalIcon } from '~/components/Icons';
import HeaderLog from './HeaderLog';
import FooterLog from './FooterLog';
import { FbLogIcon, GGLogIcon, UserLogIcon } from '~/components/Icons';
import Button from '~/components/Button/Button';

import { auth, provider } from '~/components/AuthContext/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { UserAuth } from '~/components/AuthContext/AuthContext';

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
provider.setCustomParameters({
    login_hint: 'user@example.com',
});

function Log({ modalIsOpen, handleClose }) {
    // const [value, setValue] = useState('');

    // const handleSignIn = async () => {
    //     await signInWithPopup(auth, provider)
    //         .then((data) => {
    //             setValue(data.user.email);
    //             // localStorage.setItem('email', data.user.email);
    //             // const credential = provider.credentialFromResult(data);
    //             // console.log(credential);
    //             // const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = data.user;
    //             console.log(user);
    //             // IdP data available using getAdditionalUserInfo(result)
    //             // ...
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.customData.email;
    //             // The AuthCredential type that was used.
    //             const credential = provider.credentialFromError(error);
    //         });
    // };

    const { googleSignIn, user } = UserAuth();

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {}
    };

    const handleLogOut = async () => {
        await signOut(auth);
    };

    // useEffect(() => {
    //     setValue(localStorage.getItem('email'));
    // }, []);

    return (
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
                        <Button leftIcon={<GGLogIcon />} onClick={handleSignIn}>
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
