const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_PET = 'api/animal';

export const getAnimalById = async (id, cultureCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
    } catch (error) {
        console.error(`Ошибка при запросе getAnimalById:`, error);
        return { error: "Failed to fetch" };
    }
};

export const addAnimal = async (animalData) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/add`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(animalData)
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
        console.error(`Ошибка при запросе addAnimal:`, error);
        return { error: "Failed to fetch" };
    }
};

export const updateAnimal = async (id, updates) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/update?id=${id}`, {
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
        console.error(`Ошибка при запросе updateAnimal:`, error);
        return { error: "Failed to fetch" };
    }
};

export const getAllAnimals = async (page, categoryQuery, cultureCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/getall?Page=${page}&PageSize=6${categoryQuery}&cultureCode=${cultureCode}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            return { error: `API error: ${response.status}` };
        }
        return response.json();
    } catch (error) {
        console.error(`Ошибка при запросе getAllAnimals:`, error);
        return { error: "Failed to fetch" };
    }
};

export const deleteAnimal = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/delete?id=${id}`, {
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
        console.error(`Ошибка при запросе deleteAnimal:`, error);
        return { error: "Failed to fetch" };
    }
};



