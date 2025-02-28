import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchAllContactsData } from "./utilsFetchContactData";
export const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [contact, setContact] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const loadAllContacts = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchAllContactsData(currentPage, 'ua', setContact, setTotalPages);
        } catch (error) {
            console.error('Error loading Contacts:', error);
            setContact([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, [setCurrentPage]);

    return (
        <ContactContext.Provider value={{
            currentPage,
            setCurrentPage,
            isLoading,
            setIsLoading,
            contact,
            setContact,
            totalPages,
            setTotalPages,
            loadAllContacts,
            handlePageChange
        }}>
            {children}
        </ContactContext.Provider>
    );
};