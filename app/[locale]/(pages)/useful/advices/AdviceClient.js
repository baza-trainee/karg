'use client';

import { useState } from 'react';
import styles from '../../animals/styles/animals.module.scss';
import SearchBar from '@/components/SearchBar/SearchBar';
import InitialFetch from './initialFetch';
import { useTranslation } from 'react-i18next';

const AdviceClient = ({ locale }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [resultsCount, setResultsCount] = useState(0);
    const [category, setCategory] = useState('');
    const { t } = useTranslation('common');

    const updateSearchTerm = (newSearchTerm, newCategory) => {
        setSearchTerm(newSearchTerm);
        setCategory(newCategory);
    };

    const handleResults = (count) => {
        setResultsCount(count);
    };

    const searchResultsCount = () => {
        if (searchTerm) {
            if (resultsCount > 0) {
                <p className={styles.searchResultsCount}>{t('found')}{resultsCount}</p>;
            }
        }
    };

    return (
        <main className={styles.pageContainer}>
            <SearchBar
                cultureCode={locale}
                onSearch={updateSearchTerm}
            />
            {searchResultsCount()}
            {searchTerm && resultsCount === 0 && searchTerm && (
                <p className={styles.searchResultsCount}>{t('notFound')}</p>
            )}
            <InitialFetch locale={locale} searchTerm={searchTerm} category={category} onResults={handleResults} />
        </main>
    );
};

export default AdviceClient;