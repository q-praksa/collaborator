import React, { FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import login from '@api/loginService';
import { userCredentialsType } from '@api/types';
import { useApi } from '@hooks/useApi';

export default function Login(): React.ReactElement {
    const { t } = useTranslation();
    const [details, setDetails] = useState<userCredentialsType>({
        email: '',
        password: '',
    });

    const postLogin = useApi(login);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        postLogin.request(details);
    }

    return (
        <div className={styles['login']}>
            <form onSubmit={handleSubmit}>
                <div className={styles['label-input-wrapper']}>
                    <label>Email</label>
                    <input
                        className={styles['input']}
                        autoFocus
                        type="email"
                        value={details.email}
                        onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                        }
                    />
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.password')}</label>
                    <input
                        className={styles['input']}
                        type="password"
                        value={details.password}
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                    />
                </div>
                <button className={styles['submit']} type="submit">
                    Login
                </button>
                <div className={styles['link']}>
                    <label>Don&apos;t have an account?</label>
                    <NavLink className={styles['navigation']} to="/signup">
                        Sign up
                    </NavLink>
                </div>
            </form>
        </div>
    );
}
