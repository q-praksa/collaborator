import ReactDom from 'react-dom';
import styles from './AddNewEmployee.module.css';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { useTranslation } from 'react-i18next';
import { positions } from '@constants/employees';

const AddNewEmployee = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return ReactDom.createPortal(
        <div className={styles.modal_container}>
            <h2 className={styles.modal_title}>
                {t('description.addEmployee')}
            </h2>

            <div className={styles.modal_body}>
                <div className={styles.input_wrapper}>
                    <label className={styles.label}>
                        {t('description.firstName')}:
                    </label>
                    <input type="text" className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                    <label className={styles.label}>
                        {t('description.lastName')}:
                    </label>
                    <input type="text" className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                    <label className={styles.label}>Email:</label>
                    <input type="email" className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                    <label className={styles.label}>
                        {t('description.password')}:
                    </label>
                    <input type="password" className={styles.input} />
                </div>
                <div className={styles.input_wrapper}>
                    <label className={styles.label}>
                        {t('description.jobTitle')}:
                    </label>
                    <select className={styles.select} placeholder="Job Title">
                        {positions.map((position) => (
                            <option key={position}>
                                {t(`description.${position}`)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.modal_buttons}>
                <button
                    type="button"
                    className={`${styles.btn} ${styles.add_btn}`}
                >
                    {t('description.add')}
                </button>
                <button
                    type="button"
                    className={`${styles.btn} ${styles.discard_btn}`}
                    onClick={() => dispatch(close(modalTypes.addNewEmployee))}
                >
                    {t('description.discard')}
                </button>
            </div>
        </div>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('employee')!
    );
};

export default AddNewEmployee;
