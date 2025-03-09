"use client";

import { useState, useEffect } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

export default function InitialFetch({ locale }) {
    const [initialCards, setInitialCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadInitialCards = async () => {
            try {
                const data = await FetchInitialCards(locale, 'api/animal', 'getall', pageSize, currentPage);
                setInitialCards(data.items);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        loadInitialCards();
    }, [locale, currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <MultiPageCardItem
                data={initialCards}
                buttonVariant="button"
                onPageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
            />
        </>
    );
}