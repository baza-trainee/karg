import { getRescuerById } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        fullName_name: data?.fullName?.split(" ")?.[0] || '',
        fullName_lastName: data?.fullName?.split(" ")?.[1] || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '80000000000',
        images: data.images || [],
    }
}

export const fetchTeamUserData = async (rescuerId, type, setIsDirector) => {
    if (type === 'edit' && rescuerId) {
        try {
            const data = await getRescuerById(rescuerId);
            if (data?.status === 403) {
                return data;
            }
            if (data?.error) {
                const errorMessage = data.error;
                console.error('Error fetching rescuer data:', errorMessage);
                return { error: errorMessage };
            }

            if (data?.role && typeof setIsDirector === 'function') {
                setIsDirector(data.role === "Director");
            }
            const updatedFormData = {
                id: data.id,
                fullName_name: data.fullName?.split(" ")?.[0] || '',
                fullName_lastName: data.fullName?.split(" ")?.[1] || '',
                email: data.email || '',
                phoneNumber: data.phoneNumber || '80000000000',
                images: data.images || [],
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching rescuer data:', error.message);
            return { error: "Failed to fetch rescuer" };
        }
    } else {
        return initializeFormData({});
    }
}

