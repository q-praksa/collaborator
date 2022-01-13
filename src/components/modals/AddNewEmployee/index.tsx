import ReactDom from 'react-dom';
import styles from './AddNewEmployee.module.css';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import { useTranslation } from 'react-i18next';

const AddNewEmployee = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return ReactDom.createPortal(
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <header className={styles.header}>
                    <h2 className={styles.title}>
                        {t('description.addEmployee')}
                    </h2>
                </header>
                <section className={styles.modal_body}>
                    <label className={styles.label}>
                        {t('description.firstName')}:
                    </label>
                    <input type="text" className={styles.input} />

                    <label className={styles.label}>
                        {t('description.lastName')}:
                    </label>
                    <input type="text" className={styles.input} />

                    <label className={styles.label}>
                        {t('description.email')}:
                    </label>
                    <input type="email" className={styles.input} />

                    <label className={styles.label}>
                        {t('description.password')}:
                    </label>
                    <input type="password" className={styles.input} />

                    <label className={styles.label}>
                        {t('description.jobTitle')}:
                    </label>
                    <select className={styles.select}>
                        <option value="jobTitle">
                            {t('description.selectJobTitle')}
                        </option>
                    </select>
                </section>
                <footer className={styles.footer}>
                    <button
                        className={`${styles.btn} ${styles.discard_btn}`}
                        onClick={() => dispatch(close())}
                    >
                        {t('description.discard')}
                    </button>
                    <button className={styles.add_btn}>
                        {t('description.add')}
                    </button>
                </footer>
            </div>
        </div>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('employee')!
    );
};

export default AddNewEmployee;
