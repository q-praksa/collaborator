import { useState, FormEvent, SetStateAction } from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { positions } from '@constants/employees';
import TextInput from '@elements/Inputs/TextInput';

export default function SignUp(): React.ReactElement {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleName = (e: { target: { value: SetStateAction<string> } }) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    const handleLastName = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setLastName(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e: { target: { value: SetStateAction<string> } }) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (name === '' || lastName === '' || email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
    };

    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}
            >
                <h1>
                    {' '}
                    Welcome {name} {lastName}{' '}
                </h1>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <h1>{t(`description.signUp`)}</h1>
                <p>{t(`description.signUpPageText`)}</p>
                <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <TextInput
                    label={`${t('description.firstName')}:`}
                    name="firstName"
                    type="text"
                    onChange={handleName}
                />
                <TextInput
                    label={`${t('description.lastName')}:`}
                    name="lastName"
                    type="text"
                    onChange={handleLastName}
                />
                <TextInput
                    label="Email:"
                    name="email"
                    type="email"
                    onChange={handleEmail}
                />
                <TextInput
                    label={`${t('description.password')}:`}
                    name="password"
                    type="password"
                    onChange={handlePassword}
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
                        className={styles.submit}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}
