import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
import Local from '@components/Local';

const Header: React.FC = () => {
    const navigate = useNavigate();
    function handleHomeNavigateClick() {
        navigate('/');
    }
    return (
        <header className={styles.mainHeader}>
            <button
                onClick={handleHomeNavigateClick}
                className={styles.collaboratorLogo}
            >
                collaborator
            </button>
            <Local />
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
