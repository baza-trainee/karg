'use client';

import { useState } from 'react';
import styles from '../../animals/styles/animals.module.scss';
import PaginatedCardList from '@/components/PaginatedCardList/PaginatedCardList';
import { useTranslation } from 'react-i18next';
import SkeletonCards from '@/components/SkeletonCards/SkeletonCards';

const YearResultClient = ({ locale }) => {
    const { t } = useTranslation('common');
    const [isLoading, setIsLoading] = useState(true);

    const handleResults = (count) => {
        return 0;
    };

    return (
        <main className={styles.pageContainer}>
            {isLoading && <SkeletonCards />}
            <PaginatedCardList
                locale={locale}
                endpoint={'api/yearresult'}
                multiPageCardButtonVariant={'link'}
                onResults={handleResults}
                shortVersion={true}
                setIsLoading={setIsLoading} />
        </main>
    );
};

export default YearResultClient;