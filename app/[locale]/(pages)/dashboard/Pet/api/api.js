const API_BASE_URL_PET = 'https://karg-backend.onrender.com/karg/animal';

export const getAnimalById = async (id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_PET}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const addAnimal = async (animalData) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_PET}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": authToken
        },
        body: JSON.stringify(animalData)
    });
    if (!response.ok) {
        throw new Error(`Failed to submit form with status: ${response.status}`);
    }
    return response.json();
};

export const updateAnimal = async (id, updates) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_PET}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": authToken
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update animal');
    }
    return response.json();
};

export const getAllAnimals = async (page, categoryQuery, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_PET}/getall?Page=${page}&PageSize=10${categoryQuery}&cultureCode=${cultureCode}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const deleteAnimal = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_PET}/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': authToken
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    } if (response.status === 204) {
        return;
    }
    return response.json();
};



