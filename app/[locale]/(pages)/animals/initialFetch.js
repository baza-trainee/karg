"use client";

import { useState, useEffect, useRef } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

export default function InitialFetch({ locale, searchTerm, category, onResults }) {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const previousCards = useRef([]);

    useEffect(() => {
        const loadCards = async () => {
            try {
                let data;
                if (searchTerm || category) {
                    data = await FetchInitialCards(locale, 'api/animal', 'getall', pageSize, currentPage, searchTerm, category);
                    if (data.items.length > 0) {
                        previousCards.current = data.items;
                        setCards(data.items);
                    } else {
                        setCards(previousCards.current);
                    }
                } else {
                    data = await FetchInitialCards(locale, 'api/animal', 'getall', pageSize, currentPage);
                    previousCards.current = data.items;
                    setCards(data.items);
                }
                setTotalPages(data.totalPages);
                onResults(data.items.length);
            } catch (error) {
                console.error("Error fetching data:", error);
                onResults(0);
            }
        };

        loadCards();
    }, [locale, currentPage, pageSize, searchTerm, category, onResults]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <MultiPageCardItem
                data={cards}
                buttonVariant="button"
                onPageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
            />
        </>
    );
}