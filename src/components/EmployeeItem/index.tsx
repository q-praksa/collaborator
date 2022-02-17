import styles from './EmployeeItem.module.css';
import { PropsTypeEmployeeItem } from '@components/EmployeeItem/types';
import { useTranslation } from 'react-i18next';
import DeleteButton from '@elements/Buttons/DeleteButton';
import { useApi } from '@hooks/useApi';
import { deleteUser } from '@api/userService';
import { useDispatch } from 'react-redux';
import { deleteUserAction } from '@reduxStore/actions/users';

function EmployeeItem({ employeeItem }: PropsTypeEmployeeItem) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const deleteUserApi = useApi(deleteUser);

    function handleDeleteUser(id: string) {
        const confirm = window.confirm(t('description.confirmDeleteQuestion'));
        if (confirm) {
            deleteUserApi.request(id);
            dispatch(deleteUserAction(id));
        }
    }
    return (
        <div className={styles['profile-card']}>
            <div className={styles['delete-div']}>
                <DeleteButton onClick={() => handleDeleteUser(employeeItem.id)}>
                    X
                </DeleteButton>
            </div>
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
                    {t(`description.${employeeItem.status}`)}
                </span>
            </p>
        </div>
    );
}

export default EmployeeItem;
