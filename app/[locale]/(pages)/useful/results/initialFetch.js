"use client";

import { useState, useEffect } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

export default function InitialFetch({ locale }) {
    const [initialCards, setInitialCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadInitialCards = async () => {
            const data = await FetchInitialCards(locale, 'api/yearresult', 'getall', 6);
            setInitialCards(data.items);
            setTotalPages(data.totalPages);
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
                buttonVariant="link"
                onPageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
            />

        </>
    );
}