'use client'

import { createContext, useState } from 'react';

export const UserContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
});

export const UserProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('');

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
    };

    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};