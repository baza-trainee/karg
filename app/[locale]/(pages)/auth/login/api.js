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
    await fetch(`${API_BASE_URL}/authentication/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });
    const userData = await response.json();
    localStorage.removeItem('auth-token');
    return userData.token;
};