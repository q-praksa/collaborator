import Calendar from '@components/Timesheet';
import styles from './Timesheet.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxStore/reducers';
import { open } from '@reduxStore/actions/modal';
import AddNewTimesheet from '@components/modals/AddNewTimeSheet/AddNewTimesheet';
import { useTranslation } from 'react-i18next';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import OpenModalButton from '@elements/Buttons/OpenModalButton';

const month = new Date().toLocaleString('default', { month: 'long' });
const year = new Date().getFullYear();

const TimesheetPg = () => {
    const dispatch = useDispatch();
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewTimesheetItem]
    );

    const { t } = useTranslation();
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <h2 className={styles.header}>
                    {t(`months.${month}`)} {year}
                </h2>
                <OpenModalButton
                    onClick={() =>
                        dispatch(open(modalTypes.addNewTimesheetItem))
                    }
                />
            </div>
            <Calendar />
            <div>{modal ? <AddNewTimesheet /> : null}</div>
        </div>
    );
};

export default TimesheetPg;
