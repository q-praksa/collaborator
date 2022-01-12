import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './timesheetDetails.module.css';
import styles from './timesheetDetails.module.css';
import { useTranslation } from 'react-i18next';

const TimesheetDetails = () => {
    const { t } = useTranslation();
    return (
        <section className={styles.timesheetDetailsSection}>
            <p className={styles.date}>04/01/2022</p>
            <p className={styles.workingTime}>7.5</p>
            <article className={styles.timesheetDetailsArticle}>
                <div className={styles.articleDatas}>
                    <h3 className={styles.articleH3}>project name</h3>
                    <p className={styles.articleP}>
                        {t('description.client')}:{' '}
                        <span className={styles.articleSpan}>Company Name</span>
                    </p>
                    <p className={styles.articleP}>
                        {t('description.timeSpent')}:{' '}
                        <span className={styles.articleSpan}>3</span>
                    </p>
                </div>
                <div className={styles.descriptionDiv}>
                    <p className={styles.articleP}>
                        {t('description.description')}:
                    </p>
                    <textarea className={styles.articleTextarea}></textarea>
                </div>
                <div>
                    <FontAwesomeIcon icon={faEdit} className={styles.faEdit} />
                </div>
            </article>
        </section>
    );
};

export default TimesheetDetails;
