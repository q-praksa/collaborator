import styles from '@components/EmployeeItem/EmployeeItem.module.css';
import { useTranslation } from 'react-i18next';
import { PropsTypeClientItem } from './types';

function ClientItem({ clientItem }: PropsTypeClientItem) {
    const { t } = useTranslation();
    return (
        <div className={styles['profile-card']}>
            <img
                className={styles['profile-photo']}
                alt="client photo"
                src={clientItem.img}
            />
            <h2>{clientItem.companyName}</h2>
            <h3 className={styles['text-gray-color']}>{clientItem.CEO}</h3>
        </div>
    );
}

export default ClientItem;
