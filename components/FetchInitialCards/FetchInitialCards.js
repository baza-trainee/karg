import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function FetchInitialCards(locale, endpoint, method, pageSize) {
    const currentPage = 1;
    const cultureCode = locale === 'uk' ? 'ua' : 'en';

    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}/${method}?page=${currentPage}&pageSize=${pageSize}&cultureCode=${cultureCode}`);

        return response.data.items || [];

    } catch (error) {
        console.error('Error fetching initial cards:', error);
        return [];
    }
}