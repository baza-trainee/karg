import { createContext, useCallback, useState, useContext } from 'react';
import { fetchPartners } from "./api/utilsFetchPartnerData";
import ModalContext from '@/app/ModalContext';

export const PartnerContext = createContext(null);

export const PartnerProvider = ({ children }) => {
    const [partners, setPartners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { showModal } = useContext(ModalContext);

    const loadPartners = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchPartners(currentPage, setPartners, setTotalPages, showModal);
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