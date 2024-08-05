'use client'

import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
});

export const AdminProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('Тварини');
    const [activeUser, setActiveUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const handleSetActiveUser = (user) => {
        setActiveUser(user);
    };

    useEffect(() => {
        const section = localStorage.getItem('activeSection');
        if (section) {
            setActiveSection(section);
        }
    }, []);

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        localStorage.setItem('activeSection', activeSection);
    }, [activeSection]);

    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
        activeUser,
        setActiveUser: handleSetActiveUser
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};