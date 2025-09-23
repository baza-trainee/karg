'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

import Image from "next/image";
import Link from 'next/link';

import Pagination from './pagination';

import styles from './multiPageCardItemGrid.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const arePropsEqual = (prevProps, nextProps) => {

    return prevProps.data === nextProps.data &&
        prevProps.currentPage === nextProps.currentPage;
};

const MultiPageCardItem = React.memo(({ data, buttonVariant, totalPages, onPageChange, currentPage }) => {
    const { t } = useTranslation('uniCards');

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const pathname = usePathname();

    const DOCUMENT_TEXT = {
        cardButtonText: t('cardButtonText'),
        cardLinkText: t('cardLinkText'),
        adoptionModalFormText: t('adoptionModalFormText'),
        cardAltText: t('cardAltText'),
    };

    const renderButton = (id) => {
        switch (buttonVariant) {
            case 'button':
                return (
                    <Link className={`${styles.cardButton} ${variables.button1}`}
                        href={`${pathname.startsWith('/en') ? '/en' : ''}/animals/${id}`}>
                        {DOCUMENT_TEXT.cardButtonText}
                    </Link>
                );
            case 'link':
                return (
                    <Link className={`${styles.cardLink} ${variables.button1}`}
                        href={`${pathname.startsWith('/en') ? '/en' : ''}${pathname.includes('/useful/stats') ? `/useful/stats/${id}` : `/useful/advices/${id}`}`}>
                        {DOCUMENT_TEXT.cardLinkText}{'>'}
                    </Link>
                );
            default:
                null;
        }
    };

    const renderImage = (card) => {
        const imageUrl = `${API_BASE_URL}${card.images[0].slice(1)}`;

        return (
            <Image
                src={imageUrl}
                alt={DOCUMENT_TEXT.cardAltText}
                sizes="(max-width: 768px) 311px, (max-width: 1200px) 343px, 370px"
                width={268}
                height={268}
                // loading="lazy"
                priority={true}
            />
        );
    };

    return (
        <div id="card-list" className={styles.outerContainer}>
            <div className={styles.container}>
                {data.map(card => (
                    <div key={card.id} className={styles.cardContainer}>
                        <div className={styles.cardImage}>
                            {renderImage(card)}
                        </div>
                        <h2 className={`${styles.cardName} ${variables.font20w700}`}>{card.name || card.title}</h2>
                        <div className={styles.contentHolder}>
                            {/* <div className={styles.cardDesc}>
                                {card.description.split('\n').map((paragraph, i) => (
                                    <p className={styles.cardP} key={i}>{paragraph}</p>
                                ))}
                            </div> */}
                            <div className={styles.cardDesc}>
                                {card.description}
                            </div>
                            {renderButton(card.id)}
                        </div>
                    </div>
                ))}

            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}, arePropsEqual);

export default MultiPageCardItem;