import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.mainHeader}>
            <p className={styles.collaboratorLogo}>collaborator</p>
            <div className={styles.headerRight}>
                <div className={styles.circleDiv}></div>
                <FontAwesomeIcon
                    className={styles.faCaretDown}
                    icon={faCaretDown}
                />
            </div>
        </header>
    );
};

export default Header;
