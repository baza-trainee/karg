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
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        const data = await response.json();
        return data || { error: "Empty response" };
    } catch (error) {
        console.error(`Ошибка при запросе getRescuerById:`, error);
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
            try {
                const errorBody = await response.json();
                return { emailConflict: errorBody?.message || "Не вдалося створити працівника, оскільки цей email вже використовується" };
            } catch (error) {
                console.error(`Ошибка при парсинге ответа addRescuer:`, error);
                return { emailConflict: "Не вдалося створити працівника, оскільки цей email вже використовується" };
            }
        }
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
        console.error(`Ошибка при запросе addRescuer:`, error);
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
            try {
                const errorBody = await response.json();
                return { emailConflict: errorBody?.message || "Працівник з такою електронною поштою вже існує" };
            } catch (error) {
                console.error(`Ошибка при парсинге ответа updateRescuerInfo:`, error);
                return { emailConflict: "Працівник з такою електронною поштою вже існує" };
            }
        }
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
        console.error(`Ошибка при запросе updateRescuer:`, error);
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
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе getAllRescuers:`, error);
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
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        if (response.status === 204) {
            return { success: true };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе deleteRescuer:`, error);
        return { error: "Failed to fetch" };
    }
};



