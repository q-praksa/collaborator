import { Trans, useTranslation } from 'react-i18next';
import styles from './index.module.css';

const Local = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className={styles.local}>
            <button
                className={styles['lang-btn']}
                onClick={() => changeLanguage('en')}
            >
                EN
            </button>
            <button
                className={styles['lang-btn']}
                onClick={() => changeLanguage('de')}
            >
                DE
            </button>
            <button
                className={styles['lang-btn']}
                onClick={() => changeLanguage('rs')}
            >
                SRB
            </button>
        </div>
    );
};

export default Local;
