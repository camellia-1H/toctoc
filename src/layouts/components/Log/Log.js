import ReactModal from 'react-modal';

import classNames from 'classnames/bind';
import styles from './Log.module.scss';
import { CloseModalIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import HeaderLog from './HeaderLog';
import FooterLog from './FooterLog';
import { FbLogIcon, GGLogIcon, UserLogIcon } from '~/components/Icons';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);
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

function Log({ modalIsOpen, handleClose }) {
    console.log('ngu');
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
                        <Button leftIcon={<GGLogIcon />}>
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
