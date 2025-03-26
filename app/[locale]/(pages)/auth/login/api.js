import { resetRoleFetched } from '@/app/adminProvider';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_AUTH = 'api/authentication';

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_AUTH}/login`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const userData = await response.json();
    return userData;
};

export const logoutUser = async (setIsDirector, setAccountId, setActiveSection) => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('accountId');
    localStorage.removeItem('activeSection');

    setIsDirector(null);
    setAccountId('');
    setActiveSection('');
    resetRoleFetched();
};