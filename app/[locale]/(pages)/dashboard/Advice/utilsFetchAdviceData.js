import { getAdviceById, deleteAdvice, getAllAdvices } from "./api";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

export const initializeFormData = (data) => {
    const date = new Date().toISOString().split("T")[0];
    return {
        id: data.id || '',
        title_en: data.title_en || '',
        description_en: data.description_en || '',
        title_ua: data.title_ua || data.title || '',
        description_ua: data.description_ua || data.description || '',
        images: data.images || [],
        created_at: data.created_at || date
    }
}

export const fetchAdviceData = async (adviceId, type) => {
    if (type === 'edit' && adviceId) {
        try {
            const uaData = await getAdviceById(adviceId, 'ua');
            const enData = await getAdviceById(adviceId, 'en');
            if (uaData.error || enData.error) {
                const errorMessage = uaData.error || enData.error;
                console.error('Error fetching advice data:', errorMessage);
                return { error: errorMessage };
            }
            const updatedFormData = {
                id: uaData.id,
                title_en: enData.title || '',
                description_en: enData.description || '',
                title_ua: uaData.title || '',
                description_ua: uaData.description || '',
                images: uaData.images || '',
                created_at: uaData.created_at || ''
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching advice data:', error.message);
            return { error: "Failed to fetch" };
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteAdviceData = async (id, currentPage, advices, handlePageChange, setAdvices, showModal) => {
    try {
        const result = await deleteAdvice(id);
        if (result.success) {
            setAdvices(prevAdvices => prevAdvices.filter((advice) => advice.id !== id));
            const newPage = currentPage > 1 && advices.length === 1 ? currentPage - 1 : currentPage;
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
        return { error: "Failed to delete" };
    }
}

export const fetchAdvicesData = async (currentPage, currentLanguage = 'ua', setAdvices, setTotalPages, showModal) => {
    try {
        const data = await getAllAdvices(currentPage, currentLanguage);
        if (data?.error) {
            const errorMessage = data.error === 'not_found'
                ? 'Записи не знайдено, або було видалено.'
                : data.error;
            console.error('Помилка при отриманні даних:', data.error);
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
            setAdvices([]);
            setTotalPages(1);
            return;
        }
        setAdvices(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching advices:', error.message);
        setAdvices([]);
        return { error: "Failed to fetch advices list" };
    }
};


