import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
// import { getClientById, updateClient } from '@api/clientService';
import { getProjectById, updateProject } from '@api/projectsService';
import { useApi } from '@hooks/useApi';
import { useEffect, useRef, useState } from 'react';
import styles from './SingleProjectPage.module.css';
import SaveButton from '@elements/Buttons/SaveButton';
import { projectStatuses, teamTypes } from '@constants/projects';
import { selectType } from '@components/modals/AddProject/types';
import { getAllClients, getClientById } from '@api/clientService';
import { getUsers } from '@api/userService';
import { getAllClientsAction } from '@reduxStore/actions/client';
import { getUsersAction } from '@reduxStore/actions/users';
import { clientPayloadType, userPayloadType } from '@api/types';
import Select from 'react-select';
import { colourStyles } from '@components/modals/AddProject/styles';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

export default function SingleClientPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();
    const componentMounted = useRef(true);
    const patchProjectApi = useApi(updateProject);
    const [loading, setLoading] = useState(false);
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
    const [project, setProject] = useState({
        projectName: '',
        status: projectStatuses[0],
        teamType: teamTypes[0],
        startDate: new Date(),
        clientId: '',
        lead: '',
        manager: '',
    });

    const getCurrentProject = async () => {
        setLoading(true);
        const response = await getProjectById(params.id);
        const responseClients = await getAllClients();
        const responseUsers = await getUsers();
        if (componentMounted.current) {
            const currentProject = response?.data;
            const allClients = responseClients?.data;
            const allEmployees = responseUsers?.data;
            if (currentProject && allClients && allEmployees) {
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
                const clientName = getClientName(currentProject.clientId);
                setProject({
                    ...project,
                    ...response?.data,
                    clientId: clientName,
                });
            }
            setLoading(false);
        }
        return () => {
            componentMounted.current = false;
        };
    };

    useEffect(() => {
        getCurrentProject();
    }, []);

    function saveProjectsChanges() {
        patchProjectApi.request(project);
        if (patchProjectApi.error) {
            alert("Could not update project's details.");
        }
        if (patchProjectApi.data) {
            console.log(patchProjectApi.data);
            alert("Project's details updated.");
        }
    }
    const getClientName = async (id: string) => {
        const clientResponse = await getClientById(id);
        return clientResponse?.data.companyName;
    };

    if (loading) {
        return <div>Loading....</div>;
    }
    return (
        <div className={styles.main}>
            <h2 className={styles.projectName}>{project.projectName}</h2>
            <div className={styles.container}>
                <div className={styles.top_wrapper}>
                    <div className={styles.input_wrapper}>
                        <label className={styles.label}>
                            {t('description.projectName')}:
                        </label>
                        <input
                            className={styles.input}
                            value={project.projectName}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    projectName: (e.target as HTMLInputElement)
                                        .value,
                                })
                            }
                        />
                    </div>
                    <div className={styles.input_wrapper}>
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
                                setProject({
                                    ...project,
                                    clientId: e.value,
                                });
                            }}
                        />
                    </div>

                    <div className={styles.input_wrapper}>
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
                                setProject({
                                    ...project,
                                    lead: e.value,
                                });
                            }}
                        />
                    </div>

                    <div className={styles.input_wrapper}>
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
                                setProject({
                                    ...project,
                                    manager: e.value,
                                });
                            }}
                        />
                    </div>

                    <div className={styles.input_wrapper}>
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
                                setProject({
                                    ...project,
                                    teamType: e.value,
                                });
                            }}
                        />
                    </div>

                    <div className={styles.input_wrapper}>
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
                    </div>

                    <div className={styles.input_wrapper}>
                        <label className={styles.label}>
                            {t('description.projectStatus')}:
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
                                setProject({
                                    ...project,
                                    status: e.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={styles.bottom_wrapper}>
                    <SaveButton onClick={saveProjectsChanges}>
                        {t('description.saveChanges')}
                    </SaveButton>
                </div>
            </div>
        </div>
    );
}
function clientId(clientId: any) {
    throw new Error('Function not implemented.');
}
