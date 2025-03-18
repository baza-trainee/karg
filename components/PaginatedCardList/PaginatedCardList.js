"use client";

import { useState, useEffect, useRef } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

export default function PaginatedCardList({ locale, endpoint, multiPageCardButtonVariant, searchTerm, category, onResults, setIsLoading, shortVersion }) {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const previousCards = useRef([]);
    const searchCurrentPage = 1;
    const searchPageSize = 45;

    useEffect(() => {
        const loadCards = async () => {
            try {
                let data;
                if (searchTerm && category) {
                    data = await FetchInitialCards(locale, endpoint, 'getall', searchPageSize, searchCurrentPage, searchTerm, category);
                    if (data.items.length > 0) {
                        previousCards.current = data.items;
                        setCards(data.items);
                    } else {
                        setCards(previousCards.current);
                    }
                } else if (searchTerm || category) {
                    data = await FetchInitialCards(locale, endpoint, 'getall', pageSize, currentPage, searchTerm, category);
                    if (data.items.length > 0) {
                        previousCards.current = data.items;
                        setCards(data.items);
                    } else {
                        setCards(previousCards.current);
                    }
                } else {
                    shortVersion ?
                        data = await FetchInitialCards(locale, endpoint, 'getall', pageSize, currentPage, searchTerm = '', category = '', shortVersion)
                        : data = await FetchInitialCards(locale, endpoint, 'getall', pageSize, currentPage);
                    previousCards.current = data.items;
                    setCards(data.items);
                }
                setTotalPages(data.totalPages);
                onResults(data.items.length);
            } catch (error) {
                console.error("Error fetching data:", error);
                onResults(0);
            } finally {
                setIsLoading(false);
            }
        };

        loadCards();
    }, [locale, currentPage, pageSize, searchTerm, category, onResults, setIsLoading, shortVersion]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <MultiPageCardItem
                data={cards}
                buttonVariant={multiPageCardButtonVariant}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
            />
        </>
    );
}