import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { IButtonProps } from '../buttonTypes';
import styles from './ActiveFilterButton.module.css';

const ActiveFilterButton: FC<IButtonProps> = ({ onClick, children }) => {
    return (
        <button className={styles['search-active-button']} onClick={onClick}>
            {children}
            <FontAwesomeIcon icon={faTimesCircle} className={styles['icon']} />
        </button>
    );
};

export default ActiveFilterButton;
