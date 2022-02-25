import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getClientById, updateClient } from '@api/clientService';
import { useApi } from '@hooks/useApi';
import { useEffect, useRef, useState } from 'react';
import styles from './SingleClientPage.module.css';
import SaveButton from '@elements/Buttons/SaveButton';
import { regions } from '@constants/regions';

export default function SingleClientPage() {
    const params = useParams();
    const patchClientApi = useApi(updateClient);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const componentMounted = useRef(true);

    const [client, setClient] = useState({
        id: '',
        companyName: '',
        status: '',
        CEO: '',
        img: '',
        region: '',
    });

    const getCurrentClient = async () => {
        setLoading(true);
        const response = await getClientById(params.id);
        if (componentMounted.current) {
            const currentClient = response?.data;
            if (currentClient) {
                setClient({
                    ...client,
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
        getCurrentClient();
    }, []);

    function saveClientsChanges() {
        patchClientApi.request(client);
        if (patchClientApi.error) {
            alert("Could not update client's details.");
        }
        if (patchClientApi.data) {
            console.log(patchClientApi.data);
            alert("Client's details updated.");
        }
    }
    if (loading) {
        return <div>Loading....</div>;
    }
    return (
        <div className={styles.main}>
            <h2 className={styles.clientName}>{client.companyName}</h2>
            <div className={styles.container}>
                <div className={styles.top_wrapper}>
                    <div className={styles.data_wrapper}>
                        <div className={styles.input_wrapper}>
                            <label className={styles.label}>
                                {t('description.companyName')}:
                            </label>
                            <input
                                className={styles.input}
                                value={client.companyName}
                                onChange={(e) =>
                                    setClient({
                                        ...client,
                                        companyName: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className={styles.input_wrapper}>
                            <label className={styles.label}>
                                {t('description.status')}:
                            </label>
                            <input
                                className={styles.input}
                                value={client.status}
                                onChange={(e) =>
                                    setClient({
                                        ...client,
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
                                value={client.CEO}
                                onChange={(e) =>
                                    setClient({
                                        ...client,
                                        CEO: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={styles.input_wrapper}>
                            <label className={styles.label}>
                                {t('description.region')}:
                            </label>
                            <select
                                className={styles.select_region}
                                placeholder="Region"
                                name="region"
                                onChange={(e) =>
                                    setClient({
                                        ...client,
                                        region: (e.target as HTMLSelectElement)
                                            .value,
                                    })
                                }
                            >
                                {regions.map((region) => {
                                    const selected =
                                        region === client.region ? true : false;
                                    return (
                                        <option
                                            selected={selected}
                                            className={styles.select_option}
                                            key={region}
                                        >
                                            {t(`description.${region}`)}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={styles.imgContainer}>
                        <img
                            className={styles.image}
                            src={client.img}
                            alt={client.companyName}
                        />
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
