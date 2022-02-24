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
import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { colourStyles } from './styles';
import { projectStatuses, teamTypes } from '@constants/projects';
import { selectType } from './types';
import { getAllClientsAction } from '@reduxStore/actions/client';
import { getAllClients } from '@api/clientService';
import { clientPayloadType, userPayloadType } from '@api/types';
import { getUsers } from '@api/userService';
import { getUsersAction } from '@reduxStore/actions/users';
import { addNewProject } from '@api/projectsService';
import { addProjectUser } from '@api/projectUserService';

const AddProject = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [usersPayload, setUsersPayload]: any = useState({
        usersIDs: [],
    });
    const [clientsOptions, setClientsOptions]: selectType[] | any = useState(
        []
    );
    const [employeeOptions, setemployeeOptions]: selectType[] | any = useState(
        []
    );
    const [teamTypeOptions, setTeamTypeOptions]: selectType[] | any = useState(
        []
    );
    const [projectStatusOptions, setProjectStatusOptions]: selectType[] | any =
        useState([]);
    const [loading, setLoading] = useState(false);
    const componentMounted = useRef(true);
    const [payload, setPayload] = useState({
        projectName: '',
        clientId: '',
        lead: '',
        manager: '',
        startDate: new Date(),
        teamType: teamTypes[0],
        status: projectStatuses[0],
    });

    const getAllClientsAndUsersFromApi = async () => {
        setLoading(true);
        const responseClients = await getAllClients();
        const responseUsers = await getUsers();
        if (componentMounted.current) {
            const allClients = responseClients?.data;
            const allEmployees = responseUsers?.data;
            if (allClients && allEmployees) {
                dispatch(getAllClientsAction(allClients));
                dispatch(getUsersAction(allEmployees));
                allClients.forEach((client: clientPayloadType) => {
                    setClientsOptions((old: selectType[]) => [
                        ...old,
                        { value: client.id, label: client.companyName },
                    ]);
                });
                allEmployees.forEach((employee: userPayloadType) => {
                    setemployeeOptions((old: selectType[]) => [
                        ...old,
                        { value: employee.id, label: employee.fullname },
                    ]);
                });
                teamTypes.forEach((teamType: string) => {
                    setTeamTypeOptions((old: selectType[]) => [
                        ...old,
                        { value: teamType, label: teamType },
                    ]);
                });
                projectStatuses.forEach((projectStatus: string) => {
                    setProjectStatusOptions((old: selectType[]) => [
                        ...old,
                        { value: projectStatus, label: projectStatus },
                    ]);
                });
            }
            setLoading(false);
        }
        return () => {
            componentMounted.current = false;
        };
    };

    useEffect(() => {
        getAllClientsAndUsersFromApi();
    }, []);

    async function handleNewProject() {
        const postProject = await addNewProject(payload);
        if (postProject?.status === 201) {
            const uniqueUsers: string[] = [];
            usersPayload.usersIDs.forEach(function (item: string) {
                if (uniqueUsers.indexOf(item) < 0) {
                    uniqueUsers.push(item);
                }
            });
            const postProjectUser = await addProjectUser(
                { usersIDs: uniqueUsers },
                postProject.data.id
            );
            if (postProjectUser?.status === 200) {
                dispatch(close(modalTypes.addNewProject));
                alert(`New project ${payload.projectName} has been added!`);
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>;
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
                    defaultValue={clientsOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="client"
                    styles={colourStyles}
                    options={clientsOptions}
                    onChange={(e) => {
                        setPayload({
                            ...payload,
                            clientId: e.value,
                        });
                    }}
                />
                <label className={styles.label}>
                    {t('description.projectLead')}:
                </label>
                <Select
                    defaultValue={employeeOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="projectLead"
                    styles={colourStyles}
                    options={employeeOptions}
                    onChange={(e) => {
                        setPayload({
                            ...payload,
                            lead: e.value,
                        });
                    }}
                />
                <label className={styles.label}>
                    {t('description.projectManager')}:
                </label>
                <Select
                    defaultValue={employeeOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="projectManager"
                    styles={colourStyles}
                    options={employeeOptions}
                    onChange={(e) => {
                        setPayload({
                            ...payload,
                            manager: e.value,
                        });
                    }}
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
                    onChange={(e) => {
                        setPayload({
                            ...payload,
                            teamType: e.value,
                        });
                    }}
                />
                <label className={styles.label}>
                    {t('description.developmentTeam')}:
                </label>
                <Select
                    defaultValue={employeeOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="developmentTeam"
                    styles={colourStyles}
                    options={employeeOptions}
                    isMulti
                    onChange={(e) => {
                        e.forEach((user) => {
                            setUsersPayload({
                                ...usersPayload,
                                usersIDs: [
                                    ...usersPayload.usersIDs,
                                    user.value,
                                ],
                            });
                        });
                    }}
                />
                <label className={styles.label}>
                    {t('description.selectProjectStatus')}:
                </label>
                <Select
                    defaultValue={projectStatusOptions[0]}
                    isClearable={true}
                    isRtl={false}
                    isSearchable={true}
                    name="projectStatus"
                    styles={colourStyles}
                    options={projectStatusOptions}
                    onChange={(e) => {
                        setPayload({
                            ...payload,
                            status: e.value,
                        });
                    }}
                />
                <label className={styles.label}>
                    {t('description.startDate')}:
                </label>
                <input className={styles.date} type="datetime-local" />
                <footer className={styles.modal_footer}>
                    <AddButton onClick={handleNewProject}>
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
