import React from 'react';
import Calendar from '../../components/Timesheet';
import styles from './Timesheet.module.css';

const month = new Date().toLocaleString('default', { month: 'long' });
const year = new Date().getFullYear();

const TimesheetPg = () => {
    return (
        <div className={styles.wrapper}>
            <h2>
                {month} {year}
            </h2>
            <Calendar />
        </div>
    );
};

export default TimesheetPg;
