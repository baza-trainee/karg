import { parseErrorResponse } from '@/utils/parseErrorResponse';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_RESCUER = 'api/rescuer';

export const getRescuerById = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_RESCUER}/getbyid?id=${id}`, {
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
        console.error(`Помилка при запиті getRescuerById:`, error);
        return { error: "Failed to fetch" };
    }
};

export const addRescuer = async (rescuerData) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_RESCUER}/add`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(rescuerData)
        });
        if (response.status === 409) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    const errorBody = await response.json();
                    return { emailConflict: errorBody?.message || "Працівник з такою електронною поштою вже існує" };
                } catch (error) {
                    console.error(`Помилка при парсингу JSON відповіді updateRescuerInfo:`, error);
                    return { emailConflict: "Працівник з такою електронною поштою вже існує" };
                }
            } else {
                try {
                    const errorText = await response.text();
                    return { emailConflict: errorText || "Працівник з такою електронною поштою вже існує" };
                } catch (error) {
                    console.error(`Помилка при парсингу текстової відповіді updateRescuerInfo:`, error);
                    return { emailConflict: "Працівник з такою електронною поштою вже існує" };
                }
            }
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
        return response.json();
    } catch (error) {
        console.error(`Помилка при запиті addRescuer:`, error);
        return { error: "Failed to fetch" };
    }
};

export const updateRescuerInfo = async (id, updates) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_RESCUER}/update?id=${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updates)
        });
        if (response.status === 409) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    const errorBody = await response.json();
                    return { emailConflict: errorBody?.message || "Працівник з такою електронною поштою вже існує" };
                } catch (error) {
                    console.error(`Помилка при парсингу JSON відповіді updateRescuerInfo:`, error);
                    return { emailConflict: "Працівник з такою електронною поштою вже існує" };
                }
            } else {
                try {
                    const errorText = await response.text();
                    return { emailConflict: errorText || "Працівник з такою електронною поштою вже існує" };
                } catch (error) {
                    console.error(`Помилка при парсингу текстової відповіді updateRescuerInfo:`, error);
                    return { emailConflict: "Працівник з такою електронною поштою вже існує" };
                }
            }
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
        return response.json();
    } catch (error) {
        console.error(`Помилка при запиті updateRescuer:`, error);
        return { error: "Failed to fetch" };
    }
};

export const getAllRescuers = async (page) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_RESCUER}/getall?Page=${page}&PageSize=10`, {
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
        console.error(`Помилка при запиті getAllRescuers:`, error);
        return { error: "Failed to fetch" };
    }
};

export const deleteRescuerInfo = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_RESCUER}/delete?id=${id}`, {
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
        console.error(`Помилка при запиті deleteRescuer:`, error);
        return { error: "Failed to fetch" };
    }
};



