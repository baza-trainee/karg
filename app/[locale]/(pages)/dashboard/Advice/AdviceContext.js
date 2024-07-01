import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchAdvicesData } from "./utilsFetchAdviceData";
export const AdviceContext = createContext(null);

export const AdviceProvider = ({ children }) => {
    const initialCategory = 'Найновіші';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(1);
    const [advices, setAdvices] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const loadAdvices = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchAdvicesData(currentPage, selectedCategory, initialCategory, 'ua', setAdvices, setTotalPages);
        } catch (error) {
            console.error('Error loading advices:', error);
            setAdvices([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, [setCurrentPage]);

    return (
        <AdviceContext.Provider value={{
            selectedCategory,
            setSelectedCategory,
            initialCategory,
            currentPage,
            setCurrentPage,
            isLoading,
            setIsLoading,
            advices,
            setAdvices,
            totalPages,
            setTotalPages,
            loadAdvices,
            handlePageChange
        }}>
            {children}
        </AdviceContext.Provider>
    );
};