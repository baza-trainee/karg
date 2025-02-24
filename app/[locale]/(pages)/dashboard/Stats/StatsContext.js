import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchStatsData } from "./utilsFetchStatsData";
export const StatsContext = createContext(null);

export const StatsProvider = ({ children }) => {
    const initialCategory = 'Найновіші';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(1);
    const [stats, setStats] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const loadStats = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchStatsData(currentPage, 'ua', setStats, setTotalPages);
        } catch (error) {
            console.error('Error loading:', error);
            setStats([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, [setCurrentPage]);

    return (
        <StatsContext.Provider value={{
            selectedCategory,
            setSelectedCategory,
            initialCategory,
            currentPage,
            setCurrentPage,
            isLoading,
            setIsLoading,
            stats,
            setStats,
            totalPages,
            setTotalPages,
            loadStats,
            handlePageChange
        }}>
            {children}
        </StatsContext.Provider>
    );
};