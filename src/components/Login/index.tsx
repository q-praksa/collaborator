import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './Login.module.css';
import { useTranslation } from 'react-i18next';

export default function Login(): React.ReactElement {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [details, setDetails] = useState<userDetails>({
        email: '',
        password: '',
    });
    type userDetails = {
        email: string;
        password: string;
    };

    function login(details: userDetails): void {
        if (details.email === 'user@user.com' && details.password === 'user') {
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('user', 'true');
            navigate('/user-overview');
        } else if (
            details.email === 'admin@admin.com' &&
            details.password === 'admin'
        ) {
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('admin', 'true');
            navigate('/admin-overview');
        } else {
            localStorage.setItem('isLogged', 'false');
            localStorage.setItem('admin', 'false');
            localStorage.setItem('user', 'false');
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        login(details);
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
            </form>
        </div>
    );
}
