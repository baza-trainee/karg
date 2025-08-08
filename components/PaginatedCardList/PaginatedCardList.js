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
    const searchPageSize = 45;

    const prevSearchTermRef = useRef(searchTerm);
    const prevCategoryRef = useRef(category);

    useEffect(() => {
        if (prevSearchTermRef.current !== searchTerm || prevCategoryRef.current !== category) {
            setCurrentPage(1);
            prevSearchTermRef.current = searchTerm;
            prevCategoryRef.current = category;
        }
    }, [searchTerm, category]);

    useEffect(() => {
        const loadCards = async () => {
            setIsLoading(true);
            try {
                let data;
                if (searchTerm && category) {
                    data = await FetchInitialCards(locale, endpoint, 'getall', searchPageSize, currentPage, searchTerm, category);
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
                    shortVersion
                        ?
                        data = await FetchInitialCards(locale, endpoint, 'getall', pageSize, currentPage, searchTerm = '', category = '', shortVersion)
                        :
                        data = await FetchInitialCards(locale, endpoint, 'getall', pageSize, currentPage);
                    previousCards.current = data.items;
                    setCards(data.items);
                }
                setTotalPages(data.totalPages);
                onResults(data.totalItems);
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