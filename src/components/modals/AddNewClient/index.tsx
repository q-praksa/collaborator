import ReactDom from 'react-dom';
import styles from './AddClient.module.css';
import { regions } from '@constants/regions';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { useTranslation } from 'react-i18next';

function AddClientModal() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return ReactDom.createPortal(
        <div className={styles['modal-container']}>
            <label className={styles['modal-title']}>
                {t('description.addAClient')}
            </label>
            <div className={styles['modal-form']}>
                <div className={styles['modal-input-wrapper']}>
                    <label className={styles['modal-label']}>
                        {t('description.companyName')}:
                    </label>
                    <input className={styles['modal-input']} type="text" />
                </div>
                <div className={styles['modal-input-wrapper']}>
                    <label className={styles['modal-label']}>
                        {t('description.ceoFullname')}:
                    </label>
                    <input className={styles['modal-input']} type="text" />
                </div>
                <div className={styles['modal-input-wrapper']}>
                    <label className={styles['modal-label']}>
                        {t('description.region')}:
                    </label>
                    <select
                        className={styles['modal-select']}
                        placeholder="Region"
                    >
                        {regions.map((region) => (
                            <option key={region}>{region}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles['modal-buttons']}>
                <button
                    type="button"
                    className={`${styles['modal-btn']} ${styles['modal-btn-add']}`}
                >
                    {t('description.add')}
                </button>
                <button
                    type="button"
                    className={`${styles['modal-btn']} ${styles['modal-btn-discard']}`}
                    onClick={() => dispatch(close(modalTypes.addNewClient))}
                >
                    {t('description.discard')}
                </button>
            </div>
        </div>,
        document.getElementById('clientModal')!
    );
}

export default AddClientModal;
