import { getAllPartners, deletePartnerApi, getPartnerById } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        name: data.name || '',
        images: data.images || [],
        uri: data.uri || '',
    }
}

export const fetchPartners = async (setPartners) => {
    try {
        const data = await getAllPartners();
        setPartners(data);
    } catch (error) {
        throw new Error('Error fetching partners:', error.message);
    }
}

export const deletePartner = async (id, setPartners) => {
    try {
        await deletePartnerApi(id);
        setPartners(prevPartners => prevPartners.filter((partner) => partner.id !== id));
    } catch (error) {
        console.error('Error deleting the partner:', error.message);
    }
}

export const fetchPartnerData = async (partnerId, type) => {
    if (type === 'edit' && partnerId) {
        try {
            const data = await getPartnerById(partnerId);
            const updatedFormData = {
                id: data.id,
                images: data.images || [],
                name: data.name || '',
                uri: data.uri || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching partner data:', error.message);
        }
    } else {
        return initializeFormData({});
    }
}