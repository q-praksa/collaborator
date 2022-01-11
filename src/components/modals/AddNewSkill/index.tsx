import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import styles from './AddNewSkill.module.css';
import { useTranslation } from 'react-i18next';

const Modal = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return ReactDom.createPortal(
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <header className={styles.modal_header}>
                    <h2 className={styles.title}>
                        {t('description.addSkill')}
                    </h2>
                </header>
                <input type="text" className={styles.inputModal} />
                <footer className={styles.modal_footer}>
                    <button
                        className={styles.modal_discard}
                        onClick={() => dispatch(close())}
                    >
                        {t('description.discard')}
                    </button>
                    <button className={styles.modal_add}>
                        {t('description.add')}
                    </button>
                </footer>
            </div>
        </div>,
        document.getElementById('modal')!
    );
};

export default Modal;
