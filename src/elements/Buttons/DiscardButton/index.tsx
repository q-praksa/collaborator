import { FC } from 'react';
import { IButtonProps } from '../buttonTypes';
import styles from './DiscardButton.module.css';

const DiscardButton: FC<IButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`${styles.btn} ${styles.discard_btn}`}
        >
            {children}
        </button>
    );
};

export default DiscardButton;
