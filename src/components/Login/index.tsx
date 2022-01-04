import React, { useState } from 'react';

import styles from './Login.module.css';

export default function Login(): React.ReactElement {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    function handleSubmit(): void {
        localStorage.setItem('isLogged', 'true');
    }

    return (
        <div className={styles['login']}>
            <form>
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
                    type="button"
                    onClick={() => handleSubmit()}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
