"use client";

import { useState, useEffect } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';
import Spinner from '@/components/Spinner/Spinner';

export default function InitialFetch({ locale }) {
    const [initialCards, setInitialCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadInitialCards = async () => {
            setIsLoading(true);
            try {
                const data = await FetchInitialCards(locale, 'api/yearresult', 'getall', pageSize, currentPage);
                setInitialCards(data.items);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }

        };

        loadInitialCards();
    }, [locale, currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <MultiPageCardItem
                    data={initialCards}
                    buttonVariant="link"
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalPages={totalPages}
                />
            )}
        </>
    );
}