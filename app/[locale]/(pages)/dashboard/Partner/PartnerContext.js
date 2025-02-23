import { createContext, useCallback, useState } from 'react';
import { fetchPartners } from "./api/utilsFetchPartnerData";
export const PartnerContext = createContext(null);

export const PartnerProvider = ({ children }) => {
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadPartners = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchPartners(currentPage, setPartners, setTotalPages);
        } catch (error) {
            console.error('Error loading partners:', error);
            setPartners([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage]);

    const handlePageChange = useCallback((newPage) => {
            setCurrentPage(newPage);
        }, [setCurrentPage]);

    return (
        <PartnerContext.Provider value={{
            partners,
            setPartners,
            loadPartners,
            isLoading,
            setIsLoading,
            currentPage,
            setCurrentPage,
            totalPages,
            setTotalPages,
            handlePageChange,
        }}>
            {children}
        </PartnerContext.Provider>
    );
}