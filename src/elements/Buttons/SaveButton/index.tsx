import { FC } from 'react';
import { IButtonProps } from '../buttonTypes';
import styles from './SaveButton.module.css';

const SaveButton: FC<IButtonProps> = ({ onClick, children }) => {
    return (
        <button
            type="button"
            className={`${styles.btn} ${styles.add_btn}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default SaveButton;
