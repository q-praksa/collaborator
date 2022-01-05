import styles from './NotFound.module.css';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <div className={styles.status}>404</div>
            <p className={styles.message}>{t('description.nothingMsg')}</p>
        </div>
    );
};

export default NotFound;
