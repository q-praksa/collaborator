import React from 'react';
import Timesheet from '../../components/Timesheet';
import styles from './TimesheetPg.module.css';

const month = new Date().toLocaleString('default', { month: 'long' });
const year = new Date().getFullYear();

const TimesheetPg = () => {
    return (
        <div className={styles.wrapper}>
            <h2>
                {month} {year}
            </h2>
            <Timesheet />
        </div>
    );
};

export default TimesheetPg;
