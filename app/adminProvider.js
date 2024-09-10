'use client'

import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
    currentSiteSection: '',
    setCurrentSiteSection: () => { },
    accountId: '',
    setAccountId: () => { },
});

export const AdminProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('');
    const [currentSiteSection, setCurrentSiteSection] = useState('Main');
    const [activeUser, setActiveUser] = useState(null);
    const [accountId, setAccountId] = useState([]);

    const handleSiteSection = (siteSection) => {
        setCurrentSiteSection(siteSection);
    }
    const handleSetActiveUser = (user) => {
        setActiveUser(user);
    };
    const handleSetAccountId = (id) => {
        setAccountId(id);
    };

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
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
        currentSiteSection,
        setCurrentSiteSection: handleSiteSection,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};