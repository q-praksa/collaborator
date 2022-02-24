import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
// import { getClientById, updateClient } from '@api/clientService';
import { getProjectById, updateProject } from '@api/projectsService';
import { useApi } from '@hooks/useApi';
import { useEffect, useRef, useState } from 'react';
import styles from './SingleProjectPage.module.css';
import SaveButton from '@elements/Buttons/SaveButton';

export default function SingleClientPage() {
    const params = useParams();
    const patchProjectApi = useApi(updateProject);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const componentMounted = useRef(true);

    const [project, setProject] = useState({
        projectName: '',
        status: '',
        teamType: '',
        startDate: new Date(),
        clientId: '',
        lead: '',
        manager: '',
    });

    const getCurrentProject = async () => {
        setLoading(true);
        const response = await getProjectById(params.id);
        if (componentMounted.current) {
            const currentProject = response?.data;
            if (currentProject) {
                setProject({
                    ...project,
                    ...response?.data,
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

    function saveClientsChanges() {
        patchProjectApi.request(project);
        if (patchProjectApi.error) {
            alert("Could not update project's details.");
        }
        if (patchProjectApi.data) {
            console.log(patchProjectApi.data);
            alert("Project's details updated.");
        }
    }
    if (loading) {
        return <div>Loading....</div>;
    }
    return (
        <div className={styles.main}>
            <h2 className={styles.clientName}>{project.projectName}</h2>
            <div className={styles.container}>
                <div className={styles.top_wrapper}>
                    <div className={styles.data_wrapper}>
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
                                        projectName: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={styles.input_wrapper}>
                            <label className={styles.label}>
                                {t('description.client')}:
                            </label>
                        </div>

                        <div className={styles.input_wrapper}>
                            <label className={styles.label}>
                                {t('description.status')}:
                            </label>
                            <input
                                className={styles.input}
                                value={project.status}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        status: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={styles.input_wrapper}>
                            <label className={styles.label}>
                                {t('description.ceoFullname')}:
                            </label>
                            <input
                                className={styles.input}
                                value={project.teamType}
                                onChange={(e) =>
                                    setProject({
                                        ...project,
                                        teamType: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {/* <div className={styles.input_wrapper}>
                            <label className={styles.label}>
                                {t('description.region')}:
                            </label>
                            <select
                                className={styles.select_region}
                                placeholder="Region"
                                name="region"
                                value={client.region}
                                onChange={(e) =>
                                    setClient({
                                        ...client,
                                        region: (e.target as HTMLSelectElement)
                                            .value,
                                    })
                                }
                            >
                                {continents.map((continent) => {
                                    return (
                                        <option
                                            className={styles.select_option}
                                            key={continent}
                                        >
                                            {continent}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>*/}
                    </div>
                </div>
                <div className={styles.bottom_wrapper}>
                    <SaveButton onClick={saveClientsChanges}>
                        {t('description.saveChanges')}
                    </SaveButton>
                </div>
            </div>
        </div>
    );
}
