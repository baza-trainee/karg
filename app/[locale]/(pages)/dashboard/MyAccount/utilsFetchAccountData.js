import { getRescuerById } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        fullName_name: data?.fullName?.split(" ")[0] || '',
        fullName_lastName: data?.fullName?.split(" ")[1] || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || 'Не вказаний',
        images: data.images || [],
    }
}

export const fetchTeamUserData = async (rescuerId, type) => {
    if (type === 'edit' && rescuerId) {
        try {
            const Data = await getRescuerById(rescuerId);
            const updatedFormData = {
                id: Data.id,
                fullName_name: Data.fullName.split(" ")[0] || '',
                fullName_lastName: Data.fullName.split(" ")[1] || '',
                email: Data.email || '',
                phoneNumber: Data.phoneNumber || 'Не вказаний',
                images: Data.images || [],
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching rescuer data:', error.message);
        }
    } else {
        return initializeFormData({});
    }
}

