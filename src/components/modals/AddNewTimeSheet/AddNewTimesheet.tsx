import ReactDom from 'react-dom';
import styles from './AddNewTimeSheet.module.css';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import { useTranslation } from 'react-i18next';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import Modal from '@elements/Modal';
import AddButton from '@elements/Buttons/AddButton';
import DiscardButton from '@elements/Buttons/DiscardButton';

const AddNewTimesheet = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return ReactDom.createPortal(
        <Modal title={t('description.logWork')}>
            <div className={styles.mid}>
                <div className={styles.modal_input_wrapper}>
                    <label className={styles.modal_label}>
                        {t('description.date')}:
                    </label>
                    <select className={`${styles.modal_select} ${styles.date}`}>
                        <option value="date">03/01/2022</option>
                    </select>
                </div>
                <div className={styles.modal_input_wrapper}>
                    <label className={styles.modal_label}>
                        {t('description.client')}:
                    </label>
                    <select className={styles.modal_select}>
                        <option value="client">
                            {t('description.selectClient')}
                        </option>
                    </select>
                </div>
                <div className={styles.modal_input_wrapper}>
                    <label className={styles.modal_label}>
                        {t('description.project')}:
                    </label>
                    <select className={styles.modal_select}>
                        <option value="project">
                            {t('description.selectProject')}
                        </option>
                    </select>
                </div>
                <div className={styles.modal_input_wrapper}>
                    <label className={styles.modal_label}>
                        {t('description.timeSpent')}:
                    </label>
                    <input className={styles.time} type="text" />
                </div>
                <div className={styles.modal_input_wrapper}>
                    <label className={styles.modal_label}>
                        {t('description.description')}:
                    </label>
                    <textarea
                        className={styles.description}
                        cols={30}
                        rows={10}
                    />
                </div>
            </div>
            <footer className={styles.modal_time_footer}>
                <AddButton onClick={() => console.log('add')}>
                    {t('description.add')}
                </AddButton>
                <DiscardButton
                    onClick={() =>
                        dispatch(close(modalTypes.addNewTimesheetItem))
                    }
                >
                    {t('description.discard')}
                </DiscardButton>
            </footer>
        </Modal>,
        document.getElementById('timeSheet')!
    );
};

export default AddNewTimesheet;
