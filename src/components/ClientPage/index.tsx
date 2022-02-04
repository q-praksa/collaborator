import React, { useState, useEffect } from 'react';
import { RootState } from '@reduxStore/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { continents } from '@components/ClientPage/continents';
// import { companyNames } from '@components/ClientPage/companyNamesData';
import { useSearchParams } from 'react-router-dom';
import { CompanyType } from '@components/ClientPage/types';
import styles from '@components/ClientPage/ClientPage.module.css';
import { useTranslation } from 'react-i18next';
import AddClientModal from '@components/modals/AddNewClient';
import { useDispatch, useSelector } from 'react-redux';
import { modalTypes } from '@reduxStore/actions/modalTypes';
import { open } from '@reduxStore/actions/modal';
import OpenModalButton from '@elements/Buttons/OpenModalButton';
import FilterButton from '@elements/Buttons/FilterButton';
import ActiveFilterButton from '@elements/Buttons/ActiveFilterButton';
import { useApi } from '@hooks/useApi';
import { getAllClients } from '@api/clientService';
import { clientPayloadType } from '@api/types';

// const initialStateCompanies = companyNames;

function ClientPage() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams({});
    // const [companies, setCompanies] = useState<CompanyType['company']>();
    const modal = useSelector(
        (state: RootState) => state.modal.type[modalTypes.addNewClient]
    );
    const dispatch = useDispatch();
    const getClientsApi = useApi(getAllClients);

    useEffect(() => {
        getClientsApi.request();
    }, []);

    const clientsFromDatabase:CompanyType[] | null = getClientsApi.data;
    console.log(clientsFromDatabase);

    function setQueryStrings(queryPrm: string) {
        searchParams.set('search', queryPrm);
        setSearchParams(searchParams);
    }

    function deleteQueryStrings() {
        searchParams.delete('search');

        setSearchParams(searchParams);
    }

    function getQueryStringAndFilterCompanies() {
        if(!clientsFromDatabase){
            const emptyArray:CompanyType[]=[]
            return emptyArray;
        }
        const currentQueryString = searchParams.get('search')?.toLowerCase();
        const filteredCompanies = clientsFromDatabase.filter((company: any) => {
            if (
                company.from.toLowerCase().includes(currentQueryString) ||
                company.companyName.toLowerCase().includes(currentQueryString)
            ) {
                return true;
            }
        });
        return filteredCompanies;
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleInputSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input) {
            setQueryStrings(input);
            getQueryStringAndFilterCompanies();
        } else {
            deleteQueryStrings();
            // setCompanies(initialStateCompanies);
        }

        setInput('');
    };

    const handleButtonClick = (name: string) => {
        searchParams.set(name.toLowerCase(), name.toLowerCase());
        setSearchParams(searchParams);
    };

    const handleRemoveBtn = (name: string) => {
        searchParams.delete(name.toLowerCase());
        setSearchParams(searchParams);
    };

    function countButton() {
        const filters: string[] = [];
        const keys = searchParams.keys();
        for (const key of keys) {
            key !== 'search' ? filters.push(key) : null;
        }
        return filters.length;
    }

    return (
        <section className={styles.clientPage}>
            <h1>{t('description.clients')}</h1>

            <div className={styles.inputFieldWrapper}>
                <form className={styles.form} onSubmit={handleInputSearch}>
                    <input
                        className={styles.inputField}
                        type="search"
                        value={input}
                        onChange={handleInput}
                    />
                    <button className={styles.searchButton} type="submit">
                        <FontAwesomeIcon
                            className={styles.icon}
                            icon={faSearch}
                        />
                    </button>
                </form>
                <OpenModalButton
                    onClick={() => dispatch(open(modalTypes.addNewClient))}
                />
            </div>

            <div className={styles.chooseCity}>
                {continents.map((continent) => {
                    const { id, name } = continent;
                    return (
                        <FilterButton
                            key={id}
                            onClick={() => handleButtonClick(name)}
                        >
                            {t(`description.${name.toLowerCase()}`)}
                        </FilterButton>
                    );
                })}
            </div>

            <div className={styles.selectedCities}>
                {continents
                    .filter((continent) => {
                        const { name } = continent;
                        if (searchParams.get(name.toLowerCase())) return true;
                    })
                    .map((btn) => {
                        const { id, name } = btn;
                        return (
                            <ActiveFilterButton
                                key={id}
                                onClick={() => handleRemoveBtn(name)}
                            >
                                {t(`description.${name.toLowerCase()}`)}
                            </ActiveFilterButton>
                        );
                    })}
            </div>

            <div className={styles.listedCompanies}>
                {clientsFromDatabase?
                    .filter((company: any) => {
                        const { from } = company;
                        if (!countButton()) return true;
                        if (searchParams.get(from.toLowerCase())) return true;
                    })
                    .map((company: { id: number; companyName: string; ceo: string; }) => {
                        const { id, companyName, ceo } = company;
                        return (
                            <div
                                key={id}
                                className={styles.listedCompaniesItem}
                            >
                                <div className={styles.circle}></div>
                                <h3>{companyName}</h3>
                                <p>{ceo}</p>
                            </div>
                        );
                    })
            </div>
            <div>{modal ? <AddClientModal /> : null}</div>
        </section>
    );
}

export default ClientPage;
