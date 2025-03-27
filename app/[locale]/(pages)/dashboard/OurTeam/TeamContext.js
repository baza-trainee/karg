import React, { createContext, useState, useCallback, useContext } from 'react';
import { fetchTeamData } from "./utilsFetchTeamData";
import ModalContext from '@/app/ModalContext';

export const TeamContext = createContext(null);

export const TeamProvider = ({ children }) => {
    const [rescuers, setRescuers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { showModal } = useContext(ModalContext);

    const loadRescuers = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchTeamData(currentPage, setRescuers, setTotalPages, showModal);
        } catch (error) {
            console.error('Error loading rescuers:', error);
            setRescuers([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    const handlePageChange = useCallback((newPage) => {
            setCurrentPage(newPage);
        }, [setCurrentPage]);

    return (
        <TeamContext.Provider value={{
            isLoading,
            setIsLoading,
            rescuers,
            setRescuers,
            loadRescuers,
            currentPage,
            setCurrentPage,
            totalPages,
            setTotalPages,
            handlePageChange
        }}>
            {children}
        </TeamContext.Provider>
    );
};