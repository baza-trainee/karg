import React, { createContext, useState, useCallback } from 'react';
import { fetchPets } from "./api/utilsFetchPetData";
export const PetContext = createContext(null);

export const PetProvider = ({ children }) => {
    const initialCategory = 'Найновіші';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(1);
    const [pets, setPets] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const loadPets = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchPets(currentPage, selectedCategory, initialCategory, 'ua', setPets, setTotalPages);
        } catch (error) {
            console.error('Error loading pets:', error);
            setPets([]);
            setTotalPages(1);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, selectedCategory]);

    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
    }, [setCurrentPage]);

    return (
        <PetContext.Provider value={{
            selectedCategory,
            setSelectedCategory,
            initialCategory,
            currentPage,
            setCurrentPage,
            isLoading,
            setIsLoading,
            pets,
            setPets,
            totalPages,
            setTotalPages,
            loadPets,
            handlePageChange
        }}>
            {children}
        </PetContext.Provider>
    );
};