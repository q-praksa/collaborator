import { FC } from 'react';
import { IButtonProps } from '../buttonTypes';
import styles from './FilterButton.module.css';

const FilterButton: FC<IButtonProps> = ({ onClick, children }) => {
    return (
        <button className={styles['search-button']} onClick={onClick}>
            {children}
        </button>
    );
};

export default FilterButton;
