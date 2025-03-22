import React, { createContext, useState, useCallback, useContext } from 'react';
import { fetchAllContactsData } from "./utilsFetchContactData";
import ModalContext from '@/app/ModalContext';

export const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
    const [contact, setContact] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { showModal } = useContext(ModalContext);

    const loadAllContacts = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchAllContactsData(setContact, showModal);
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