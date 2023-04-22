import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import Log from '../components/Log/Log';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import MainContent from '~/components/Layout/components/MainContent';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { user } = UserAuth();

    let userIsLogin = false;
    console.log(userIsLogin);

    if (user) {
        userIsLogin = true;
    }

    console.log(userIsLogin);

    const [modalIsOpen, setIsOpen] = useState(false);

    const handleCloseModal = () => setIsOpen(false);
    const handleShowModal = () => setIsOpen(true);

    useEffect(() => {
        setIsOpen(false);
    }, [userIsLogin]);

    return (
        <div className={cx('wrapper')}>
            <Header userIsLogin={userIsLogin} handleShowModal={handleShowModal} />
            <div className={cx('container')}>
                <Sidebar userIsLogin={userIsLogin} handleShowModal={handleShowModal} />

                <div className={cx('content')}>
                    {children}
                    {!userIsLogin && <MainContent />}
                </div>
            </div>
            {!userIsLogin && <Log modalIsOpen={modalIsOpen} handleCloseModal={handleCloseModal} />}
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
