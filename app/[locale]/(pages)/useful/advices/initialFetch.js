import axios from 'axios';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

async function fetchInitialCards(locale) {
    const currentPage = 1;
    const cultureCode = locale === 'uk' ? 'ua' : 'en';
    // console.log('Current locale:', locale);

    try {
        const response = await axios.get(`https://karg-backend-rkb4.onrender.com/karg/advice/getall?page=${currentPage}&pageSize=6&cultureCode=${cultureCode}`);

        return response.data.advices || [];
    } catch (error) {
        console.error('Error fetching initial cards:', error);
        return [];
    }
}

export default async function InitialFetch({ locale }) {
    const initialCards = await fetchInitialCards(locale);

    return (
        <>
            <MultiPageCardItem data={initialCards} buttonVariant={'link'} />
        </>
    );
}