import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useState } from 'react';
import { AuthContextProvider } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    // const [userIsLogin, setUserLogin] = useState(false);
    const userIsLogin = false;
    return (
        // <AuthContextProvider>
        <div className={cx('wrapper')}>
            <Header userIsLogin={userIsLogin} />
            <div className={cx('container')}>
                <Sidebar userIsLogin={userIsLogin} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
        // </AuthContextProvider>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
