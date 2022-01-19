import { FC } from 'react';
import { IButtonProps } from '../buttonTypes';
import styles from './ActiveFilterButton.module.css';

const ActiveFilterButton: FC<IButtonProps> = ({ onClick, children }) => {
    return (
        <button className={styles['search-active-button']} onClick={onClick}>
            {children}
        </button>
    );
};

export default ActiveFilterButton;
