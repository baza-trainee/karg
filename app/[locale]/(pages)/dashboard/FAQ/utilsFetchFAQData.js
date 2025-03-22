import { getFAQById, deleteFAQ, getAllFAQ } from "./api";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        question_en: data.question_en || '',
        answer_en: data.answer_en || '',
        question_ua: data.question_ua || data.question || '',
        answer_ua: data.answer_ua || data.answer || '',
    }
}

export const fetchFAQItemData = async (faqId, type) => {
    if (type === 'edit' && faqId) {
        try {
            const uaData = await getFAQById(faqId, 'ua');
            const enData = await getFAQById(faqId, 'en');
            if (uaData.error || enData.error) {
                const errorMessage = uaData.error || enData.error;
                console.error('Error fetching FAQ data:', errorMessage);
                return { error: errorMessage };
            }
            const updatedFormData = {
                id: uaData.id,
                question_en: enData.question || '',
                answer_en: enData.answer || '',
                question_ua: uaData.question || '',
                answer_ua: uaData.answer || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching FAQ data:', error.message);
            return { error: "Failed to fetch" };
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteFAQItemData = async (id, currentPage, faq, handlePageChange, setFAQ, showModal) => {
    try {
        const result = await deleteFAQ(id);
        if (result.success) {
            setFAQ(prevFAQ => prevFAQ.filter((faq) => faq.id !== id));
            const newPage = currentPage > 1 && faq.length === 1 ? currentPage - 1 : currentPage;
            handlePageChange(newPage);
        } else {
            console.error(`Видалення не виконано. Сервер повернув: ${result.error}`);
            showModal('confirmation',
                <SuccessDialog
                    title={"Помилка"}
                    message={result.error || "Не вдалося видалити запис."}
                    buttonText={"Закрити"}
                />);
        }
    } catch (error) {
        console.error(`Error deleting ID ${id} :`, error);
        return { error: "Failed to delete FAQ item" };
    }
}

export const fetchAllFAQData = async (currentPage, currentLanguage = 'ua', setFAQ, setTotalPages, showModal) => {
    try {
        const data = await getAllFAQ(currentPage, currentLanguage);
        if (data?.error) {
            const errorMessage = data.error === 'not_found'
                ? 'Записи не знайдено, або було видалено.'
                : data.error;
            console.error('Помилка при отриманні даних:', errorMessage);
            if (showModal) {
                showModal(
                    'confirmation',
                    <SuccessDialog
                        title="Помилка"
                        message={errorMessage}
                        buttonText="Закрити"
                    />
                );
            }
            setFAQ([]);
            setTotalPages(1);
            return;
        }
        setFAQ(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching faq:', error.message);
        setFAQ([]);
        return { error: "Failed to fetch FAQ list" };
    }
};


