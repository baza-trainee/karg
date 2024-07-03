const API_BASE_URL_ADVICE = 'https://karg-backend.onrender.com/karg/advice';

export const getAdviceById = async (id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_ADVICE}/getbyid?id=${id}&cultureCode=${cultureCode}`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const addAdvice = async (adviceData) => {
    const response = await fetch(`${API_BASE_URL_ADVICE}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adviceData)
    });
    if (!response.ok) {
        throw new Error(`Failed to submit form with status: ${response.status}`);
    }
    return response.json();
};

export const updateAdvice = async (id, updates) => {
    const response = await fetch(`${API_BASE_URL_ADVICE}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update advice');
    }
    return response.json();
};

export const getAllAdvices = async (page, categoryQuery, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_ADVICE}/getall?Page=${page}&PageSize=6${categoryQuery}&cultureCode=${cultureCode}`);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const deleteAdvice = async (id) => {
    const response = await fetch(`${API_BASE_URL_ADVICE}/delete?id=${id}`, { method: "DELETE" });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    } if (response.status === 204) {
        return;
    }
    return response.json();
};



