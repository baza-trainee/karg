import { createContext, useCallback, useState } from 'react';
import { fetchPartners } from "./api/utilsFetchPartnerData";
export const PartnerContext = createContext(null);

export const PartnerProvider = ({ children }) => {
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadPartners = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchPartners(setPartners);
        } catch (error) {
            console.error('Error loading partners:', error);
            setPartners([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <PartnerContext.Provider value={{
            partners,
            setPartners,
            loadPartners,
            isLoading,
            setIsLoading
        }}>
            {children}
        </PartnerContext.Provider>
    );
}