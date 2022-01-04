import React, { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useDispatch } from 'react-redux';
import { log } from '../../redux/actions/login';

import styles from './Login.module.css';

export default function Login(): React.ReactElement {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const isLogged = useSelector((state: RootState) => state.login.isLoggedIn);

    const dispatch = useDispatch();
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    console.log(log);

    return (
        <div className={styles['login']}>
            <form onSubmit={handleSubmit}>
                <div className={styles['label-input-wrapper']}>
                    <label>Email</label>
                    <input
                        className={styles['input']}
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>Password</label>
                    <input
                        className={styles['input']}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className={styles['submit']}
                    type="submit"
                    onClick={() => dispatch(log())}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
