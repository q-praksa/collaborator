import styles from './Employees.module.css';
import employees from '@components/Employees/employeesData';
import EmployeeItem from '@components/EmployeeItem';
import { IEmployeeItem } from '@components/EmployeeItem/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function Employees() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchActiveButtons, setSearchActiveButtons] = useState<string[]>(
        []
    );
    const [isFilterSearch, setIsFilterSearch] = useState(false);

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

    function addFilter(target: string) {
        searchParams.append('filter', target);
        const filterCount = searchParams.getAll('filter');
        if (filterCount.length > 0) {
            setIsFilterSearch(true);
        }
        setSearchParams(searchParams);
        if (!searchButtonExists(target)) {
            setSearchActiveButtons([...searchActiveButtons, target]);
        }
    }

    function removeFilter(target: string) {
        const filterCount = searchParams.getAll('filter');
        if (searchButtonExists(target)) {
            const newSearchACtiveButtons = searchActiveButtons.filter(function (
                item
            ) {
                return item !== target;
            });
            setSearchActiveButtons(newSearchACtiveButtons);
            searchParams.delete(target);
            setSearchParams({ ...searchParams });
        }
        if (filterCount.length > 0) {
            setIsFilterSearch(true);
        } else {
            setIsFilterSearch(false);
        }
    }

    function filterEmployees(employeesToFilter: IEmployeeItem[]) {
        const search = searchParams.getAll('filter');
        let filteredEmployees: IEmployeeItem[] = [];
        console.log(search);
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
                            setSearchParams({ search });
                            setIsFilterSearch(false);
                            setSearchActiveButtons([]);
                        } else {
                            setSearchParams({});
                        }
                    }}
                />
                <FontAwesomeIcon icon={faSearch} className={styles['icon']} />
            </div>
            <div className={styles['search-labels-wrapper']}>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Sensei')}
                >
                    Sensei
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Front-End')}
                >
                    Front-End
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Back-End')}
                >
                    Back-End
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('QA')}
                >
                    QA
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('DevOps')}
                >
                    DevOps
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Full-Stack')}
                >
                    Full-Stack
                </button>
                <button
                    className={styles['search-button']}
                    onClick={() => addFilter('Available')}
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
                        onClick={() => removeFilter(query)}
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
                {!isFilterSearch &&
                    employees
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
                {isFilterSearch &&
                    filterEmployees(employees).map(
                        (employee: IEmployeeItem) => (
                            <EmployeeItem
                                employeeItem={employee}
                                key={employee.id}
                            />
                        )
                    )}
            </div>
        </div>
    );
}

export default Employees;
