import { useLayoutEffect, useRef } from 'react';
import paginationStyles from './pagination.module.scss';
import { ArrowRight, ArrowLeft } from "@/public/assets/icons";
import { useTranslation } from 'react-i18next';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const { t } = useTranslation('common');
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        console.log('useLayoutEffect triggered, currentPage:', currentPage);

        if (isFirstRender.current) {
            console.log('Skipping scroll on first render');
            isFirstRender.current = false;
            return;
        }

        const cardList = document.getElementById('card-list');
        const search = document.getElementById('search');
        const faq = document.getElementById('faq');

        if (search) {
            console.log('Scrolling to search');
            search.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return;
        }

        if (cardList) {
            console.log('Scrolling to cardList');
            cardList.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
            window.scrollBy({
                top: -100,
                behavior: 'auto',
            });
            return;
        }

        if (faq) {
            console.log('Scrolling to faq');
            faq.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
            window.scrollBy({
                top: -100,
                behavior: 'auto',
            });
            return;
        }
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleSpecificChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const pageButtons = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
        if (startPage > 2) {
            pageButtons.push(
                <button key="1" className={paginationStyles.pageButton} onClick={() => handleSpecificChange(1)}>
                    1
                </button>
            );
            pageButtons.push(<span key="ellipsis-start" className={paginationStyles.ellipsis}>...</span>);
        } else {
            startPage = 1;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                className={currentPage === i ? paginationStyles.currentPage : paginationStyles.pageButton}
                onClick={() => handleSpecificChange(i)}
                disabled={currentPage === i}
            >
                {i}
            </button>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageButtons.push(<span key="ellipsis-end" className={paginationStyles.ellipsis}>...</span>);
        }
        pageButtons.push(
            <button key={totalPages} className={paginationStyles.pageButton} onClick={() => handleSpecificChange(totalPages)}>
                {totalPages}
            </button>
        );
    }

    return (
        <div className={paginationStyles.paginationContainer}>
            <div className={paginationStyles.navigationContainer}>
                <ArrowLeft
                    className={`${paginationStyles.arrowIcon} ${currentPage === 1 ? paginationStyles.disabled : ''}`} />
                <button onClick={handlePreviousPage}
                    className={paginationStyles.navigationButton}
                    disabled={currentPage === 1}>
                    {t('prevPagination')}
                </button>
            </div>
            <div className={paginationStyles.pageButtonContainer}>
                {pageButtons}
            </div>
            <div className={paginationStyles.navigationContainer}>
                <button onClick={handleNextPage}
                    className={paginationStyles.navigationButton}
                    disabled={currentPage === totalPages}>
                    {t('nextPagination')}
                </button>
                <ArrowRight
                    className={`${paginationStyles.arrowIcon} ${currentPage === totalPages ? paginationStyles.disabled : ''}`} />
            </div>
        </div>
    );
};

export default Pagination;