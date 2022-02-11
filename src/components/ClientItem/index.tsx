import styles from '@components/ClientItem/ClientItem.module.css';
import { PropsTypeClientItem } from './types';

export default function ClientItem({ clientItem }: PropsTypeClientItem) {
    return (
        <div className={styles['profile-card']}>
            <img
                className={styles['profile-photo']}
                alt="client photo"
                src={clientItem.img}
            />
            <h2 className={styles.name}>{clientItem.companyName}</h2>
            <h3 className={styles['text-gray-color']}>{clientItem.CEO}</h3>
        </div>
    );
}
