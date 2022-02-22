import ProjectCard from '@components/ProjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectsPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { filterButtons } from '@constants/projects';
import OpenModalButton from '@elements/Buttons/OpenModalButton';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { open } from '@reduxStore/actions/modal';
import { RootState } from '@reduxStore/reducers';
import AddNewProject from '../modals/AddNewProject';
import AddProject from '@components/modals/AddProject';
import { useApi } from '@hooks/useApi';
import { getAllProjects } from '@api/projectsService';
import { Props } from '@components/ProjectCard/types';
import { getAllProjectsAction } from '@reduxStore/actions/projects';

function ProjectsPage() {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [inputValue, setInputValue] = useState(
        searchParams.get('search') || ''
    );
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewProject]
    );
    const [loading, setLoading] = useState(false);
    const componentMounted = useRef(true);
    const usersProjectsFromDatabase = useSelector(
        (state: RootState) => state.projects.projects
    );

    const getProjectsFromApi = async () => {
        setLoading(true);
        const response = await getAllProjects();
        if (componentMounted.current) {
            const projects = response?.data;
            if (projects) {
                dispatch(getAllProjectsAction(projects));
            }

            setLoading(false);
        }
        return () => {
            componentMounted.current = false;
        };
    };

    useEffect(() => {
        getProjectsFromApi();
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', pressEnter);
        return () => document.removeEventListener('keydown', pressEnter);
    }, [inputValue]);

    function handleSearch() {
        if (inputValue.length) {
            searchParams.set('search', inputValue);
        } else {
            searchParams.delete('search');
        }
        setSearchParams(searchParams);
    }

    function pressEnter(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            return handleSearch();
        }
    }

    function filterSearchByInput(cardText: string | undefined | null) {
        if (!searchParams.get('search')) {
            return true;
        }
        if (cardText) {
            return cardText
                .toLowerCase()
                .includes(String(searchParams.get('search')).toLowerCase());
        }
    }

    function filterSearchByButton(projectProp: string) {
        return searchParams.has(projectProp.toLowerCase());
    }

    function applyFilter(btn: string) {
        searchParams.set(String([btn]), btn);
        setSearchParams(searchParams);
    }

    function unselectBtn(btn: string) {
        searchParams.delete(String([btn]));
        setSearchParams(searchParams);
    }

    function countButtonFilters() {
        const filters: string[] = [];
        const keys = searchParams.keys();
        for (const key of keys) {
            key !== 'search' ? filters.push(key) : null;
        }
        return filters.length;
    }

    return (
        <>
            {modal && <AddProject />}
            <section className={styles['projects-page']}>
                <div className={styles['filter-area']}>
                    <h1>{t('description.projects')}</h1>
                    <div className={styles['input-container']}>
                        <div className={styles['input-field']}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <FontAwesomeIcon
                                className={styles['fa-search-icon']}
                                icon={faSearch}
                                onClick={handleSearch}
                            />
                        </div>
                        <OpenModalButton
                            onClick={() =>
                                dispatch(open(modalTypes.addNewProject))
                            }
                        />
                    </div>
                    <div className={styles['filter-btns']}>
                        {filterButtons.map((btn) => {
                            return (
                                <div
                                    key={btn}
                                    className={styles['filter-btn']}
                                    onClick={() => applyFilter(btn)}
                                >
                                    {t(`description.${btn}`)}
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles['adjusted-search']}>
                        {filterButtons
                            .filter((item) => searchParams.get(item))
                            .map((btn) => {
                                return (
                                    <div
                                        key={btn}
                                        className={styles['adjust-btn']}
                                    >
                                        {t(`description.${btn}`)}{' '}
                                        <span onClick={() => unselectBtn(btn)}>
                                            X
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className={styles['projects']}>
                    {usersProjectsFromDatabase
                        ?.filter((item: Props) => {
                            const {
                                projectName,
                                status,
                                clientId,
                                lead,
                                manager,
                                teamType,
                                startDate,
                                endDate,
                            } = item;
                            return (
                                filterSearchByInput(projectName) ||
                                filterSearchByInput(status) ||
                                filterSearchByInput(clientId) ||
                                filterSearchByInput(lead) ||
                                filterSearchByInput(manager) ||
                                filterSearchByInput(teamType) ||
                                filterSearchByInput(startDate) ||
                                filterSearchByInput(endDate)
                            );
                        })
                        .filter((item: Props) => {
                            const { status, teamType } = item;
                            if (countButtonFilters() === 0) {
                                return true;
                            }
                            return (
                                filterSearchByButton(status) ||
                                filterSearchByButton(teamType)
                            );
                        })
                        .map((item: Props) => {
                            return (
                                <div
                                    className={styles['project-card-container']}
                                    key={item.id}
                                >
                                    <ProjectCard {...item} />
                                </div>
                            );
                        })}
                </div>
            </section>
        </>
    );
}

export default ProjectsPage;
