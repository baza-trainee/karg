'use client';
import { useState, useEffect, useRef } from 'react';
import { SearchIcon } from '@/public/assets/icons';
import styles from "./styles/searchBar.module.scss";
import useDebounce from './useDebounce';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ cultureCode, onSearch, clearSearch }) => {
    const { t } = useTranslation('common');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const inputRef = useRef(null);

    useEffect(() => {
        onSearch(debouncedSearchTerm, category);
    }, [debouncedSearchTerm, category, cultureCode, onSearch]);

    useEffect(() => {
        if (clearSearch) {
            setSearchTerm('');
            setCategory('');
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }, [clearSearch]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input
                    type='text'
                    placeholder={t('search')}
                    className={styles.search}
                    value={searchTerm}
                    onChange={handleChange}
                    ref={inputRef}
                />
                <SearchIcon className={styles.icon} />
            </div>
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

        </div>
    );
};

export default SearchBar;