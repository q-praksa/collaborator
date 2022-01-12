import ProjectCard from '@components/ProjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './ProjectsPage.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { projectList } from './ProjectsPageData';
import { useTranslation } from 'react-i18next';
import { filterButtons } from '@constants/projects';

function ProjectsPage() {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [inputValue, setInputValue] = useState(
        searchParams.get('search') || ''
    );
    const { t } = useTranslation();

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

    function filterSearchByInput(x: string) {
        if (!searchParams.get('search')) {
            return true;
        }
        return x
            .toLowerCase()
            .includes(String(searchParams.get('search')).toLowerCase());
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
        <section className={styles['projects-page']}>
            <div className={styles['filter-area']}>
                <h1>{t('description.projects')}</h1>
                <div className={styles['input-container']}>
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
                                <div key={btn} className={styles['adjust-btn']}>
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
                {projectList
                    .filter((item) => {
                        const {
                            status,
                            client,
                            lead,
                            manager,
                            teamType,
                            startDate,
                            endDate,
                        } = item;
                        return (
                            filterSearchByInput(status) ||
                            filterSearchByInput(client) ||
                            filterSearchByInput(lead) ||
                            filterSearchByInput(manager) ||
                            filterSearchByInput(teamType) ||
                            filterSearchByInput(startDate) ||
                            filterSearchByInput(endDate)
                        );
                    })
                    .filter((item) => {
                        const { status, teamType } = item;
                        if (countButtonFilters() === 0) {
                            return true;
                        }
                        return (
                            filterSearchByButton(status) ||
                            filterSearchByButton(teamType)
                        );
                    })
                    .map((item) => {
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
    );
}

export default ProjectsPage;
