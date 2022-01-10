import { useEffect, useState } from 'react';
import { datesGenerator } from 'dates-generator';
import {
    ICalendar,
    IGeneratedDate,
    TimesheetDate,
} from '@components/Timesheet/types';
import styles from './Timesheet.module.css';
import { days } from '@components/Timesheet/data';

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
                                {week.map((day: TimesheetDate) => (
                                    <td
                                        className={
                                            day.month.toString() ==
                                            calendar.month.toString()
                                                ? `${styles.cell} ${styles.current}`
                                                : `${styles.cell} ${styles['not-current']}`
                                        }
                                        key={JSON.stringify(day)}
                                    >
                                        <div className={styles.cell_wrapper}>
                                            <div className={styles.date}>
                                                {day.date}/
                                                {Number(day.month) + 1}
                                            </div>

                                            <div
                                                className={
                                                    Number(timeTracked) <
                                                    Number(7.5)
                                                        ? `${styles.calendar_input}  ${styles.red}`
                                                        : `${styles.calendar_input}  ${styles.green}`
                                                }
                                            >
                                                {day.month.toString() ==
                                                calendar.month.toString()
                                                    ? timeTracked
                                                    : null}
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timesheet;
