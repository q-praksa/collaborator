import { FC } from 'react';
import { IButtonProps } from '../buttonTypes';
import styles from './DeleteButton.module.css';

const DeleteButton: FC<IButtonProps> = ({ onClick, children }) => {
    return (
        <button
            type="button"
            className={`${styles.btn} ${styles.delete_btn} ${styles.tooltiptext}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default DeleteButton;
