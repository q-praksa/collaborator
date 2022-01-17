import ProjectCard from '@components/ProjectCard';
import { ProjectStatus } from '@components/ProjectCard/types';
import styles from './UsersOverview.module.css';
import { useTranslation } from 'react-i18next';

function UserOverview(): React.ReactElement {
    const { t } = useTranslation();
    {
        const ProjectCardComponent = () => {
            return (
                <ProjectCard
                    status={ProjectStatus.inactive}
                    client={'Colaborator'}
                    lead={'Kim Novak'}
                    manager={'Kim Novak'}
                    teamType={'Frontend'}
                    startDate={'01-01-2021'}
                    endDate={'N/A'}
                />
            );
        };
        return (
            <div className={styles.wrraper}>
                <h1>{t(`description.fullname`)}</h1>
                <p className={styles.vocation}>
                    {t(`description.frontEndDevolper`)}
                </p>

                <ProjectCard
                    status={ProjectStatus.inactive}
                    client={'Colaborator'}
                    lead={'Kim Novak'}
                    manager={'Kim Novak'}
                    teamType={'Frontend'}
                    startDate={'01-01-2021'}
                    endDate={'N/A'}
                />
            </div>
        );
    }
}

export default UserOverview;
