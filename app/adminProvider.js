'use client'

import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
    accountId: '',
    setAccountId: () => { },
    isDirector: '',
    setIsDirector: () => { }
});

export const AdminProvider = ({ children }) => {
    const [accountId, setAccountId] = useState([]);
    const [activeSection, setActiveSection] = useState('');
    const [isDirector, setIsDirector] = useState('');

    const handleSetAccountId = (id) => {
        setAccountId(id);
    };

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
    };
    const handleSetIsDirector = (role) => {
        setIsDirector(role);
    }

    useEffect(() => {
        const section = localStorage.getItem('activeSection');
        if (section) {
            setActiveSection(section);
        }
    }, []);

    useEffect(() => {
        const role = localStorage.getItem('isDirector');
        if (role) {
            setIsDirector(role);
        }
    }, []);

    useEffect(() => {
        const id = localStorage.getItem('accountId');
        if (id) {
            setAccountId(id);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('activeSection', activeSection);
    }, [activeSection]);

    useEffect(() => {
        localStorage.setItem('accountId', accountId);
    }, [accountId]);

    useEffect(() => {
        localStorage.setItem('isDirector', isDirector);
    }, [isDirector]);


    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
        accountId,
        setAccountId: handleSetAccountId,
        isDirector,
        setIsDirector: handleSetIsDirector,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};