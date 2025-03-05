import { getContactById, getAllContacts } from "./api";

export const fetchContactItemData = async (contactId, type = 'edit', contactData = {}) => {
    if (type === 'edit' && contactId) {
        try {
            if (contactData.category === "Location" && contactData.idUa && contactData.idEn) {
                const [dataUa, dataEn] = await Promise.all([
                    getContactById(contactData.idUa),
                    getContactById(contactData.idEn)
                ]);
                return {
                    category: "Location",
                    idUa: contactData.idUa,
                    idEn: contactData.idEn,
                    valueUa: dataUa.value || '',
                    valueEn: dataEn.value || '',
                    value: `${dataUa.value || ''} | ${dataEn.value || ''}`
                };
            } else {
                const data = await getContactById(contactId);
                return {
                    id: data.id || '',
                    category: data.category || '',
                    value: data.value || '',
                };
            }
        } catch (error) {
            console.error('Error fetching Contact data:', error.message);
            return { id: '', category: '', value: '' };
        }
    } else {
        return { id: '', category: '', value: '' };
    }
};

export const fetchAllContactsData = async (setContact) => {
    try {
        const data = await getAllContacts();
        setContact(data);
    } catch (error) {
        console.error('Error fetching contact:', error.message);
        setContact([]);
    }
}



