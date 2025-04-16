'use client'

import { createContext, useEffect, useState, useRef, useMemo } from 'react';
import { getRescuerById } from '../app/[locale]/(pages)/dashboard/MyAccount/api';
import { logoutUser } from '../app/[locale]/(pages)/auth/login/api';

let roleFetched = false;

export const resetRoleFetched = () => {
    roleFetched = false;
};

export const AdminContext = createContext({
    activeSection: '',
    setActiveSection: () => { },
    accountId: '',
    setAccountId: () => { },
    isDirector: null,
    setIsDirector: () => { },
    isLoading: false,
    setIsLoading: () => { },
    activeHelpSection: '',
    setActiveHelpSection: () => { },
    logoutDependencies: {},
});

export const AdminProvider = ({ children }) => {
    const [accountId, setAccountId] = useState('');
    const [activeSection, setActiveSection] = useState('');
    const [isDirector, setIsDirector] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeHelpSection, setActiveHelpSection] = useState('');
    const hasMounted = useRef(false);
    const logoutDependencies = useMemo(() => ({
        setIsDirector,
        setAccountId,
        setActiveSection,
        setActiveHelpSection,
    }), [setIsDirector, setAccountId, setActiveSection, setActiveHelpSection]);

    const handleSetAccountId = (id) => {
        setAccountId(id);
        if ((typeof window !== 'undefined') && id) {
            localStorage.setItem('accountId', id);
        }
    };

    const handleSetActiveSection = (section) => {
        setActiveSection(section);
        if ((typeof window !== 'undefined') && section) {
            localStorage.setItem('activeSection', section);
        }
    };

    const handleSetActiveHelpSection = (section) => {
        setActiveHelpSection(section);
        if ((typeof window !== 'undefined') && section) {
            localStorage.setItem('activeHelpSection', section);
        }
    };

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;

            const id = typeof window !== 'undefined' ? localStorage.getItem('accountId') : null;
            const section = typeof window !== 'undefined' ? localStorage.getItem('activeSection') : null;
            const storedHelpSection = typeof window !== 'undefined' ? localStorage.getItem('activeHelpSection') : null;
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

            if (id && token) {
                setAccountId(id);
                if (section) setActiveSection(section);
                if (storedHelpSection) setActiveHelpSection(storedHelpSection);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (accountId) localStorage.setItem('accountId', accountId);
            if (activeSection) localStorage.setItem('activeSection', activeSection);
            if (activeHelpSection) localStorage.setItem('activeHelpSection', activeHelpSection);
        }
    }, [accountId, activeSection, activeHelpSection]);

    useEffect(() => {
        const restoreDirectorRole = async () => {
            const authToken = localStorage.getItem('auth-token');

            if (!authToken || !accountId || isDirector !== null || roleFetched) return;
            roleFetched = true;

            try {
                const data = await getRescuerById(accountId);
                if (data?.status === 403) {
                    logoutUser(logoutDependencies);
                    window.location.href = '/auth/login';
                    return;
                }
                if (data?.role) {
                    setIsDirector(data.role === 'Director');
                }
            } catch (error) {
                console.error("Помилка при відновленні ролі:", error);
            }
        };

        restoreDirectorRole();
    }, [accountId, isDirector]);

    const contextValue = {
        activeSection,
        setActiveSection: handleSetActiveSection,
        accountId,
        setAccountId: handleSetAccountId,
        isDirector,
        setIsDirector,
        isLoading,
        setIsLoading,
        activeHelpSection,
        setActiveHelpSection: handleSetActiveHelpSection,
        logoutDependencies,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};