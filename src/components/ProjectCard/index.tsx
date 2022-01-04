import React from 'react';
import styles from './ProjectCard.module.css';
import { Props } from '@components/ProjectCard/types';

function ProjectCard({
    status,
    client,
    lead,
    manager,
    teamType,
    startDate,
    endDate,
}: Props) {
    const statusClass = styles[status];

    return (
        <div className={styles.wrapper}>
            <div className={styles['project-info']}>
                <div className={styles['title-wrapper']}>
                    <h3 className={styles.title}>Project name</h3>
                </div>
                <div className={styles.details}>
                    <div className={styles.left}>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>Client: </span>
                            {client}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>Project Lead: </span>
                            {lead}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>
                                Project Manager:{' '}
                            </span>
                            {manager}
                        </p>
                    </div>
                    <div className={styles.right}>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>Team Type: </span>
                            {teamType}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>Start Date: </span>
                            {startDate}
                        </p>
                        <p className={styles.paragraph}>
                            <span className={styles.pale}>End Date: </span>
                            {endDate}
                        </p>
                    </div>
                </div>
            </div>
            <div className={statusClass}></div>
        </div>
    );
}

export default ProjectCard;
