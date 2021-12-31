import React, { useEffect, useState, ChangeEvent } from 'react';
import { datesGenerator } from 'dates-generator';
import { ICalendar, IGeneratedDate } from './types';
import styles from './Timesheet.module.css';
import { days } from './data';

const Timesheet = () => {
    //Default selected date is present day
    const [selectedDate, setSelectedDate] = useState(new Date());
    //Dates holds the array with the all dates for the given month
    const [dates, setDates] = useState<any[]>([]);

    const [calendar, setCalendar] = useState<ICalendar>({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
        nextMonth: 0,
        nextYear: 0,
        previousMonth: 0,
        previousYear: 0,
    });

    const [timeTracked, setTimeTracked] = useState<number>();

    useEffect(() => {
        const timesheetBody = {
            month: calendar.month,
            year: calendar.year,
            startingDay: 1,
        };
        const {
            dates,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear,
        }: IGeneratedDate = datesGenerator(timesheetBody);

        setDates([...dates]);
        setCalendar({
            ...calendar,
            nextMonth,
            nextYear,
            previousMonth,
            previousYear,
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeTracked(() => parseInt(e.target.value));
    };

    return (
        <div className={styles.timesheet}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {days.map((day) => (
                            <td key={day}>
                                <div className={styles.days}>{day}</div>
                            </td>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {dates.length > 0 &&
                        dates.map((week) => (
                            <tr
                                key={JSON.stringify(week[0])}
                                className={styles.row}
                            >
                                {week.map(
                                    (each: {
                                        date:
                                            | string
                                            | React.ReactChild
                                            | React.ReactFragment
                                            | React.ReactPortal
                                            | null
                                            | undefined;
                                        month: string;
                                    }) => (
                                        <td
                                            className={
                                                each.month.toString() ==
                                                calendar.month.toString()
                                                    ? `${styles.cell} ${styles.current}`
                                                    : `${styles.cell} ${styles['not-current']}`
                                            }
                                            key={JSON.stringify(each)}
                                        >
                                            <div
                                                className={styles.cell_wrapper}
                                            >
                                                <div className={styles.date}>
                                                    {each.date}/
                                                    {Number(each.month) + 1}
                                                </div>

                                                <input
                                                    className={
                                                        Number(timeTracked) <=
                                                        Number(7.5)
                                                            ? `${styles.calendar_input}  ${styles.red}`
                                                            : `${styles.calendar_input}  ${styles.green}`
                                                    }
                                                    type="number"
                                                    min="0"
                                                    value={timeTracked}
                                                    onChange={() =>
                                                        handleChange
                                                    }
                                                    disabled={
                                                        each.month.toString() ==
                                                        calendar.month.toString()
                                                            ? false
                                                            : true
                                                    }
                                                />
                                            </div>
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timesheet;
