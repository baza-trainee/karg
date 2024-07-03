import { getAdviceById, deleteAdvice, getAllAdvices } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || new Date().toISOString(),
        title_ua: data.title_ua || data.title || '',
        title_en: data.title_en || '',
        description_ua: data.description_ua || data.description || '',
        description_en: data.description_en || '',
        image: data.image || '',
        created_At: data.created_At || new Date().toISOString()
    }
}

export const fetchAdviceData = async (adviceId, type) => {
    if (type === 'edit' && adviceId) {
        try {
            const uaData = await getAdviceById(adviceId, 'ua');
            const enData = await getAdviceById(adviceId, 'en');
            const updatedFormData = {
                id: uaData.id || new Date().toISOString(),
                title_ua: uaData.title || '',
                title_en: enData.title || '',
                description_ua: uaData.description || '',
                description_en: enData.description || '',
                image: uaData.image || '',
                created_At: uaData.created_At || ''
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching advice data:', error.message);
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteAdviceData = async (id, currentPage, advices, handlePageChange, setAdvices) => {
    try {
        await deleteAdvice(id);
        setAdvices(prevAdvices => prevAdvices.filter((advice) => advice.id !== id));
    } catch (error) {
        console.error('Error deleting the advice:', error.message);
    } finally {
        console.log('currentPage:', currentPage);
        const newPage = currentPage > 1 && advices.length === 1 ? currentPage - 1 : currentPage;
        console.log('newPage:', newPage);
        handlePageChange(newPage);
    }
}

export const fetchAdvicesData = async (currentPage, selectedCategory, initialCategory, currentLanguage = 'ua', setAdvices, setTotalPages) => {
    const categoryQuery = selectedCategory === initialCategory ? '' : `&CategoryFilter=${selectedCategory}`;
    try {
        const data = await getAllAdvices(currentPage, categoryQuery, currentLanguage);
        setAdvices(data.advices);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching advices:', error.message);
        setAdvices([]);
    }
};

