const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_PARTNER = 'api/partner';

export const getAllPartners = async (page) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/getall?Page=${page}&PageSize=6`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе getAllPartners:`, error);
        return { error: "Failed to fetch" };
    }
}

export const addPartner = async (partnerData) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/add`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(partnerData)
        });
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе addPartner:`, error);
        return { error: "Failed to fetch" };
    }
};

export const updatePartner = async (id, updates) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/update?id=${id}`, {
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
        console.error(`Ошибка при запросе updatePartner:`, error);
        return { error: "Failed to fetch" };
    }
};

export const deletePartnerApi = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        if (response.status === 204) {
            return { success: true };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе deletePartner:`, error);
        return { error: "Failed to fetch" };
    }
}

export const getPartnerById = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/getbyid?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (response.status === 404) {
            return { error: "not_found" };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        const data = await response.json();
        return data || { error: "Empty response" };
    }
    catch (error) {
        console.error(`Ошибка при запросе getPartnerById:`, error);
        return { error: "Failed to fetch" };
    }
};
