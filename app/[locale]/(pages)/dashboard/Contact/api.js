const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_CONTACT = 'api/contact';

export const getContactById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/getbyid?id=${id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 404) {
            return { error: "not_found" };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        const data = await response.json();
        return data || { error: "Empty response" };
    } catch (error) {        
        console.error(`Ошибка при запросе getContactById:`, error);
        return { error: "Failed to fetch" };
    }
};

export const updateContactItem = async (id, updates) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/update?id=${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updates)
        });
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе updateContactItem:`, error);
        return { error: "Failed to fetch" };
    }
};

export const getAllContacts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/getall`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе getAllContacts:`, error);
        return { error: "Failed to fetch" };
    }
};

