import { resetRoleFetched } from '@/app/adminProvider';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_AUTH = 'api/authentication';

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_AUTH}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return {
            httpStatus: response.status,
            data,
        };
    } catch (error) {
        console.error('Error logging in:', error);
        return {
            httpStatus:0,
            data: {
                status: 0,
                message: null,
            }
        };
    }
};

export const logoutUser = async (...args) => {
    let setIsDirector, setAccountId, setActiveSection, setActiveHelpSection;
    if (args.length === 1 && typeof args[0] === 'object') {
        ({ setIsDirector, setAccountId, setActiveSection, setActiveHelpSection } = args[0]);
    } else {
        [setIsDirector, setAccountId, setActiveSection, setActiveHelpSection] = args;
    }
    localStorage.removeItem('auth-token');
    localStorage.removeItem('accountId');
    localStorage.removeItem('activeSection');
    localStorage.removeItem('activeHelpSection');

    setIsDirector(null);
    setAccountId('');
    setActiveSection('');
    setActiveHelpSection('');

    resetRoleFetched();
};