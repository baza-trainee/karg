import { getStatById, deleteStat, getAllStats } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        year: data.year || '',
        description_en: data.description_en || '',
        description_ua: data.description_ua || data.description || '',
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
                year: uaData.year || '',
                description_en: enData.description || '',
                description_ua: uaData.description || '',
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
        console.log('currentPage:', currentPage);
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


