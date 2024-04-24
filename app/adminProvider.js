import React, { createContext, useState } from 'react';

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
    adminUser: null,
    setAdminUser: () => { },
});

export const AdminProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('');
    const [adminUser, setAdminUser] = useState(null);

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
    };

    const loginAdmin = (userData) => {
        setAdminUser(userData);
    };

    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
        adminUser,
        loginAdmin
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};