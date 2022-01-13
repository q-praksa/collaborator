import sidebarData from '@components/Sidebar/SidebarData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Sidebar.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const { t } = useTranslation();
    const isAdminLogged = JSON.parse(localStorage.getItem('admin') || 'false');

    function displaySidebarField(
        roleName: string,
        isAdmin: boolean,
        styleName: string,
        navDataProp: { isActive: boolean }
    ) {
        if (
            (roleName === 'admin' && isAdmin) ||
            (roleName === 'user' && !isAdmin)
        ) {
            return `${styles[`${styleName}`]} ${checkIfActive(navDataProp)}`;
        } else {
            return `${styles.hidden} ${checkIfActive(navDataProp)}`;
        }
    }

    function checkIfActive(navData: { isActive: boolean }) {
        return navData.isActive ? styles.selected : '';
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles['sidebar-img']}>
                <img src="" alt="sidebar-img" />
            </div>
            <p className={styles.fullname}>{t('description.fullname')}</p>
            <ul className={styles['sidebar-fields']}>
                {sidebarData.map((sidebarItem) => {
                    const { id, icon, styleName, label, route, role } =
                        sidebarItem;
                    return (
                        <NavLink
                            to={route}
                            key={id}
                            className={(navData) =>
                                displaySidebarField(
                                    role,
                                    isAdminLogged,
                                    styleName,
                                    navData
                                )
                            }
                        >
                            <li>
                                <span className={styles['icon-container']}>
                                    <FontAwesomeIcon
                                        className={styles.icon}
                                        icon={icon}
                                    />
                                </span>
                                <span>{t(`description.${label}`)}</span>
                            </li>
                        </NavLink>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
