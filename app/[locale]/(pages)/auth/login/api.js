const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_AUTH = 'api/authentication';
const API_ENDPOINT_RESCUER = 'api/rescuer';

export const loginUser = async (email, password) => {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_AUTH}/login`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });
    const userData = await response.json();
    return userData;
};

export const logoutUser = async (setIsDirector) => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('accountId');
    setIsDirector(null);
};

export const getUserById = async (id) => {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_RESCUER}/getbyid?id=${id}`, {
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