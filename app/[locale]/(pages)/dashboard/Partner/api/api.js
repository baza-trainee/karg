const API_BASE_URL_PARTNER = 'https://karg-backend.onrender.com/karg/partner';
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGdWxsbmFtZSI6IkFkbWluIEtBUkciLCJSb2xlIjoiRGlyZWN0b3IiLCJFbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MzMyNTYxODA4OTEsImlzcyI6ImthcmcuY29tIiwiYXVkIjoia2FyZy5jb20ifQ.2RcVCXa9B_xS3zBEBTEAFsEyfS0DIpyWQtIBxs3IabM";

export const getAllPartners = async () => {
    const response = await fetch(`${API_BASE_URL_PARTNER}/getall`, {
        headers: {
            'Authorization': AUTH_TOKEN
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
}

export const addPartner = async (partnerData) => {
    const response = await fetch(`${API_BASE_URL_PARTNER}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': AUTH_TOKEN
        },
        body: JSON.stringify(partnerData)
    });
    if (!response.ok) {
        throw new Error(`Failed to submit form with status: ${response.status}`);
    }
    return response.json();
};

export const updatePartner = async (id, updates) => {
    const response = await fetch(`${API_BASE_URL_PARTNER}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": AUTH_TOKEN
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update partner');
    }
    return response.json();
};


export const deletePartnerApi = async (id) => {
    const response = await fetch(`${API_BASE_URL_PARTNER}/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': AUTH_TOKEN
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
    const response = await fetch(`${API_BASE_URL_PARTNER}/getbyid?id=${id}`, {
        headers: {
            'Authorization': AUTH_TOKEN
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    return response.json();
};
