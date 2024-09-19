const API_BASE_URL_FAQ = 'https://karg-backend.onrender.com/karg/faq';

export const getFAQById = async (id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_FAQ}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
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

export const addFAQItem = async (faqItemData) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_FAQ}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(faqItemData)
    });
    if (!response.ok) {
        throw new Error(`Failed to submit form with status: ${response.status}`);
    }
    return response.json();
};

export const updateFAQItem = async (id, updates) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_FAQ}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        throw new Error('Failed to update faq');
    }
    return response.json();
};

export const getAllFAQ = async (page, cultureCode) => {
    const response = await fetch(`${API_BASE_URL_FAQ}/getall?cultureCode=${cultureCode}`, {
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

export const deleteFAQ = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL_FAQ}/delete?id=${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    if (response.status === 204) {
        return;
    }
    return response.json();
};



