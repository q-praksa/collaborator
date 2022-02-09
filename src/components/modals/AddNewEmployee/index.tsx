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
import { useState } from 'react';
import { useApi } from '@hooks/useApi';
import { addNewEmployee } from '@api/employeeService';

const AddNewEmployee = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const firstName = '';
    const lastName = '';
    const [payload, setPayload] = useState({
        fullname: `${firstName}${lastName}`,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        job: '',
    });
    const postEmployee = useApi(addNewEmployee);

    const result = postEmployee.data;
    console.log(result);

    function handleNewEmployeeSubmit() {
        postEmployee.request(payload);
        dispatch(close(modalTypes.addNewEmployee));
        alert(`New employee ${payload.firstName} has been added!`);
    }

    return ReactDom.createPortal(
        <Modal title={t('description.addEmployee')}>
            <div className={styles['modal-form']}>
                <TextInput
                    label={`${t('description.firstName')}:`}
                    name="firstName"
                    type="text"
                    onChange={(e) =>
                        setPayload({
                            ...payload,
                            firstName: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <TextInput
                    label={`${t('description.lastName')}:`}
                    name="lastName"
                    type="text"
                    onChange={(e) =>
                        setPayload({
                            ...payload,
                            lastName: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <TextInput
                    label="Email:"
                    name="email"
                    type="email"
                    onChange={(e) =>
                        setPayload({
                            ...payload,
                            email: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <TextInput
                    label={`${t('description.password')}:`}
                    name="password"
                    type="password"
                    onChange={(e) =>
                        setPayload({
                            ...payload,
                            password: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <div className={styles.select_input_wrapper}>
                    <label className={styles.select_label}>
                        {t('description.jobTitle')}:
                    </label>
                    <select
                        className={styles.select}
                        placeholder="Job Title"
                        onChange={(e) =>
                            setPayload({
                                ...payload,
                                job: (e.target as HTMLSelectElement).value,
                            })
                        }
                    >
                        {positions.map((position) => (
                            <option key={position}>
                                {t(`description.${position}`)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.modal_buttons}>
                    <AddButton onClick={() => handleNewEmployeeSubmit()}>
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
