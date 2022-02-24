import React, { useState, useEffect, useRef } from 'react';
import { RootState } from '@reduxStore/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { continents } from '@components/Clients/continents';
import { NavLink, useSearchParams } from 'react-router-dom';
import { IClientItem } from '@components/ClientItem/types';
import styles from '@components/Clients/Clients.module.css';
import { useTranslation } from 'react-i18next';
import AddClientModal from '@components/modals/AddNewClient';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { open } from '@reduxStore/actions/modal';
import OpenModalButton from '@elements/Buttons/OpenModalButton';
import FilterButton from '@elements/Buttons/FilterButton';
import ActiveFilterButton from '@elements/Buttons/ActiveFilterButton';
import { useApi } from '@hooks/useApi';
import { deleteClient, getAllClients } from '@api/clientService';
import { findFilters } from '@utils/employees';
import ClientItem from '@components/ClientItem';
import DeleteButton from '@elements/Buttons/DeleteButton';
import {
    deleteClientAction,
    getAllClientsAction,
} from '@reduxStore/actions/client';

function Clients() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams({});
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const componentMounted = useRef(true);

    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewClient]
    );

    const clientsFromDatabase = useSelector(
        (state: RootState) => state.clients.clients
    );

    const deleteClientApi = useApi(deleteClient);

    const getAllClientsFromApi = async () => {
        setLoading(true);
        const response = await getAllClients();
        if (componentMounted.current) {
            const allClients = response?.data;
            if (allClients) {
                dispatch(getAllClientsAction(allClients));
            }
            setLoading(false);
        }
        return () => {
            componentMounted.current = false;
        };
    };

    useEffect(() => {
        getAllClientsFromApi();
    }, []);

    function handleDelete(id: string) {
        const confirm = window.confirm(t('description.confirmDeleteQuestion'));
        if (confirm) {
            deleteClientApi.request(id);
            dispatch(deleteClientAction(id));
        }
    }

    function clientExists(
        searchParam: IClientItem,
        filteredClients: IClientItem[] | null
    ): boolean | undefined {
        return filteredClients?.some((searchBtn) => searchBtn === searchParam);
    }

    function checkQueryStringsExists(queryPrm: string): boolean {
        return selectedFilters.includes(queryPrm);
    }

    function addFilter(key: string, value: string) {
        searchParams.append(key, value);
        setSearchParams(searchParams);
        if (!checkQueryStringsExists(value)) {
            setSelectedFilters((selectedFilters) => [
                ...selectedFilters,
                value,
            ]);
        }
    }

    function applyFilters(filters: string[], key: string) {
        searchParams.delete(key);
        setSearchParams(searchParams);
        filters.forEach((filter) => {
            searchParams.append(key, filter);
        });
        setSearchParams(searchParams);
    }

    function deleteFilter(key: string, value: string) {
        if (!checkQueryStringsExists(value)) {
            return;
        }
        const newSelectedFilters = selectedFilters.filter(function (item) {
            return item !== value;
        });
        setSelectedFilters(newSelectedFilters);
        const search = searchParams.getAll(key);
        const foundFilters = findFilters(search, value);
        applyFilters(foundFilters, key);
    }

    function filterClients(clientsToFilter: IClientItem[], key: string) {
        if (!clientsToFilter) {
            const emptyArray: IClientItem[] = [];
            return emptyArray;
        }
        const search = searchParams.getAll(key);
        let filteredClients: IClientItem[] = [];
        if (search.length === 0) {
            filteredClients = clientsToFilter;
        } else {
            clientsToFilter.forEach((client) => {
                search.forEach((filter) => {
                    if (client.region.toLowerCase() === filter.toLowerCase()) {
                        if (!clientExists(client, filteredClients)) {
                            filteredClients.push(client);
                        }
                    }
                });
            });
        }
        return filteredClients;
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const search = event.target.value;
        if (search) {
            searchParams.set('search', search);
            setSearchParams(searchParams);
        } else {
            searchParams.delete('search');
            setSearchParams(searchParams);
        }
    }

    return (
        <section className={styles.clientPage}>
            <h1>{t('description.clients')}</h1>
            <div className={styles.inputFieldWrapper}>
                <div className={styles.form}>
                    <input
                        className={styles.inputField}
                        type="search"
                        onChange={handleOnChange}
                        placeholder={t('description.search')}
                    />
                    <FontAwesomeIcon className={styles.icon} icon={faSearch} />
                </div>
                <OpenModalButton
                    onClick={() => dispatch(open(modalTypes.addNewClient))}
                />
            </div>
            <div className={styles.chooseCity}>
                {continents.map((continent) => {
                    return (
                        <FilterButton
                            key={continent}
                            onClick={() =>
                                addFilter(
                                    'filter[]',
                                    t(`description.${continent}`)
                                )
                            }
                        >
                            {t(`description.${continent}`)}
                        </FilterButton>
                    );
                })}
            </div>
            <div className={styles.selectedCities}>
                {selectedFilters.map((filterValue) => {
                    return (
                        <ActiveFilterButton
                            key={filterValue}
                            onClick={() =>
                                deleteFilter('filter[]', filterValue)
                            }
                            value={filterValue}
                        >
                            {filterValue}
                        </ActiveFilterButton>
                    );
                })}
            </div>
            <div className={styles.listedCompanies}>
                {filterClients(clientsFromDatabase, 'filter[]')
                    .filter((client) => {
                        const search = searchParams.get('search');
                        if (!search) {
                            return true;
                        }
                        return (
                            client.region
                                ?.toLowerCase()
                                .includes(search.toLowerCase()) ||
                            client.companyName
                                ?.toLowerCase()
                                .includes(search.toLowerCase()) ||
                            client.CEO?.toLowerCase().includes(
                                search.toLowerCase()
                            )
                        );
                    })
                    .map((client: IClientItem) => (
                        <div key={client.id} className={styles.client_item}>
                            <NavLink
                                className={styles.itemLink}
                                to={`/clients/${client.id}`}
                            >
                                <ClientItem clientItem={client} />
                            </NavLink>
                            <div className={styles.delete_btn}>
                                <DeleteButton
                                    onClick={() => handleDelete(client.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </DeleteButton>
                            </div>
                        </div>
                    ))}
            </div>
            ,<div>{modal ? <AddClientModal /> : null}</div>
        </section>
    );
}

export default Clients;
