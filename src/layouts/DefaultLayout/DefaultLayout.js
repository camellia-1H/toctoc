import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { UserAuth } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { user, logOut } = UserAuth();
    let userIsLogin = false;
    if (user.length > 0 && user[user.length - 1] != null) {
        userIsLogin = true;
    }

    return (
        <div className={cx('wrapper')}>
            <Header userIsLogin={userIsLogin} data={user} logOut={logOut} />
            <div className={cx('container')}>
                <Sidebar userIsLogin={userIsLogin} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
