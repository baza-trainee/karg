const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_CONTACT = 'api/contact';

export const getContactById = async (id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};

export const addContactItem = async (contactItemData) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(contactItemData)
    });
    if (!response.ok) {
        console.log(`Failed to submit form with status: ${response.status}`);

    }
    return response.json();
};

export const updateContactItem = async (id, updates) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        console.log('Failed to update contact item');
    }
    return response.json();
};

export const getAllContacts = async (page, cultureCode) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/getall?Page=${page}&PageSize=10&cultureCode=${cultureCode}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.log('Failed to fetch');
    }
    return response.json();
};

export const deleteContact = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_CONTACT}/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
    });
    if (!response.ok) {
        console.log('Failed to fetch');
    }
    if (response.status === 204) {
        return;
    }
    return response.json();
};



