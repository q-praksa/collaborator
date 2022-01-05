import styles from './Employees.module.css';
import employees from '@components/Employees/employeesData';
import EmployeeItem from '@components/EmployeeItem';
import { IEmployeeItem } from '@components/EmployeeItem/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';

function Employees() {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className={styles['employees']}>
            <h1 className={styles['page-title']}>People</h1>
            <div className={styles['input-search-icon-wrapper']}>
                <input
                    className={styles['input']}
                    placeholder="Search..."
                    value={searchParams.get('search') || ''}
                    onChange={(event) => {
                        const search = event.target.value;
                        if (search) {
                            setSearchParams({ search });
                        } else {
                            setSearchParams({});
                        }
                    }}
                />
                <FontAwesomeIcon icon={faSearch} className={styles['icon']} />
            </div>
            <div className={styles['employees-items']}>
                {employees
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
