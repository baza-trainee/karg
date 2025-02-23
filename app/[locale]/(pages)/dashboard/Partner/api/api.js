const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_PARTNER = 'api/partner';

export const getAllPartners = async (page) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/getall?Page=${page}&PageSize=6`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
}

export const addPartner = async (partnerData) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(partnerData)
    });
    if (!response.ok) {
        throw new Error(`Failed to submit form with status: ${response.status}`);
    }
    return response.json();
};

export const updatePartner = async (id, updates) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update partner');
    }
    return response.json();
};

export const deletePartnerApi = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    } if (response.status === 204) {
        return;
    }
    return response.json();
}

export const getPartnerById = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_PARTNER}/getbyid?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};
