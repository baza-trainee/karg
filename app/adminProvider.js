'use client'

import { createContext, useState } from 'react';

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
});

export const AdminProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('Поради'); //'Тварини'

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
    };

    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};