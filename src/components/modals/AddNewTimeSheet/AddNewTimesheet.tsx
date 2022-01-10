import React from 'react';
import ReactDom from 'react-dom';
import styles from './AddNewTimeSheet.module.css';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import { useTranslation } from 'react-i18next';

const AddNewTimesheet = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return ReactDom.createPortal(
        <div className={styles.container}>
            <div className={styles.modal_time}>
                <header className={styles.modal_time_header}>
                    <h2 className={styles.title}>{t('description.logWork')}</h2>
                </header>
                <section className={styles.mid}>
                    <label className={styles.dateLabel}>
                        {t('description.date')}
                    </label>
                    <select className={styles.date}>
                        <option value="date">03/01/2022</option>
                    </select>
                    <label className={styles.clientLabel}>
                        {t('description.client')}
                    </label>
                    <select className={styles.client}>
                        <option value="client">
                            {t('description.selectClient')}
                        </option>
                    </select>
                    <label className={styles.projectLabel}>
                        {t('description.project')}
                    </label>
                    <select className={styles.project}>
                        <option value="project">
                            {t('description.selectProject')}
                        </option>
                    </select>
                    <label className={styles.timeLabel}>
                        {t('description.timeSpent')}:
                    </label>
                    <input className={styles.time} type="text" />
                    <label className={styles.descriptionLabel}>
                        {t('description.description')}:
                    </label>
                    <textarea
                        className={styles.description}
                        cols={30}
                        rows={10}
                    ></textarea>
                </section>

                <footer className={styles.modal_time_footer}>
                    <button
                        className={styles.modal_time_discard}
                        onClick={() => dispatch(close())}
                    >
                        {t('description.discard')}
                    </button>
                    <button className={styles.modal_time_add}>
                        {t('description.add')}
                    </button>
                </footer>
            </div>
        </div>,
        document.getElementById('timeSheet')!
    );
};

export default AddNewTimesheet;
