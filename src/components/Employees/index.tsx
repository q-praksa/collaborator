import styles from './Employees.module.css';
import employees from '@components/Employees/employeesData';
import EmployeeItem from '@components/EmployeeItem';
import { IEmployeeItem } from '@components/EmployeeItem/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { employeeExists, findFilters } from '@utils/employees';
import { filters } from '@constants/employees';

function Employees() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams({});
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    function searchFilterExists(searchParam: string): boolean {
        return selectedFilters.includes(searchParam);
    }

    function addFilter(key: string, value: string) {
        searchParams.append(key, value);
        setSearchParams(searchParams);
        if (!searchFilterExists(value)) {
            setSelectedFilters([...selectedFilters, value]);
        }
    }

    function applyFilters(filters: string[], key: string) {
        searchParams.delete(key);
        setSearchParams(searchParams);
        filters.forEach((filter) => {
            searchParams.append(key, filter);
        });
        setSearchParams(searchParams);
    }

    function removeFilter(key: string, value: string) {
        if (!searchFilterExists(value)) {
            return;
        }
        const newselectedFilters = selectedFilters.filter(function (item) {
            return item !== value;
        });
        setSelectedFilters(newselectedFilters);
        const search = searchParams.getAll(key);
        const foundFilters = findFilters(search, value);
        applyFilters(foundFilters, key);
    }

    function filterEmployees(employeesToFilter: IEmployeeItem[], key: string) {
        const search = searchParams.getAll(key);
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

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const search = event.target.value;
        if (search) {
            searchParams.set('search', search);
            setSearchParams(searchParams);
        } else {
            searchParams.delete('search');
            setSearchParams(searchParams);
        }
    }

    return (
        <div className={styles['employees']}>
            <h1 className={styles['page-title']}>
                {t('description.employees')}
            </h1>
            <div className={styles['input-search-icon-wrapper']}>
                <div className={styles['input-wrapper']}>
                    <input
                        className={styles['input']}
                        placeholder={t('description.search')}
                        onChange={handleOnChange}
                        type="search"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={styles['icon']}
                    />
                </div>
            </div>
            <div className={styles['search-labels-wrapper']}>
                {filters.map((filterValue) => (
                    <button
                        key={filterValue}
                        onClick={() =>
                            addFilter(
                                'filter[]',
                                t(`description.${filterValue}`)
                            )
                        }
                        className={styles['search-button']}
                    >
                        {t(`description.${filterValue}`)}
                    </button>
                ))}
            </div>
            <div className={styles['search-active-buttons']}>
                {selectedFilters.map((filterValue) => (
                    <button
                        key={filterValue}
                        className={styles['search-active-button']}
                        value={filterValue}
                        onClick={() => removeFilter('filter[]', filterValue)}
                    >
                        {filterValue}
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
                        return (
                            emp.fullname
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            emp.job
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            emp.availability
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        );
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
