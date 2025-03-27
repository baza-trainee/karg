import { parseErrorResponse } from '@/utils/parseErrorResponse';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_ADVICE = 'api/advice';

export const getAdviceById = async (id, cultureCode) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_ADVICE}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (response.status === 404) {
            return { error: "not_found" };
        }
        if (response.status >= 400 && response.status < 500) {
            return await parseErrorResponse(response);
        }
        if (response.status >= 500) {
            return { error: `API error: ${response.status}` };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        const data = await response.json();
        return data || { error: `API error: ${response.status}` };
    } catch (error) {
        console.error(`Помилка при запиті getAdviceById:`, error);
        return { error: "Failed to fetch" };
    }
}

export const addAdvice = async (adviceData) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_ADVICE}/add`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(adviceData)
        });
        if (response.status >= 400 && response.status < 500) {
            return await parseErrorResponse(response);
        }
        if (response.status >= 500) {
            return { error: `API error: ${response.status}` };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Помилка при запиті addAdvice:`, error);
        return { error: "Failed to fetch" };
    }
};

export const updateAdvice = async (id, updates) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_ADVICE}/update?id=${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updates)
        });
        if (response.status >= 400 && response.status < 500) {
            return await parseErrorResponse(response);
        }
        if (response.status >= 500) {
            return { error: `API error: ${response.status}` };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Помилка при запиті updateAdvice:`, error);
        return { error: "Failed to fetch" };
    }
};

export const getAllAdvices = async (page, cultureCode) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_ADVICE}/getall?Page=${page}&PageSize=6&cultureCode=${cultureCode}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (response.status === 404) {
            return { error: "not_found" };
        }
        if (response.status >= 400 && response.status < 500) {
            return await parseErrorResponse(response);
        }
        if (response.status >= 500) {
            return { error: `API error: ${response.status}` };
        }
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        const data = await response.json();
        return data || { error: `API error: ${response.status}` };
    } catch (error) {
        console.error(`Помилка при запиті getAllAdvices:`, error);
        return { error: "Failed to fetch" };
    }
};

export const deleteAdvice = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_ADVICE}/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (response.status === 204) {
            return { success: true };
        }
        if (response.status >= 400 && response.status < 500) {
            return await parseErrorResponse(response);
        }
        if (response.status >= 500) {
            return { error: `API error: ${response.status}` };
        }
        return { error: `API error: ${response.status}` };
    } catch (error) {
        console.error(`Помилка при запиті deleteAdvice:`, error);
        return { error: "Failed to fetch" };
    }
};

