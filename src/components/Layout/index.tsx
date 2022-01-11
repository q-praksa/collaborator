import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/index';
import styles from './Layout.module.css';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className={styles['layout-container']}>
            <Header />
            <div className={styles['content-container']}>
                <Sidebar />
                <main className={styles['main-content']}>
                    <Outlet />
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
