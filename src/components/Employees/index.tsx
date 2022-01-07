import styles from './Employees.module.css';
import employees from '@components/Employees/employeesData';
import EmployeeItem from '@components/EmployeeItem';
import { IEmployeeItem } from '@components/EmployeeItem/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function Employees() {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [searchActiveButtons, setSearchActiveButtons] = useState<string[]>(
        []
    );

    function searchButtonExists(searchParam: string): boolean {
        return searchActiveButtons.some(
            (searchBtn) => searchBtn === searchParam
        );
    }

    function employeeExists(
        searchParam: IEmployeeItem,
        filteredEmployees: IEmployeeItem[]
    ): boolean {
        return filteredEmployees.some((searchBtn) => searchBtn === searchParam);
    }

    function addFilter(target: string, keyParam: string) {
        searchParams.append(keyParam, target);
        setSearchParams(searchParams);
        if (!searchButtonExists(target)) {
            setSearchActiveButtons([...searchActiveButtons, target]);
        }
    }

    function findFilters(filterArray: string[], target: string) {
        const foundFilters: string[] = [];
        filterArray.forEach((filter) => {
            if (filter !== target) {
                foundFilters.push(filter);
            }
        });
        return foundFilters;
    }

    function applyFilters(filters: string[], target: string) {
        searchParams.delete(target);
        setSearchParams(searchParams);
        filters.forEach((filter) => {
            searchParams.append(target, filter);
        });
        setSearchParams(searchParams);
    }

    function removeFilter(target: string, keyParam: string) {
        if (searchButtonExists(target)) {
            const newSearchActiveButtons = searchActiveButtons.filter(function (
                item
            ) {
                return item !== target;
            });
            setSearchActiveButtons(newSearchActiveButtons);
            const search = searchParams.getAll(keyParam);
            const foundFilters = findFilters(search, target);
            applyFilters(foundFilters, keyParam);
        }
    }

    function filterEmployees(
        employeesToFilter: IEmployeeItem[],
        keyParam: string
    ) {
        const search = searchParams.getAll(keyParam);
        let filteredEmployees: IEmployeeItem[] = [];
        if (search.length === 0) {
            filteredEmployees = employeesToFilter;
        } else {
            employeesToFilter.forEach((employee) => {
                search.forEach((filter) => {
                    if (
                        employee.job.toLowerCase() === filter.toLowerCase() ||
                        employee.availability.toLowerCase() ===
                            filter.toLowerCase()
                    ) {
                        if (!employeeExists(employee, filteredEmployees)) {
                            filteredEmployees.push(employee);
                        }
                    }
                });
            });
        }
        return filteredEmployees;
    }

    return (
        <div className={styles['employees']}>
            <h1 className={styles['page-title']}>People</h1>
            <div className={styles['input-search-icon-wrapper']}>
                <input
                    className={styles['input']}
                    placeholder="Search..."
                    onChange={(event) => {
                        const search = event.target.value;
                        if (search) {
                            searchParams.set('search', search);
                            setSearchParams(searchParams);
                        } else {
                            searchParams.delete('search');
                            setSearchParams(searchParams);
                        }
                    }}
                />
                <FontAwesomeIcon icon={faSearch} className={styles['icon']} />
            </div>
            <div className={styles['search-labels-wrapper']}>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Sensei', 'filter[]')}
                >
                    Sensei
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Front-End', 'filter[]')}
                >
                    Front-End
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Back-End', 'filter[]')}
                >
                    Back-End
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('QA', 'filter[]')}
                >
                    QA
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('DevOps', 'filter[]')}
                >
                    DevOps
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Full-Stack', 'filter[]')}
                >
                    Full-Stack
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Available', 'filter[]')}
                >
                    Available
                </button>
            </div>
            <div className={styles['search-active-buttons']}>
                {searchActiveButtons.map((query) => (
                    <button
                        key={query}
                        className={styles['search-active-button']}
                        value={query}
                        onClick={() => removeFilter(query, 'filter[]')}
                    >
                        {query}
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            className={styles['icon']}
                        />
                    </button>
                ))}
            </div>
            <div className={styles['employees-items']}>
                {filterEmployees(employees, 'filter[]')
                    .filter((emp) => {
                        const search = searchParams.get('search');
                        if (!search) {
                            return true;
                        }
                        if (
                            emp.fullname
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            emp.job
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            emp.availability
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ) {
                            return true;
                        }
                    })
                    .map((employee: IEmployeeItem) => (
                        <EmployeeItem
                            employeeItem={employee}
                            key={employee.id}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Employees;
