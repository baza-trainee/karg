import { getRescuerById, deleteRescuerInfo, getAllRescuers } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        fullName: data.fullName || '',
        email: data.email || '',
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

export const deleteTeamUserData = async (id, setRescuers) => {
    try {
        await deleteRescuerInfo(id);
        setRescuers(prevRescuers => prevRescuers.filter((rescuer) => rescuer.id !== id));
    } catch (error) {
        console.error('Error deleting the rescuers data :', error.message);
    }
}

export const fetchTeamData = async (setRescuers) => {
    try {
        const data = await getAllRescuers();
        setRescuers(data);
    } catch (error) {
        console.error('Error fetching rescuers:', error.message);
        setRescuers([]);
    }
};

