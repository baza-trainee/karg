'use client';
import { useState, useEffect } from 'react';
import { SearchIcon } from '@/public/assets/icons';
import styles from "./styles/searchBar.module.scss";
import useDebounce from './useDebounce';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ cultureCode, onSearch, showCategoryFilter = false, searchResultsCount, searchErrorResult, withCategoryFilter }) => {
    const { t } = useTranslation('common');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (debouncedSearchTerm.length >= 3) {
            onSearch(debouncedSearchTerm, category);
        } else {
            onSearch('', category);
        }
    }, [debouncedSearchTerm, category, cultureCode, onSearch]);


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div id="search" className={withCategoryFilter ? styles.container : styles.singleContainer}>
            <div className={styles.searchContainerWrapper}>
                <div className={styles.searchContainer}>
                    <input
                        type='text'
                        placeholder={t('search')}
                        className={styles.search}
                        value={searchTerm}
                        onChange={handleChange}
                        autoComplete='off'
                    />
                    <SearchIcon className={styles.icon} />
                </div>
                {searchResultsCount && searchResultsCount()}
                {searchErrorResult && searchErrorResult()}
            </div>

            {showCategoryFilter && (
                <select
                    className={styles.select}
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="">{t('allCategories')}</option>
                    <option value="Cat">{t('cats')}</option>
                    <option value="Dog">{t('dogs')}</option>
                    <option value="Other">{t('otherAnimals')}</option>
                </select>
            )}
        </div>
    );
};

export default SearchBar;