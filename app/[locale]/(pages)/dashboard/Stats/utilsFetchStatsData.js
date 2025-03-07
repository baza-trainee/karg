import { getStatById, deleteStat, getAllStats } from "./api";

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
            const updatedFormData = {
                id: uaData.id,
                title_en: enData.title || '',
                title_ua: uaData.title || '',
                description_en: enData.description || '',
                description_ua: uaData.description || '',
                created_at: uaData.created_at || '',
                images: uaData.images || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteStatData = async (id, currentPage, stats, handlePageChange, setStats) => {
    try {
        await deleteStat(id);
        setStats(prevStats => prevStats.filter((stat) => stat.id !== id));
    } catch (error) {
        console.error('Error deleting:', error.message);
    } finally {
        const newPage = currentPage > 1 && stats.length === 1 ? currentPage - 1 : currentPage;
        handlePageChange(newPage);
    }
}

export const fetchStatsData = async (currentPage, currentLanguage = 'ua', setStats, setTotalPages) => {
    try {
        const data = await getAllStats(currentPage, currentLanguage);
        setStats(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching', error.message);
        setStats([]);
    }
};


