const API_BASE_URL = 'https://karg-backend.onrender.com/karg';

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/authentication/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const userData = await response.json();
    return userData;
};

export const logoutUser = async () => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}/authentication/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });
    const userData = await response.json();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('accountId');
    return userData.token;
};

export const getUserById = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}/rescuer/getbyid?id=${id}`, {
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