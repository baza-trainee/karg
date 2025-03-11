"use client";

import { useState, useEffect, useRef } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';
import Spinner from '@/components/Spinner/Spinner';

export default function PaginatedCardList({ locale, endpoint, multiPageCardButtonVariant, searchTerm, category, onResults }) {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const previousCards = useRef([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchOrCategoryPage = 1;
    const searchOrCategoryPageSize = 40;

    useEffect(() => {
        const loadCards = async () => {
            setIsLoading(true);
            try {
                let data;
                if (searchTerm || category) {
                    data = await FetchInitialCards(locale, endpoint, 'getall', searchOrCategoryPageSize, searchOrCategoryPage, searchTerm, category);
                    if (data.items.length > 0) {
                        previousCards.current = data.items;
                        setCards(data.items);
                    } else {
                        setCards(previousCards.current);
                    }
                } else {
                    data = await FetchInitialCards(locale, endpoint, 'getall', pageSize, currentPage);
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
    }, [locale, currentPage, pageSize, searchTerm, category, onResults]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <MultiPageCardItem
                    data={cards}
                    buttonVariant={multiPageCardButtonVariant}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalPages={totalPages}
                />
            )}
        </>
    );
}