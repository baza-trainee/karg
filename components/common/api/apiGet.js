const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getById = async (api_endpoint, id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL}${api_endpoint}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        return {
            error: true,
            status: response.status,
            message: `Failed to fetch: ${response.status} ${response.statusText}`
        };
    }
    return await response.json();
};