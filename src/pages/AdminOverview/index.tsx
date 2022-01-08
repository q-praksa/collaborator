import { overviewData } from './data';
import styles from './AdminOverview.module.css';

const AdminOverview = () => {
    return (
        <div className={styles.container}>
            {overviewData.map((dataItem) => {
                return (
                    <div
                        key={dataItem.id}
                        className={`${styles.itemContainer} ${
                            styles[dataItem.color]
                        }`}
                    >
                        <p>{dataItem.label}</p>
                        <p className={styles.count}>{dataItem.count}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default AdminOverview;
