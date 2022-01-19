import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { IButtonProps } from '../buttonTypes';
import styles from './OpenModalButton.module.css';

const OpenModalButton: FC<IButtonProps> = ({ onClick }) => {
    return (
        <button className={styles['plus-btn']} onClick={onClick}>
            <FontAwesomeIcon icon={faPlus} className={styles['plus-icon']} />
        </button>
    );
};

export default OpenModalButton;
