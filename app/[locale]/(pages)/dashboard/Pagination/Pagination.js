import styles from "./pagination.module.scss";
import { ArrowRight, ArrowLeft } from "@/public/assets/icons";

function Pagination({ totalPages, currentPage, handlePageChange }) {
    const pageButtons = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
        if (startPage > 2) {
            pageButtons.push(
                <button key="1" className={styles.pageButton} onClick={() => handlePageChange(1)}>
                    1
                </button>
            );
            pageButtons.push(<span key="ellipsis-start" className={styles.ellipsis}>...</span>);
        } else {
            startPage = 1;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                className={currentPage === i ? styles.currentPage : styles.pageButton}
                onClick={() => handlePageChange(i)}
                disabled={currentPage === i}
            >
                {i}
            </button>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageButtons.push(<span key="ellipsis-end" className={styles.ellipsis}>...</span>);
        }
        pageButtons.push(
            <button key={totalPages} className={styles.pageButton} onClick={() => handlePageChange(totalPages)}>
                {totalPages}
            </button>
        );
    }

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.navigationContainer}>
                <ArrowLeft className={`${styles.arrowIcon} ${currentPage === 1 ? styles.disabled : ''}`} />
                <button
                    key='prev'
                    className={styles.navigationButton}
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    Попередня
                </button>
            </div>
            <div className={styles.pageButtonContainer}>
                {pageButtons}
            </div>
            <div className={styles.navigationContainer}>
                <button
                    key='next'
                    className={styles.navigationButton}
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    Наступна
                </button>
                <ArrowRight className={`${styles.arrowIcon} ${currentPage === totalPages ? styles.disabled : ''}`} />
            </div>
        </div>
    );
}
export default Pagination;