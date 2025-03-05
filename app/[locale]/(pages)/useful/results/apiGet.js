const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ENDPOINT_YEARRESULT = 'api/yearresult';

export const getYearresultById = async (id, cultureCode) => {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT_YEARRESULT}/getbyid?id=${id}&cultureCode=${cultureCode}`, {
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