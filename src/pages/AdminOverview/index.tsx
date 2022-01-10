import { overviewData } from './data';
import styles from './AdminOverview.module.css';
import { useTranslation } from 'react-i18next';

const AdminOverview = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            {overviewData.map((dataItem) => {
                const { id, color, label, count } = dataItem;
                return (
                    <div
                        key={id}
                        className={`${styles.itemContainer} ${styles[color]}`}
                    >
                        <p>{t(`description.${label}`)}</p>
                        <p className={styles.count}>{count}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default AdminOverview;
