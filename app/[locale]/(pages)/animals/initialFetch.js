import axios from 'axios';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

async function fetchInitialCards() {
    const currentPage = 1;
    try {
        const response = await axios.get(`https://karg-backend.onrender.com/karg/animal/getall?page=${currentPage}&pageSize=6&CategoryFilter=&NameSearch=&cultureCode=en`);
        return response.data.animals || [];
    } catch (error) {
        console.error('Error fetching initial cards:', error);
        return [];
    }
}

export default async function InitialFetch() {
    const initialCards = await fetchInitialCards();

    return (
        <>
            <MultiPageCardItem data={initialCards} buttonVariant={'button'} />
        </>
    );
}