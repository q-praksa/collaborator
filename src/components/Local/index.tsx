import { Trans, useTranslation } from 'react-i18next';
import styles from './index.module.css';

const Local = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <div className={styles.local}>
            <h1>{t('description.choose')}</h1>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('de')}>DE</button>
            <button onClick={() => changeLanguage('rs')}>SRB</button>
            <p>
                <Trans i18nKey="description.part1">
                    Translate this sentence.
                </Trans>
            </p>
            <p>{t('description.part2')}</p>
        </div>
    );
};

export default Local;
