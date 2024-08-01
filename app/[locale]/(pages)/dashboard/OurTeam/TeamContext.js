import React, { createContext, useState, useCallback } from 'react';
import { fetchTeamData } from "./utilsFetchTeamData";
export const TeamContext = createContext(null);

export const TeamProvider = ({ children }) => {
    const [rescuers, setRescuers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadRescuers = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchTeamData(setRescuers);
        } catch (error) {
            console.error('Error loading rescuers:', error);
            setRescuers([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <TeamContext.Provider value={{
            isLoading,
            setIsLoading,
            rescuers,
            setRescuers,
            loadRescuers,
        }}>
            {children}
        </TeamContext.Provider>
    );
};