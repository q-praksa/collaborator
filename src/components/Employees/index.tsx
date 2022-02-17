import styles from './Employees.module.css';
//import employees from '@components/Employees/employeesData';
import EmployeeItem from '@components/EmployeeItem';
import { IEmployeeItem } from '@components/EmployeeItem/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { employeeExists, findFilters } from '@utils/employees';
import { filters } from '@constants/employees';
import { useDispatch, useSelector } from 'react-redux';
import { open } from '@reduxStore/actions/modal';
import { RootState } from '@reduxStore/reducers';
import AddNewEmployee from '@components/modals/AddNewEmployee';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import OpenModalButton from '@elements/Buttons/OpenModalButton';
import FilterButton from '@elements/Buttons/FilterButton';
import ActiveFilterButton from '@elements/Buttons/ActiveFilterButton';
import { useApi } from '@hooks/useApi';
import { getUsers } from '@api/userService';

function Employees() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams({});
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const dispatch = useDispatch();
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewEmployee]
    );
    //let employeesFromDatabase: IEmployeeItem[] | null;

    const getEmployees = useApi(getUsers);
    useEffect(() => {
        getEmployees.request();
    }, []);
    const employeesFromDatabase = getEmployees.data;
    console.log(employeesFromDatabase);
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

    function filterEmployees(
        employeesToFilter: IEmployeeItem[] | null,
        key: string
    ) {
        if (!employeesToFilter) {
            const emptyArray: IEmployeeItem[] = [];
            return emptyArray;
        }
        const search = searchParams.getAll(key);
        let filteredEmployees: IEmployeeItem[] | null = [];
        if (search.length === 0) {
            filteredEmployees = employeesToFilter;
        } else {
            employeesToFilter?.forEach((employee) => {
                search.forEach((filter) => {
                    if (
                        employee.job.toLowerCase() === filter.toLowerCase() ||
                        employee.status.toLowerCase() === filter.toLowerCase()
                    ) {
                        if (!employeeExists(employee, filteredEmployees)) {
                            filteredEmployees?.push(employee);
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
                <OpenModalButton
                    onClick={() => dispatch(open(modalTypes.addNewEmployee))}
                />
            </div>
            <div className={styles['search-labels-wrapper']}>
                {filters.map((filterValue) => (
                    <FilterButton
                        key={filterValue}
                        onClick={() =>
                            addFilter(
                                'filter[]',
                                t(`description.${filterValue}`)
                            )
                        }
                    >
                        {t(`description.${filterValue}`)}
                    </FilterButton>
                ))}
            </div>
            <div className={styles['search-active-buttons']}>
                {selectedFilters.map((filterValue) => (
                    <ActiveFilterButton
                        key={filterValue}
                        onClick={() => removeFilter('filter[]', filterValue)}
                        value={filterValue}
                    >
                        {filterValue}
                    </ActiveFilterButton>
                ))}
            </div>
            <div className={styles['employees-items']}>
                {filterEmployees(employeesFromDatabase, 'filter[]')
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
                            emp.status
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

            <div>{modal ? <AddNewEmployee /> : null}</div>
        </div>
    );
}

export default Employees;
