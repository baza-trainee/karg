import { getStatById, deleteStat, getAllStats } from "./api";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

export const initializeFormData = (data) => {
    const date = new Date().toISOString().split("T")[0];
    return {
        id: data.id || '',
        title_en: data.title_en || '',
        title_ua: data.title_ua || '',
        description_en: data.description_en || '',
        description_ua: data.description_ua || '',
        created_at: data.created_at || date,
        images: data.images || [],
    }
}

export const fetchStatData = async (statId, type) => {
    if (type === 'edit' && statId) {
        try {
            const uaData = await getStatById(statId, 'ua');
            const enData = await getStatById(statId, 'en');
            if (uaData.error || enData.error) {
                const errorMessage = uaData.error || enData.error;
                console.error('Error fetching advice data:', errorMessage);
                return { error: errorMessage };
            }
            const updatedFormData = {
                id: uaData.id,
                title_en: enData.title || '',
                title_ua: uaData.title || '',
                description_en: enData.description || '',
                description_ua: uaData.description || '',
                created_at: uaData.created_at || '',
                images: uaData.images || [],
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return { error: "Failed to fetch" };
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteStatData = async (id, currentPage, stats, handlePageChange, setStats, showModal) => {
    try {
        const result = await deleteStat(id);
        if (result.success) {
            setStats(prevStats => prevStats.filter((stat) => stat.id !== id));
            const newPage = currentPage > 1 && stats.length === 1 ? currentPage - 1 : currentPage;
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

export const fetchStatsData = async (currentPage, currentLanguage = 'ua', setStats, setTotalPages, showModal) => {
    try {
        const data = await getAllStats(currentPage, currentLanguage);
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
            setStats([]);
            setTotalPages(1);
            return;
        }
        setStats(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching', error.message);
        setStats([]);
        return { error: "Failed to fetch statistics list" };
    }
};


