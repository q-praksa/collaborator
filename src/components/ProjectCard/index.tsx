import styles from './ProjectCard.module.css';
import { ProjectsType } from '@components/ProjectCard/types';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

function ProjectCard({
    status,
    clientId,
    lead,
    manager,
    teamType,
    startDate,
    endDate,
    projectName,
}: ProjectsType) {
    const { t } = useTranslation();

    function displayDate(date: string) {
        return dayjs(date).format('DD/MM/YYYY');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles['project-info']}>
                <div className={styles['title-wrapper']}>
                    <h3 className={styles.title}>{projectName}</h3>
                </div>
                <div className={styles.details}>
                    <div className={styles.left}>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>
                                {t('description.client')}
                                {': '}
                            </span>
                            {clientId}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>
                                {t('description.projectLead')}
                                {': '}
                            </span>
                            {lead}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>
                                {t('description.projectManager')}
                                {': '}
                            </span>
                            {manager}
                        </p>
                    </div>
                    <div className={styles.right}>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>
                                {t('description.teamType')}
                                {': '}
                            </span>
                            {teamType}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>
                                {t('description.startDate')}
                                {': '}
                            </span>
                            {displayDate(startDate)}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>
                                {t('description.endDate')}
                                {': '}
                            </span>
                            {endDate ? displayDate(endDate) : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles[status.toLowerCase()]}></div>
        </div>
    );
}

export default ProjectCard;
