import React from 'react';
import styles from './DropdownMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

type Props = {
    setOpenMenu: (openMenu: boolean) => void;
};

const DropdownMenu: React.FC<Props> = ({ setOpenMenu }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('admin');
        navigate('/login');
    };

    const profile = () => {
        navigate('/profile');
    };

    return (
        <section className={styles.dropdown} onClick={() => setOpenMenu(false)}>
            <div>
                <div className={styles.flex}>
                    <div className={styles.profile} onClick={profile}>
                        <FontAwesomeIcon icon={faIdCard} />
                        Profile
                    </div>
                    <div className={styles.logout} onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Logout
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DropdownMenu;
