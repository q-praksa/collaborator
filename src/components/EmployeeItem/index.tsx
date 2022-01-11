import styles from './EmployeeItem.module.css';
import { PropsTypeEmployeeItem } from '@components/EmployeeItem/types';
import { useTranslation } from 'react-i18next';

function EmployeeItem({ employeeItem }: PropsTypeEmployeeItem) {
    const { t } = useTranslation();
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
                {t('description.availability')}:{' '}
                <span className={styles['span']}>
                    {t(`description.${employeeItem.availability}`)}
                </span>
            </p>
        </div>
    );
}

export default EmployeeItem;
