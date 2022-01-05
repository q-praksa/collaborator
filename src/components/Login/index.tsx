import React, { FormEvent, useState } from 'react';
import styles from './Login.module.css';
import { useTranslation } from 'react-i18next';

export default function Login(): React.ReactElement {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const { t } = useTranslation();

    function validateForm() {
        return email && password;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles['label-input-wrapper']}>
                    <label>{t('description.password')}</label>
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
                    disabled={!validateForm()}
                >
                    {t('description.login')}
                </button>
            </form>
        </div>
    );
}
