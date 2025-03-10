'use client';

import { useState, useEffect } from 'react';
import styles from './styles/animals.module.scss';
import SearchBar from '@/components/SearchBar/SearchBar';
import InitialFetch from './initialFetch';

const AnimalsClient = ({ locale }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [resultsCount, setResultsCount] = useState(0);
    const [clearSearch, setClearSearch] = useState(false);
    const [timerValue, setTimerValue] = useState(null);
    const [category, setCategory] = useState(''); // Добавляем состояние для категории

    const updateSearchTerm = (newSearchTerm, newCategory) => {
        setSearchTerm(newSearchTerm);
        setCategory(newCategory); // Обновляем состояние категории
    };

    const handleResults = (count) => {
        setResultsCount(count);
    };

    useEffect(() => {
        if (searchTerm && resultsCount === 0) {
            let timeLeft = 5;
            setTimerValue(timeLeft);

            const timer = setInterval(() => {
                timeLeft--;
                setTimerValue(timeLeft);

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    setSearchTerm('');
                    setClearSearch(true);
                    setTimerValue(null);
                }
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        } else {
            setTimerValue(null);
        }
    }, [searchTerm, resultsCount]);

    useEffect(() => {
        if (clearSearch) {
            setClearSearch(false);
        }
    }, [clearSearch]);

    return (
        <main className={styles.pageContainer}>
            <SearchBar
                cultureCode={locale}
                onSearch={updateSearchTerm}
                clearSearch={clearSearch}
            />
            {searchTerm && resultsCount > 0 && (
                <p className={styles.searchResultsCount}>Знайдено: {resultsCount}</p>
            )}
            {searchTerm && resultsCount === 0 && (
                <>
                    <p className={styles.searchResultsCount}>
                        Нічого не знайдено {timerValue !== null ? `(${timerValue})` : `(${5})`}
                    </p>
                </>
            )}
            <InitialFetch locale={locale} searchTerm={searchTerm} category={category} onResults={handleResults} />
        </main>
    );
};

export default AnimalsClient;