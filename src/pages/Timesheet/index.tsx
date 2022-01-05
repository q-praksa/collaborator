import Calendar from '@components/Timesheet';
import Layout from '@components/Layout';
import styles from './Timesheet.module.css';
import { useTranslation } from 'react-i18next';

const month = new Date().toLocaleString('default', { month: 'long' });
const year = new Date().getFullYear();

const TimesheetPg = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <div className={styles.wrapper}>
                <h2 className={styles.header}>
                    {t(month)} {year}
                </h2>
                <Calendar />
            </div>
        </Layout>
    );
};

export default TimesheetPg;
