import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/index';
import styles from './Layout.module.css';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className={styles['layout-container']}>
            <Header />
            <div className={styles['content-container']}>
                <Sidebar />
                <main className={styles['main-content']}>{children}</main>
            </div>
        </div>
    );
}

export default Layout;
