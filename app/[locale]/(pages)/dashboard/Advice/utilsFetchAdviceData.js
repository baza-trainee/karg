import { getAdviceById, deleteAdvice, getAllAdvices } from "./api";

export const initializeFormData = (data) => {
    const date = new Date().toISOString().split("T")[0];
    return {
        title_en: data.title_en || '',
        description_en: data.description_en || '',
        title_ua: data.title_ua || data.title || '',
        description_ua: data.description_ua || data.description || '',
        image: data.image || '',
        created_at: data.created_at || date
    }
}

export const fetchAdviceData = async (adviceId, type) => {
    if (type === 'edit' && adviceId) {
        try {
            const uaData = await getAdviceById(adviceId, 'ua');
            const enData = await getAdviceById(adviceId, 'en');
            const updatedFormData = {
                title_en: enData.title || '',
                description_en: enData.description || '',
                title_ua: uaData.title || '',
                description_ua: uaData.description || '',
                image: uaData.image || '',
                created_at: uaData.created_at || ''
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

export const fetchAdvicesData = async (currentPage, currentLanguage = 'ua', setAdvices, setTotalPages) => {
    try {
        const data = await getAllAdvices(currentPage, currentLanguage);
        setAdvices(data.advices);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching advices:', error.message);
        setAdvices([]);
    }
};


