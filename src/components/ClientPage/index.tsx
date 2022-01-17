import React, { useState, useEffect } from 'react';
import Layout from '@components/Layout';
import { RootState } from '@reduxStore/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { continents } from '@components/ClientPage/continents';
import { companyNames } from '@components/ClientPage/companyNamesData';
import { useSearchParams } from 'react-router-dom';
import { CompanyType } from '@components/ClientPage/types';
import styles from '@components/ClientPage/ClientPage.module.css';
import { useTranslation } from 'react-i18next';

const initialStateCompanies = companyNames;

function ClientPage() {
    const { t } = useTranslation();
    const [input, setInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams({});
    const [companies, setCompanies] = useState<CompanyType['company']>(
        initialStateCompanies
    );

    // helper funcions
    function setQueryStrings(queryPrm: string) {
        searchParams.set('search', queryPrm);
        setSearchParams(searchParams);
    }

    function deleteQueryStrings() {
        searchParams.delete('search');

        setSearchParams(searchParams);
    }

    function getQueryStringAndFilterCompanies() {
        const currentQueryString = searchParams.get('search');
        const filteredCompanies = initialStateCompanies.filter((company) => {
            if (
                company.from.toLowerCase() ===
                    currentQueryString?.toLowerCase() ||
                company.companyName.toLowerCase() ===
                    currentQueryString?.toLowerCase()
            ) {
                return true;
            }
        });
        setCompanies(filteredCompanies);
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
            setCompanies(initialStateCompanies);
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

            <div className={styles.inputField}>
                <form onSubmit={handleInputSearch}>
                    <input type="search" value={input} onChange={handleInput} />
                    <button type="submit">
                        <FontAwesomeIcon
                            className={styles.icon}
                            icon={faSearch}
                        />
                    </button>
                </form>
            </div>

            <div className={styles.chooseCity}>
                {continents.map((continent) => {
                    const { id, name } = continent;
                    return (
                        <button
                            key={id}
                            onClick={() => handleButtonClick(name)}
                        >
                            {t(`description.${name.toLowerCase()}`)}
                        </button>
                    );
                })}
            </div>

            <div className={styles.selectedCities}>
                {continents
                    .filter((continent) => {
                        const { id, name } = continent;
                        if (searchParams.get(name.toLowerCase())) return true;
                    })
                    .map((btn) => {
                        const { id, name } = btn;
                        return (
                            <div key={id} className={styles.selectedCity}>
                                <p>{t(`description.${name.toLowerCase()}`)}</p>
                                <p onClick={() => handleRemoveBtn(name)}>X</p>
                            </div>
                        );
                    })}
            </div>

            <div className={styles.listedCompanies}>
                {companies
                    .filter((company) => {
                        const { id, from } = company;
                        if (!countButton()) return true;
                        if (searchParams.get(from.toLowerCase())) return true;
                    })
                    .map((company) => {
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
                    })}
            </div>
        </section>
    );
}

export default ClientPage;
