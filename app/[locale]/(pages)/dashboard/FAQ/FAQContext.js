import React, { createContext, useState, useCallback, useContext } from 'react';
import { fetchAllFAQData } from "./utilsFetchFAQData";
import ModalContext from '@/app/ModalContext';

export const FAQContext = createContext(null);

export const FAQProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [faq, setFAQ] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { showModal } = useContext(ModalContext);

    const loadAllFaq = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchAllFAQData(currentPage, 'ua', setFAQ, setTotalPages, showModal);
        } catch (error) {
            console.error('Error loading FAQ:', error);
            setFAQ([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, [setCurrentPage]);

    return (
        <FAQContext.Provider value={{
            currentPage,
            setCurrentPage,
            isLoading,
            setIsLoading,
            faq,
            setFAQ,
            totalPages,
            setTotalPages,
            loadAllFaq,
            handlePageChange
        }}>
            {children}
        </FAQContext.Provider>
    );
};