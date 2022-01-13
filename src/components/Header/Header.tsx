import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
import Local from '@components/Local';
import DropdownMenu from '@components/DropdownMenu/DropdownMenu';

const Header: React.FC = () => {
    const [openMenu, setOpenMenu] = useState(false);

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
                <div className={styles.circleDiv}>
                    {openMenu ? (
                        <DropdownMenu setOpenMenu={setOpenMenu} />
                    ) : null}
                </div>
                <FontAwesomeIcon
                    className={styles.faCaretDown}
                    icon={faCaretDown}
                    onClick={() => setOpenMenu(!openMenu)}
                />
            </div>
        </header>
    );
};

export default Header;
