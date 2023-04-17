import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignEaP.module.scss';
import { UserAuth } from '~/components/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignEaP() {
    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const { user, EaPSignUp, EaPSignIn } = UserAuth();

    const loginEmailPass = async (e) => {
        e.preventDefault();
        try {
            await EaPSignIn(loginEmail, loginPassword);
            navigate('/');
            console.log('login');
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    };

    const register = async () => {
        try {
            await EaPSignUp(registerEmail, registerPassword);
            console.log('register success');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="wrapper">
            <form className={cx('modal')}>
                <div className={cx('group')}>
                    <input
                        placeholder="Email..."
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                            setLoginEmail(event.target.value);
                        }}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        placeholder="Password..."
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                            setLoginPassword(event.target.value);
                        }}
                    />
                </div>

                <button onClick={loginEmailPass} id="btnLogin" type="button" className={cx('button', 'buttonBlue')}>
                    Log in
                </button>
                <button onClick={register} id="btnSignup" type="button" className={cx('button', 'buttonBlue')}>
                    Sign up
                </button>
            </form>
        </div>
    );
}

export default SignEaP;
