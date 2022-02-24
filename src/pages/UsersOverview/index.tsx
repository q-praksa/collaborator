import ProjectCard from '@components/ProjectCard';
import styles from './UsersOverview.module.css';
import { useTranslation } from 'react-i18next';
import { getAllProjects } from '@api/projectsService';
import { ProjectsType } from '@components/ProjectCard/types';
import { useEffect, useRef, useState } from 'react';
import { getAllProjectsAction } from '@reduxStore/actions/projects';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxStore/reducers';

function UserOverview(): React.ReactElement {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const componentMounted = useRef(true);
    const dispatch = useDispatch();

    const usersProjectsFromDatabase = useSelector(
        (state: RootState) => state.projects.projects
    );

    const getUsersProjectsFromApi = async () => {
        setLoading(true);
        const response = await getAllProjects();
        if (componentMounted.current) {
            const allUsersProjects = response?.data;
            if (allUsersProjects) {
                console.log(allUsersProjects.projects);
                dispatch(getAllProjectsAction(allUsersProjects.projects));
            }

            setLoading(false);
        }
        return () => {
            componentMounted.current = false;
        };
    };

    useEffect(() => {
        getUsersProjectsFromApi();
    }, []);

    console.log(usersProjectsFromDatabase);

    return (
        <div className={styles.wrraper}>
            <h1>{t(`description.fullname`)}</h1>
            <p className={styles.vocation}>
                {t(`description.frontEndDeveloper`)}
            </p>
            {usersProjectsFromDatabase &&
                usersProjectsFromDatabase.map((project: ProjectsType) => {
                    return (
                        <ProjectCard
                            key={project.id}
                            status={project.status}
                            clientId={project.clientId}
                            lead={project.lead}
                            manager={project.manager}
                            teamType={project.teamType}
                            startDate={project.startDate}
                            endDate={project.endDate}
                            id={project.id}
                            projectName={project.projectName}
                        />
                    );
                })}
        </div>
    );
}

export default UserOverview;
