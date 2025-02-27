"use client";

import { useState, useEffect } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

export default function InitialFetch({ locale }) {
    const [initialCards, setInitialCards] = useState([]);
    // const initialCards = await FetchInitialCards(locale, 'advice', 'getall');

    useEffect(() => {
        const loadInitialCards = async () => {
            const cards = await FetchInitialCards(locale, 'api/advice', 'getall', 6);
            setInitialCards(cards);
        };

        loadInitialCards();
    }, [locale]);

    return (
        <>
            <MultiPageCardItem data={initialCards} buttonVariant={'link'} />
        </>
    );
}