import Calendar from '@components/Timesheet';
import styles from './Timesheet.module.css';
import { useTranslation } from 'react-i18next';

const month = new Date().toLocaleString('default', { month: 'long' });
const year = new Date().getFullYear();

const TimesheetPg = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.header}>
                {t(`months.${month}`)} {year}
            </h2>
            <Calendar />
        </div>
    );
};

export default TimesheetPg;
