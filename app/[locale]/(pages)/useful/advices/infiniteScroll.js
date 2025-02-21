"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const InfiniteScroll = ({ locale }) => {
    const initialCategory = 'Найновіші';
    const cultureCode = locale === 'uk' ? 'ua' : 'en';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(2);
    const [cards, setCards] = useState([]);
    const [totalPages, setTotalPages] = useState(2);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (fetching && currentPage <= totalPages) {
            axios.get(`${API_BASE_URL}/api/advice/getall?page=${currentPage}&pageSize=6&CategoryFilter=&NameSearch=&cultureCode=${cultureCode}`)
                .then(response => {
                    setCards(prevCards => {
                        const uniqueCards = new Set([...prevCards, ...response.data.advices]);
                        return Array.from(uniqueCards);
                    });
                    setCurrentPage(prev => prev + 1);
                    setTotalPages(response.data.totalPages);
                }).catch(error => {
                    console.error('Error fetching data:', error);
                }).finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching, cultureCode]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && currentPage <= totalPages) {
            setFetching(true);
        }
    };

    return (
        <>
            <MultiPageCardItem data={cards} buttonVariant={'link'} />
        </>
    );
};

export default InfiniteScroll;