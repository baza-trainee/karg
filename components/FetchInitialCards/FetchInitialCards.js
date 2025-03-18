const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const FetchInitialCards = async (locale, api, method, pageSize, page, searchTerm = '', category = '', shortVersion = '') => {
    locale = locale === 'uk' ? 'ua' : 'en';
    let url = `${API_BASE_URL}${api}/${method}?page=${page}&pageSize=${pageSize}&cultureCode=${locale}`;
    if (searchTerm) {
        url += `&nameSearch=${searchTerm}`;
    }
    if (category) {
        url += `&categoryFilter=${category}`;
    }
    if (shortVersion) {
        url += `&shortVersion=true`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching initial cards:", error);
        throw error;
    }
};

export default FetchInitialCards;