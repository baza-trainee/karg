import { getContactById, deleteContact, getAllContacts } from "./api";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        category: data.category || '',
        value: data.value || '',
    }
}

export const fetchContactItemData = async (contactId, type) => {
    if (type === 'edit' && contactId) {
        try {
            const data = await getContactById(contactId, 'en');
            const updatedFormData = {
                id: uaData.id,
                category: enData.category || '',
                value_en: enData.value || '',
                category_ua: uaData.category || '',
                value_ua: uaData.value || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching Contacts data:', error.message);
        }
    } else {
        return initializeFormData({});
    }
}

// export const deleteContactItemData = async (id, currentPage, contact, handlePageChange, setContact) => {
//     try {
//         await deleteContact(id);
//         setContact(prevContact => prevContact.filter((contact) => contact.id !== id));
//     } catch (error) {
//         console.error('Error deleting the Contact:', error.message);
//     } finally {
//         const newPage = currentPage > 1 && contact.length === 1 ? currentPage - 1 : currentPage;
//         handlePageChange(newPage);
//     }
// }

export const fetchAllContactsData = async (currentPage, currentLanguage = 'ua', setContact, setTotalPages) => {
    try {
        const data = await getAllContacts(currentPage, currentLanguage);
        setContact(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching contact:', error.message);
        setContact([]);
    }
};


