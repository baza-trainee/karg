'use client';

import { useState } from 'react';
import styles from '../../animals/styles/animals.module.scss';
import SearchBar from '@/components/SearchBar/SearchBar';
import PaginatedCardList from '@/components/PaginatedCardList/PaginatedCardList';
import { useTranslation } from 'react-i18next';
import SkeletonCards from '@/components/SkeletonCards/SkeletonCards';

const AdviceClient = ({ locale }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [resultsCount, setResultsCount] = useState(0);
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
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
                return <p className={styles.searchResultsCount}>{t('found')}{resultsCount}</p>;
            }
        }
        return null;
    };

    const searchErrorResult = () => {
        if (searchTerm && resultsCount === 0) {
            return <p className={styles.searchErrorResult}>{t('notFound')}</p>;
        }
        return null;
    };

    return (
        <main className={styles.pageContainer}>
            <SearchBar
                cultureCode={locale}
                onSearch={updateSearchTerm}
                showCategoryFilter={false}
                searchResultsCount={searchResultsCount}
                searchErrorResult={searchErrorResult}
            />
            {isLoading && <SkeletonCards />}
            <PaginatedCardList
                locale={locale}
                endpoint={'api/advice'}
                multiPageCardButtonVariant={'link'}
                searchTerm={searchTerm}
                category={category}
                onResults={handleResults}
                shortVersion={true}
                setIsLoading={setIsLoading} />
        </main>
    );
};

export default AdviceClient;