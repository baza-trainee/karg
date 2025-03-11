'use client'

import { createContext, useEffect, useState, useRef } from 'react';

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
    accountId: '',
    setAccountId: () => { },
    isDirector: null,
    setIsDirector: () => { },
    isLoading: false,
    setIsLoading: () => { },
    activeHelpSection: 'Загальні Питання',
    setActiveHelpSection: () => { },
});

export const AdminProvider = ({ children }) => {
    const [accountId, setAccountId] = useState('');
    const [activeSection, setActiveSection] = useState('');
    const [isDirector, setIsDirector] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeHelpSection, setActiveHelpSection] = useState('Загальні Питання');

    const hasMounted = useRef(false);

    const handleSetAccountId = (id) => {
        setAccountId(id);
        if (typeof window !== 'undefined') {
            localStorage.setItem('accountId', id);
        }
    };

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeSection', section);
        }
    };

    const handleSetIsDirector = (role) => {
        setIsDirector(role);
        if (typeof window !== 'undefined') {
            localStorage.setItem('isDirector', JSON.stringify(role));
        }
    };

    const handleSetActiveHelpSection = (section) => {
        setActiveHelpSection(section);
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeHelpSection', section);
        }
    };


    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;

            const id = typeof window !== 'undefined' ? localStorage.getItem('accountId') : null;
            const section = typeof window !== 'undefined' ? localStorage.getItem('activeSection') : null;
            const role = typeof window !== 'undefined' ? localStorage.getItem('isDirector') : null;
            const storedHelpSection = typeof window !== 'undefined' ? localStorage.getItem('activeHelpSection') : null;

            if (id) setAccountId(id);
            if (section) setActiveSection(section);
            if (role !== null) {
                try {
                    setIsDirector(JSON.parse(role));
                } catch (error) {
                    console.error('Failed to parse isDirector:', error);
                    setIsDirector(null);
                }
            }
            if (storedHelpSection) setActiveHelpSection(storedHelpSection);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (accountId) localStorage.setItem('accountId', accountId);
            if (activeSection) localStorage.setItem('activeSection', activeSection);
            localStorage.setItem('isDirector', JSON.stringify(isDirector));
        }
    }, [accountId, activeSection, isDirector]);

    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
        accountId,
        setAccountId: handleSetAccountId,
        isDirector,
        setIsDirector: handleSetIsDirector,
        isLoading,
        setIsLoading,
        activeHelpSection,
        setActiveHelpSection: handleSetActiveHelpSection,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};