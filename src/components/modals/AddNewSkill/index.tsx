import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import styles from './AddNewSkill.module.css';
import { useTranslation } from 'react-i18next';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import AddButton from '@elements/Buttons/AddButton';
import DiscardButton from '@elements/Buttons/DiscardButton';

const Modal = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    return ReactDom.createPortal(
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <header className={styles.modal_header}>
                    <h2 className={styles.title}>
                        {t('description.addSkill')}:
                    </h2>
                </header>
                <input type="text" className={styles.inputModal} />
                <footer className={styles.modal_footer}>
                    <AddButton onClick={() => console.log('')}>
                        {t('description.add')}
                    </AddButton>
                    <DiscardButton
                        onClick={() => dispatch(close(modalTypes.addNewSkill))}
                    >
                        {t('description.discard')}
                    </DiscardButton>
                </footer>
            </div>
        </div>,
        document.getElementById('modal')!
    );
};

export default Modal;
