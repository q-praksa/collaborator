import ReactDom from 'react-dom';
import { useDispatch } from 'react-redux';
import { close } from '@reduxStore/actions/modal';
import styles from './AddProject.module.css';
import { useTranslation } from 'react-i18next';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import AddButton from '@elements/Buttons/AddButton';
import DiscardButton from '@elements/Buttons/DiscardButton';
import Modal from '@elements/Modal';
import TextInput from '@elements/Inputs/TextInput';
import { useState } from 'react';
import Select from 'react-select';
import { colourStyles } from './styles';
import { teamType } from '@constants/projects';

const AddProject = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        projectName: '',
        clientId: '',
        lead: '',
        manager: '',
        startDate: '',
        teamType: '',
    });
    //employees to be assigned on project
    const [usersPayload, setUsersPayload] = useState([]);

    //test select options
    const colourOptions: any = [
        { value: 'ocean', label: 'Ocean' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
        { value: 'red', label: 'Red' },
    ];

    const teamTypeOptions: any = [
        { value: teamType[0], label: teamType[0] },
        { value: teamType[1], label: teamType[1] },
        { value: teamType[2], label: teamType[2] },
    ];

    function handleAddProject() {
        console.log(payload);
    }

    return ReactDom.createPortal(
        <Modal title={t('description.addProject')}>
            <div className={styles.modal}>
                <TextInput
                    label={`${t('description.projectName')}:`}
                    name="project"
                    type="text"
                    onInput={(e) =>
                        setPayload({
                            ...payload,
                            projectName: (e.target as HTMLInputElement).value,
                        })
                    }
                />
                <label className={styles.label}>
                    {t('description.client')}:
                </label>
                <Select
                    defaultValue={colourOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="client"
                    styles={colourStyles}
                    options={colourOptions}
                />
                <label className={styles.label}>
                    {t('description.projectLead')}:
                </label>
                <Select
                    defaultValue={colourOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="projectLead"
                    styles={colourStyles}
                    options={colourOptions}
                />
                <label className={styles.label}>
                    {t('description.projectManager')}:
                </label>
                <Select
                    defaultValue={colourOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="projectManager"
                    styles={colourStyles}
                    options={colourOptions}
                />
                <label className={styles.label}>
                    {t('description.teamType')}:
                </label>
                <Select
                    defaultValue={teamTypeOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="teamType"
                    styles={colourStyles}
                    options={teamTypeOptions}
                />
                <label className={styles.label}>
                    {t('description.developmentTeam')}:
                </label>
                <Select
                    defaultValue={colourOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="developmentTeam"
                    styles={colourStyles}
                    options={colourOptions}
                    isMulti
                />
                <label className={styles.label}>
                    {t('description.selectProjectStatus')}:
                </label>
                <Select
                    defaultValue={colourOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="projectStatus"
                    styles={colourStyles}
                    options={colourOptions}
                />
                <label className={styles.label}>
                    {t('description.startDate')}:
                </label>
                <input className={styles.date} type="date" />
                <footer className={styles.modal_footer}>
                    <AddButton onClick={handleAddProject}>
                        {t('description.add')}
                    </AddButton>
                    <DiscardButton
                        onClick={() =>
                            dispatch(close(modalTypes.addNewProject))
                        }
                    >
                        {t('description.discard')}
                    </DiscardButton>
                </footer>
            </div>
        </Modal>,
        document.getElementById('modal')!
    );
};

export default AddProject;
