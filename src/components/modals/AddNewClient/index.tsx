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
import { useState } from 'react';
import { useApi } from '@hooks/useApi';
import { addNewClient } from '@api/clientService';

function AddClientModal() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [payload, setPayload] = useState({
        region: regions[0],
        companyName: '',
        CEO: '',
        img: '',
    });
    const postClient = useApi(addNewClient);

    function handleNewClientSubmit() {
        postClient.request(payload);
        dispatch(close(modalTypes.addNewClient));
        alert(`New client ${payload.companyName} has been added!`);
    }

    return ReactDom.createPortal(
        <Modal title={t('description.addAClient')}>
            <div className={styles['modal-form']}>
                <TextInput
                    label={`${t('description.companyName')}:`}
                    name="company"
                    type="text"
                    onInput={(e) =>
                        setPayload({
                            ...payload,
                            companyName: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <TextInput
                    label={`${t('description.ceoFullname')}:`}
                    name="ceo"
                    type="text"
                    onInput={(e) =>
                        setPayload({
                            ...payload,
                            CEO: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <TextInput
                    label={`${t('description.img')}:`}
                    name="img"
                    type="text"
                    onInput={(e) =>
                        setPayload({
                            ...payload,
                            img: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <div className={styles['select-input-wrapper']}>
                    <label className={styles['select-label']}>
                        {t('description.region')}:
                    </label>
                    <select
                        className={styles['modal-select']}
                        placeholder="Region"
                        name="region"
                        onChange={(e) =>
                            setPayload({
                                ...payload,
                                region: (e.target as HTMLSelectElement).value,
                            })
                        }
                    >
                        {regions.map((region) => (
                            <option key={region}>{region}</option>
                        ))}
                    </select>
                </div>
                <div className={styles['modal-buttons']}>
                    <AddButton onClick={handleNewClientSubmit}>
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
