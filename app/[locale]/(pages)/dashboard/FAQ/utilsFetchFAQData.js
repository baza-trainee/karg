import { getFAQById, deleteFAQ, getAllFAQ } from "./api";

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
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteFAQItemData = async (id, currentPage, faq, handlePageChange, setFAQ) => {
    try {
        await deleteFAQ(id);
        setFAQ(prevFAQ => prevFAQ.filter((faq) => faq.id !== id));
    } catch (error) {
        console.error('Error deleting the FAQ:', error.message);
    } finally {
        const newPage = currentPage > 1 && faq.length === 1 ? currentPage - 1 : currentPage;
        handlePageChange(newPage);
    }
}

export const fetchAllFAQData = async (currentPage, currentLanguage = 'ua', setFAQ, setTotalPages) => {
    try {
        const data = await getAllFAQ(currentPage, currentLanguage);
        setFAQ(data);
        //setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching faq:', error.message);
        setFAQ([]);
    }
};


