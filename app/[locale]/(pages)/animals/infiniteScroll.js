"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

const InfiniteScroll = () => {
    const initialCategory = 'Найновіші';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(2);
    const [cards, setCards] = useState([]);
    const [totalPages, setTotalPages] = useState(2);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (fetching && currentPage <= totalPages) {
            console.log('fetch');
            axios.get(`https://karg-backend.onrender.com/karg/animal/getall?page=${currentPage}&pageSize=6&CategoryFilter=&NameSearch=&cultureCode=ua`)
                .then(response => {
                    console.log(response.data.animals);
                    setCards(prevCards => {
                        const uniqueCards = new Set([...prevCards, ...response.data.animals]);
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
    }, [fetching]);

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
            <MultiPageCardItem data={cards} buttonVariant={'button'} />
        </>
    );
};

export default InfiniteScroll;