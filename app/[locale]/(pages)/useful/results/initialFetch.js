import FetchInitialCards from '@/components/FetchInitialCards/FetchInitialCards';
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';



export default async function InitialFetch({ locale }) {
    const initialCards = await FetchInitialCards(locale, 'yearresult', 'getall', 6);

    return (
        <>
            <MultiPageCardItem data={initialCards} buttonVariant={'link'} />
        </>
    );
}