'use client'

import { createContext, useState } from 'react';

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

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
    };

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