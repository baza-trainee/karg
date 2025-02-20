import axios from 'axios';

export default async function FetchInitialCards(locale, endpoint, method) {
    const BASE_URL = 'https://karg-backend.onrender.com/api';
    const currentPage = 1;
    const cultureCode = locale === 'uk' ? 'ua' : 'en';

    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}/${method}?page=${currentPage}&pageSize=6&cultureCode=${cultureCode}`);

        switch (endpoint) {
            case "advice":
                return response.data.advices || [];

            case "animal":
                return response.data.animals || [];

            case "yearresult":
                return response.data.yearsResults || [];
        }

    } catch (error) {
        console.error('Error fetching initial cards:', error);
        return [];
    }
}