"use client";

import { useState, useEffect } from 'react';
import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import styles from "./faq.module.scss";
import { FaqItem } from "@/components/FaqItem/faq-item";
import Pagination from '@/components/MultiPageCardItem/pagination';

export default function InitialFetch({ locale }) {
    const [initialCards, setInitialCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadInitialCards = async () => {
            try {
                const data = await FetchInitialCards(locale, 'api/faq', 'getall', pageSize, currentPage);
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
        <div id="faq" className={styles.faqContainer}>
            <ul className={styles.questionsList}>
                {Array.isArray(initialCards) ? (
                    initialCards.map(({ id, question, answer }) => (
                        <li key={id}>
                            <FaqItem q={question} a={answer} />
                        </li>
                    ))
                ) : (
                    <ul>
                        <li>Ой лишенько ! Щось пішло не так і розділ "питань і відповідей" кудись подівся.</li>
                        <li>No FAQs found</li>
                    </ul>
                )}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}