import sidebarData from '@components/Sidebar/SidebarData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Sidebar.module.css';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <aside className={styles.sidebar}>
            <div className={styles['sidebar-img']}>
                <img src="" alt="sidebar-img" />
            </div>
            <p className={styles.fullname}>{t('description.fullname')}</p>
            <ul className={styles['sidebar-fields']}>
                {sidebarData.map((sidebarItem) => {
                    const { id, icon, label } = sidebarItem;
                    return (
                        <li key={id}>
                            <span className={styles['icon-container']}>
                                <FontAwesomeIcon
                                    className={styles.icon}
                                    icon={icon}
                                />
                            </span>
                            <span>{t(`description.${label}`)}</span>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
