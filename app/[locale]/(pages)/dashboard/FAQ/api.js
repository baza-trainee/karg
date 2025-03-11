const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_FAQ = 'api/faq';

export const getFAQById = async (id, cultureCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
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
        console.error(`Ошибка при запросе getFAQById:`, error);
        return { error: "Failed to fetch" };
    }
};

export const addFAQItem = async (faqItemData) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/add`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(faqItemData)
        });
        if (response.status >= 400 && response.status < 500) {
            try {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const errorBody = await response.json();
                    const errorMessage = (typeof errorBody === 'object' && errorBody.message) ? errorBody.message : errorBody;
                    return { error: errorMessage };
                } else {
                    const errorText = await response.text();
                    return { error: errorText };
                }
            } catch (error) {
                console.error("Помилка при розборі відповіді 400-499:", error);
                return { error: "Помилка валідації" };
            }
        }
        if (response.status >= 500) {
            return { error: "Сталася помилка на сервері." };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе addFAQ:`, error);
        return { error: "Failed to fetch" };
    }
};

export const updateFAQItem = async (id, updates) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/update?id=${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updates)
        });
        if (response.status >= 400 && response.status < 500) {
            try {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const errorBody = await response.json();
                    const errorMessage = (typeof errorBody === 'object' && errorBody.message) ? errorBody.message : errorBody;
                    return { error: errorMessage };
                } else {
                    const errorText = await response.text();
                    return { error: errorText };
                }
            } catch (error) {
                console.error("Помилка при розборі відповіді 400-499:", error);
                return { error: "Помилка валідації" };
            }
        }
        if (response.status >= 500) {
            return { error: "Сталася помилка на сервері." };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе updateFAQ:`, error);
        return { error: "Failed to fetch" };
    }
};

export const getAllFAQ = async (page, cultureCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/getall?Page=${page}&PageSize=10&cultureCode=${cultureCode}`, {
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
        console.error(`Ошибка при запросе getAllFAQ:`, error);
        return { error: "Failed to fetch" };
    }
};

export const deleteFAQ = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        if (response.status === 204) {
            return { success: true };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе deleteFAQ:`, error);
        return { error: "Failed to fetch" };
    }
};



