import { useState, FormEvent, SetStateAction } from 'react';
import styles from './SignUp.module.css';
import { useTranslation } from 'react-i18next';
import { positions } from '@constants/employees';
import signUp from '@api/signupService';
import TextInput from '@elements/Inputs/TextInput';
import { signupType } from '@api/types';
import { useApi } from '@hooks/useApi';

export default function SignUp(): React.ReactElement {
    const { t } = useTranslation();

    const [details, setDetails] = useState<signupType>({
        email: '',
        password: '',
        name: '',
        lastName: '',
    });

    const postSignUp = useApi(() => signUp(details));
    console.log('postSignUp: ' + JSON.stringify(postSignUp));

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        postSignUp.request();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <h1>{t(`description.signUp`)}</h1>
                    <p>{t(`description.signUpPageText`)}</p>

                    <TextInput
                        label={`${t('description.firstName')}:`}
                        name="firstName"
                        type="text"
                        onChange={(e) =>
                            setDetails({ ...details, name: e.target.value })
                        }
                    />
                    <TextInput
                        label={`${t('description.lastName')}:`}
                        name="lastName"
                        type="text"
                        onChange={(e) =>
                            setDetails({ ...details, lastName: e.target.value })
                        }
                    />
                    <TextInput
                        label="Email:"
                        name="email"
                        type="email"
                        onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                        }
                    />
                    <TextInput
                        label={`${t('description.password')}:`}
                        name="password"
                        type="password"
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                    />

                    <div className={styles.select_input_wrapper}>
                        <label className={styles.select_label}>
                            {t('description.jobTitle')}:
                        </label>
                        <select
                            className={styles.select}
                            placeholder="Job Title"
                        >
                            {positions.map((position) => (
                                <option key={position}>
                                    {t(`description.${position}`)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className={styles.submit} type="submit">
                        Sign up
                    </button>
                </div>
            </div>
        </form>
    );
}
