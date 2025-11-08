import { parseErrorResponse } from '@/utils/parseErrorResponse';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_PET = 'api/animal';

export const getAnimalById = async (id, cultureCode) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
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
        console.error(`Помилка при запиті getAnimalById:`, error);
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
        console.error(`Помилка при запиті addAnimal:`, error);
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
        console.error(`Помилка при запиті updateAnimal:`, error);
        return { error: "Failed to fetch" };
    }
};

export const getAllAnimals = async (page, categoryQuery, cultureCode) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/getall?Page=${page}&PageSize=6${categoryQuery}&cultureCode=${cultureCode}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
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
        console.error(`Помилка при запиті getAllAnimals:`, error);
        return { error: "Failed to fetch" };
    }
};

export const deleteAnimal = async (id) => {
    try {
        const authToken = localStorage.getItem('auth-token');
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PET}/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
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
        console.error(`Помилка при запиті deleteAnimal:`, error);
        return { error: "Failed to fetch" };
    }
};



