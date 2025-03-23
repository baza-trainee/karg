import { getContactById, getAllContacts } from "./api";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

export const fetchContactItemData = async (contactId, type = 'edit', contactData = {}) => {
    if (type === 'edit' && contactId) {
        try {
            if (contactData.category === "Location" && contactData.idUa && contactData.idEn) {
                const [dataUa, dataEn] = await Promise.all([
                    getContactById(contactData.idUa),
                    getContactById(contactData.idEn)
                ]);
                if (dataUa.error || dataEn.error) {
                    const errorMessage = dataUa.error || dataEn.error;
                    console.error('Error fetching contact data:', errorMessage);
                    return { error: errorMessage };
                }
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
                if (data.error) {
                    console.error('Error fetching contact data:', data.error);
                    return { error: data.error };
                }
                let cleanValue = data.value || '';
                if (data.category === "Statistics" && data.id === 12) {
                    cleanValue = cleanValue.replace(/\+$/, "");
                }
                return {
                    id: data.id || '',
                    category: data.category || '',
                    value: cleanValue || '',
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

export const fetchAllContactsData = async (setContact, showModal) => {
    try {
        const data = await getAllContacts();
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
            setContact([]);
            return;
        }
        setContact(data);
    } catch (error) {
        console.error('Error fetching contact:', error.message);
        setContact([]);
        return { error: "Failed to fetch contacts" };
    }
}



