import styles from './ProjectCard.module.css';
import { Props } from '@components/ProjectCard/types';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import DeleteButton from '@elements/Buttons/DeleteButton';
import { useDispatch } from 'react-redux';
import { useApi } from '@hooks/useApi';
import { deleteProject } from '@api/projectsService';
import { deleteProjectAction } from '@reduxStore/actions/projects';

function ProjectCard({
    projectName,
    id,
    status,
    clientId,
    lead,
    manager,
    teamType,
    startDate,
    endDate,
}: Props) {
    const statusClass = styles[status];
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const deleteUserApi = useApi(deleteProject);

    function displayDate(date: string) {
        return dayjs(date).format('DD/MM/YYYY');
    }

    function handleDeleteProject(id: string) {
        const confirm = window.confirm(t('description.confirmDeleteQuestion'));
        if (confirm) {
            deleteUserApi.request(id);
            dispatch(deleteProjectAction(id));
        }
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
                            {displayDate(endDate)}
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles['delete-div']}>
                <DeleteButton onClick={() => handleDeleteProject(id)}>
                    X
                </DeleteButton>
            </div>
            <div className={statusClass}></div>
        </div>
    );
}

export default ProjectCard;
