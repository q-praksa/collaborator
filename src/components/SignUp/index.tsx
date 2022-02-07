import { useState } from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { positions } from '@constants/employees';
import signUp from '@api/signupService';
import TextInput from '@elements/Inputs/TextInput';

export default function SignUp(): React.ReactElement {
    const { t } = useTranslation();

    const [email] = useState('');
    const [password] = useState('');

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <h1>{t(`description.signUp`)}</h1>
                <p>{t(`description.signUpPageText`)}</p>
                <TextInput
                    label={`${t('description.firstName')}:`}
                    name="firstName"
                    type="text"
                />
                <TextInput
                    label={`${t('description.lastName')}:`}
                    name="lastName"
                    type="text"
                />
                <TextInput label="Email:" name="email" type="email" />
                <TextInput
                    label={`${t('description.password')}:`}
                    name="password"
                    type="password"
                />
                <div className={styles.select_input_wrapper}>
                    <label className={styles.select_label}>
                        {t('description.jobTitle')}:
                    </label>
                    <select className={styles.select} placeholder="Job Title">
                        {positions.map((position) => (
                            <option key={position}>
                                {t(`description.${position}`)}
                            </option>
                        ))}
                    </select>
                    <button
                        className={styles['submit']}
                        type="submit"
                        onClick={() => signUp({ email, password })}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}
