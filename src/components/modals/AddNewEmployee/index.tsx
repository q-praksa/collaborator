import ReactDom from 'react-dom';
import styles from './AddNewEmployee.module.css';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { useTranslation } from 'react-i18next';
import { positions } from '@constants/employees';
import Modal from '@elements/Modal';
import TextInput from '@elements/Inputs/TextInput';
import AddButton from '@elements/Buttons/AddButton';
import DiscardButton from '@elements/Buttons/DiscardButton';

const AddNewEmployee = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return ReactDom.createPortal(
        <Modal title={t('description.addEmployee')}>
            <div className={styles['modal-form']}>
                <TextInput
                    label={`${t('description.firstName')}:`}
                    name="firstName"
                    type="text"
                />
                <TextInput
                    label={`${t('description.lastName')}:`}
                    name="lastName"
                    type="text"
                />
                <TextInput label="Email:" name="email" type="email" />
                <TextInput
                    label={`${t('description.password')}:`}
                    name="password"
                    type="password"
                />
                <div className={styles.select_input_wrapper}>
                    <label className={styles.select_label}>
                        {t('description.jobTitle')}:
                    </label>
                    <select className={styles.select} placeholder="Job Title">
                        {positions.map((position) => (
                            <option key={position}>
                                {t(`description.${position}`)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.modal_buttons}>
                    <AddButton onClick={() => console.log('')}>
                        {t('description.add')}
                    </AddButton>
                    <DiscardButton
                        onClick={() =>
                            dispatch(close(modalTypes.addNewEmployee))
                        }
                    >
                        {t('description.discard')}
                    </DiscardButton>
                </div>
            </div>
        </Modal>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('employee')!
    );
};

export default AddNewEmployee;
