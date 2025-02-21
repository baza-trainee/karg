const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// console.log('API_BASE_URL:', API_BASE_URL);
const API_ENDPOINT_FAQ = '/api/faq';

export const getFAQById = async (id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
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
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/add`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(faqItemData)
    });
    if (!response.ok) {
        console.log(`Failed to submit form with status: ${response.status}`);;

    }
    return response.json();
};

export const updateFAQItem = async (id, updates) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/update?id=${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updates)
    });
    if (!response.ok) {
        console.log('Failed to update faq');
    }
    return response.json();
};

export const getAllFAQ = async (page, cultureCode) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/getall?cultureCode=${cultureCode}`, {
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

export const deleteFAQ = async (id) => {
    const authToken = localStorage.getItem('auth-token');
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_FAQ}/delete?id=${id}`, {
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



