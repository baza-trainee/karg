import { getRescuerById, deleteRescuerInfo, getAllRescuers } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        fullName: data.fullName || '',
        email: data.email || '',
        role: data.role || '',
        phoneNumber: data.phoneNumber || '',
        images: data.images || [],
    }
}

export const fetchTeamUserData = async (rescuerId, type) => {
    if (type === 'edit' && rescuerId) {
        try {
            const Data = await getRescuerById(rescuerId);
            const updatedFormData = {
                id: Data.id,
                fullName: Data.fullName || '',
                email: Data.email || '',
                role: Data.role || '',
                phoneNumber: Data.phoneNumber || '',
                images: Data.images || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching rescuer data:', error.message);
        }
    } else {
        return initializeFormData({});
    }
}

export const deleteTeamUserData = async (id, currentPage, rescuers, handlePageChange, setRescuers) => {
    try {
        await deleteRescuerInfo(id);
        setRescuers(prevRescuers => prevRescuers.filter((rescuer) => rescuer.id !== id));
    } catch (error) {
        console.error('Error deleting the rescuers data :', error.message);
    } finally {
        const newPage = currentPage > 1 && rescuers.length === 1 ? currentPage - 1 : currentPage;
        handlePageChange(newPage);
    }
}

export const fetchTeamData = async (currentPage, setRescuers, setTotalPages) => {
    try {
        const data = await getAllRescuers(currentPage);
        setRescuers(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching rescuers:', error.message);
        setRescuers([]);
    }
};

