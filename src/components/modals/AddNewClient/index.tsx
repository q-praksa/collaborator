import ReactDom from 'react-dom';
import styles from './AddClient.module.css';
import { regions } from '@constants/regions';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { useTranslation } from 'react-i18next';
import Modal from '@elements/Modal';
import TextInput from '@elements/Inputs/TextInput';
import AddButton from '@elements/Buttons/AddButton';
import DiscardButton from '@elements/Buttons/DiscardButton';

function AddClientModal() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return ReactDom.createPortal(
        <Modal title={t('description.addAClient')}>
            <div className={styles['modal-form']}>
                <TextInput
                    label={`${t('description.companyName')}:`}
                    name="company"
                    type="text"
                />
                <TextInput
                    label={`${t('description.ceoFullname')}:`}
                    name="ceo"
                    type="text"
                />
                <TextInput
                    label={`${t('description.region')}:`}
                    name="region"
                    type="text"
                />
                <div className={styles['select-input-wrapper']}>
                    <label className={styles['select-label']}>
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
                <div className={styles['modal-buttons']}>
                    <AddButton onClick={() => console.log('Add')}>
                        {t('description.add')}
                    </AddButton>
                    <DiscardButton
                        onClick={() => dispatch(close(modalTypes.addNewClient))}
                    >
                        {t('description.discard')}
                    </DiscardButton>
                </div>
            </div>
        </Modal>,

        document.getElementById('clientModal')!
    );
}

export default AddClientModal;
