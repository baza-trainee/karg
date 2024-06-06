const API_BASE_URL_PET = 'https://karg-backend.onrender.com/karg/animal';

export const getAnimalById = async (id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_PET}/getbyid?id=${id}&cultureCode=${cultureCode}`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const addAnimal = async (animalData) => {
    const response = await fetch(`${API_BASE_URL_PET}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalData)
    });
    if (!response.ok) {
        throw new Error(`Failed to submit form with status: ${response.status}`);
    }
    return response.json();
};

export const updateAnimal = async (id, updates) => {
    const response = await fetch(`${API_BASE_URL_PET}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update animal');
    }
    return response.json();
};

export const getAllAnimals = async (page, categoryQuery, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_PET}/getall?Page=${page}&PageSize=10${categoryQuery}&cultureCode=${cultureCode}`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const deleteAnimal = async (id) => {
    const response = await fetch(`${API_BASE_URL_PET}/delete?id=${id}`, { method: "DELETE" });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    } if (response.status === 204) {
        return;
    }
    return response.json();
};



