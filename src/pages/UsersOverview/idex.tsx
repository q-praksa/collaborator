import ProjectCard from '@components/ProjectCard';
import { ProjectStatus } from '@components/ProjectCard/types';
import styles from './UserOverview.module.css';
import { useTranslation } from 'react-i18next';

const UserOverview = () => {
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

export default UserOverview;
