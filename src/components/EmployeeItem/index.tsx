import styles from './EmployeeItem.module.css';
import { PropsTypeEmployeeItem } from '@components/EmployeeItem/types';

function EmployeeItem({ employeeItem }: PropsTypeEmployeeItem) {
    return (
        <div className={styles['profile-card']}>
            <img
                className={styles['profile-photo']}
                alt="profile photo"
                src={employeeItem.img}
            />
            <h2>{employeeItem.fullname}</h2>
            <h3 className={styles['text-gray-color']}>{employeeItem.job}</h3>
            <p className={styles['text-gray-color']}>
                Availability:{' '}
                <span className={styles['span']}>
                    {employeeItem.availability}
                </span>
            </p>
        </div>
    );
}

export default EmployeeItem;
