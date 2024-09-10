'use client'

import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
    accountId: '',
    setAccountId: () => { },
});

export const AdminProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('Тварини');
    const [activeUser, setActiveUser] = useState(null);
    const [accountId, setAccountId] = useState([]);

    const handleSetActiveUser = (user) => {
        setActiveUser(user);
    };
    const handleSetAccountId = (id) => {
        setAccountId(id);
    };

    useEffect(() => {
        const section = localStorage.getItem('activeSection');
        if (section) {
            setActiveSection(section);
        }
    }, []);

    useEffect(() => {
        const id = localStorage.getItem('accountId');
        if (id) {
            setAccountId(id);
        }
    }, []);

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        localStorage.setItem('activeSection', activeSection);
    }, [activeSection]);

    useEffect(() => {
        localStorage.setItem('accountId', accountId);
    }, [accountId]);

    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
        activeUser,
        setActiveUser: handleSetActiveUser,
        accountId,
        setAccountId: handleSetAccountId,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};