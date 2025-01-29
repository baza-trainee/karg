import fetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';



export default async function InitialFetch({ locale }) {
    const initialCards = await fetchInitialCards(locale, 'advice', 'getall');

    return (
        <>
            <MultiPageCardItem data={initialCards} buttonVariant={'link'} />
        </>
    );
}