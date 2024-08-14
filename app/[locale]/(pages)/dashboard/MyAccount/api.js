const API_BASE_URL_RESCUER = 'https://karg-backend.onrender.com/karg/rescuer';

export const getRescuerById = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_RESCUER}/getbyid?id=${id}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const updateRescuerInfo = async (id, updates) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_RESCUER}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update rescuer info');
    }
    return response.json();
};

