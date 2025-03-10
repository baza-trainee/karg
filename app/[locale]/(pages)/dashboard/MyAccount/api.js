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
        console.error(`Error fetching rescuer by id:`, error);
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
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе updateRescuerInfo:`, error);
        return { error: "Failed to fetch" };
    }
};

