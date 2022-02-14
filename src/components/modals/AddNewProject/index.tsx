import ReactDom from 'react-dom';
import { useState } from 'react';
import styles from './AddNewProject.module.css';
import { useTranslation } from 'react-i18next';
import Select from './Select';
import clients from './Select/data/clients.json';
import projectLeads from './Select/data/projectLead.json';
import projectMenagers from './Select/data/projectMenagers.json';
import projectStatuses from './Select/data/projectStatus.json';
import teamMembers from './Select/data/teamMembers.json';
import teamTypes from './Select/data/teamTypes.json';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxStore/reducers';
import { close } from '@reduxStore/actions/modal';
import Modal from '@elements/Modal';
import AddButton from '@elements/Buttons/AddButton';
import DiscardButton from '@elements/Buttons/DiscardButton';

export interface optionsIF {
    id: number;
    label: string;
}

const AddNewProject = () => {
    const { t } = useTranslation();

    const selectClient: optionsIF = {
        id: 0,
        label: t('description.selectClient'),
    };

    const selectProjectLead: optionsIF = {
        id: 0,
        label: t('description.selectProjectLead'),
    };
    const selectProjectMenagers: optionsIF = { id: 0, label: '-' };
    const selectTeamType: optionsIF = {
        id: 0,
        label: t('description.selectTeamType'),
    };
    const selectTeamMembers: optionsIF = {
        id: 0,
        label: t('description.selectTeamMembers'),
    };
    const selectProjectStatus: optionsIF = {
        id: 0,
        label: t('description.selectProjectStatus'),
    };

    const [selectedClient, setSelectedClient] = useState<
        optionsIF | optionsIF[]
    >(selectClient);
    const [selectedProjectLead, setSelectedProjectLead] = useState<
        optionsIF | optionsIF[]
    >(selectProjectLead);
    const [selectedProjectMenagers, setSelectedProjectMenagers] = useState<
        optionsIF | optionsIF[]
    >(selectProjectMenagers);
    const [selectedTeamType, setSelectedTeamType] = useState<
        optionsIF | optionsIF[]
    >(selectTeamType);
    const [selectedTeamMembers, setSelectedTeamMembers] = useState<
        optionsIF | optionsIF[]
    >(selectTeamMembers);
    const [selectedProjectStatus, setSelectedProjectStatus] = useState<
        optionsIF | optionsIF[]
    >(selectProjectStatus);

    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => {
        return state.modal.type[modalTypes.addNewProject];
    });

    if (modal) {
        return ReactDom.createPortal(
            <Modal title={t('description.addPoject')}>
                <div className={styles.projectData}>
                    <label className={`${styles.label} ${styles.labelInput}`}>
                        {t('description.projectName')}:
                    </label>
                    <input className={styles.inputField} type="text" />
                    <label className={styles.label}>
                        {t('description.client')}
                    </label>

                    <Select
                        data={clients}
                        setState={setSelectedClient}
                        prompt={selectedClient}
                    />

                    <label className={styles.label}>
                        {t('description.projectLead')}
                    </label>

                    <Select
                        data={projectLeads}
                        setState={setSelectedProjectLead}
                        prompt={selectedProjectLead}
                    />

                    <label className={styles.label}>
                        {t('description.projectManager')}
                    </label>

                    <Select
                        data={projectMenagers}
                        setState={setSelectedProjectMenagers}
                        prompt={selectedProjectMenagers}
                    />

                    <label className={styles.label}>
                        {t('description.teamType')}
                    </label>

                    <Select
                        data={teamTypes}
                        setState={setSelectedTeamType}
                        prompt={selectedTeamType}
                    />

                    <label className={`${styles.label} ${styles.label2}`}>
                        {t('description.developmentTeam')} - (
                        {t('description.autocompleteMultiselect')})
                    </label>

                    <Select
                        data={teamMembers}
                        setState={setSelectedTeamMembers}
                        prompt={selectedTeamMembers}
                    />

                    <Select
                        data={projectStatuses}
                        setState={setSelectedProjectStatus}
                        prompt={selectedProjectStatus}
                    />

                    <label className={`${styles.label} ${styles.labelInput}`}>
                        {t('description.startDate')}:
                    </label>
                    <input className={styles.inputField} type="date" />
                </div>
                <div className={styles.modalButtons}>
                    <AddButton onClick={() => console.log('Add')}>
                        {t('description.add')}
                    </AddButton>
                    <DiscardButton
                        onClick={() =>
                            dispatch(close(modalTypes.addNewProject))
                        }
                    >
                        {t('description.discard')}
                    </DiscardButton>
                </div>
            </Modal>,
            document.getElementById('projectModal')!
        );
    } else {
        return null;
    }
};

export default AddNewProject;
