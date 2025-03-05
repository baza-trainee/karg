import React, { createContext, useState, useCallback, useEffect } from 'react';
import { fetchAllContactsData } from "./utilsFetchContactData";
export const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
    const [contact, setContact] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadAllContacts = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchAllContactsData(setContact);
        } catch (error) {
            console.error('Error loading Contacts:', error);
            setContact([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <ContactContext.Provider value={{
            isLoading,
            setIsLoading,
            contact,
            setContact,
            loadAllContacts,
        }}>
            {children}
        </ContactContext.Provider>
    );
};