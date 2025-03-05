'use client';

import axios from 'axios';
import styles from './multiPageCardItemGrid.module.scss';
import paginationStyles from './pagination.module.scss';
import variables from '../../app/[locale]/variables.module.scss';
import { MenuBurgerClose } from "@/public/assets/icons";
import { ArrowRight, ArrowLeft } from "@/public/assets/icons";
import { LeftIcon, RightIcon } from '@/public/assets/icons/imageCarousel';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

const MultiPageCardItem = ({ data, buttonVariant, totalPages, onPageChange, currentPage, pageSize }) => {
    const { t } = useTranslation('uniCards');

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [selectedCard, setSelectedCard] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [adoptionModal, setAdoptionModal] = useState(null);
    const [adoptionModalForm, setAdoptionModalForm] = useState({ name: '', phone: '', animalName: '', animalImageUri: '' });
    const [adoptionModalError, setAdoptionModalError] = useState('');

    const router = useRouter();
    const pathname = usePathname();

    const DOCUMENT_TEXT = {
        cardButtonText: t('cardButtonText'),
        cardLinkText: t('cardLinkText'),
        adoptionModalFormText: t('adoptionModalFormText'),
        cardAltText: t('cardAltText'),
        rescueHistoryText: t('rescueHistoryText'),
        actionButtonTransparentText: t('actionButtonTransparentText'),
        actionButtonBackgroundText: t('actionButtonBackgroundText'),
        adoptionModalHeadingText: t('adoptionModalHeadingText'),
        adoptionModalFormLabelText: t('adoptionModalFormLabelText'),
        adoptionModalFormPlaceholderText: t('adoptionModalFormPlaceholderText'),
        adoptionModalFormPhoneText: t('adoptionModalFormPhoneText'),
        adoptionModalFormPhonePlaceholderText: t('adoptionModalFormPhonePlaceholderText'),
        adoptionModalText_text: t('adoptionModalText_text'),
        adoptionModalButtonsText: t('adoptionModalButtonsText'),
        adoptionModalButtonsCancelText: t('adoptionModalButtonsCancelText'),
    };

    function handleClick(e, id) {
        const card = data.find(card => card.id === id);
        setSelectedCard(card);
        setModalPosition({ x: e.clientX, y: e.clientY });
    }

    const closeModal = () => {
        setSelectedCard(null);
    };

    const handleCarousel = (caseButton) => {
        switch (caseButton) {
            case 'prev':
                setCarouselIndex((carouselIndex - 1 + selectedCard.images.length) % selectedCard.images.length);
                break;
            case 'next':
                setCarouselIndex((carouselIndex + 1) % selectedCard.images.length);
                break;
        }
    };

    const handleAdoptionModal = (e, selectedCard) => {
        closeModal();
        setAdoptionModal(selectedCard);
        setModalPosition({ x: e.clientX, y: e.clientY });
        setAdoptionModalForm({
            ...adoptionModalForm,
            animalName: selectedCard.name,
            animalImageUri: `${API_BASE_URL}${selectedCard.images[0]}`
        });
    };

    const closeAdoptionModal = () => {
        setAdoptionModal(null);
    };

    const adoptionModalTelInput = (event) => {
        if (!event.target.value) {
            setAdoptionModalForm({
                ...adoptionModalForm,
                phone: '+38'
            });
        }
    };

    const handleSendingAdoptionModal = (event) => {
        event.preventDefault();

        const phoneRegex = /^\+38\d{10}$/;

        if (adoptionModalForm.name.length === 0) {
            return setAdoptionModalError("Поле ім'я пусте");
        }

        if (!phoneRegex.test(adoptionModalForm.phone)) {
            return setAdoptionModalError("Введено некоректний номер телефону");
        }

        telegramSend();

    };

    const handleRedirect = (route) => {
        router.push(route);
    };

    const renderButton = (id) => {
        switch (buttonVariant) {
            case 'button':
                return (
                    <button className={styles.cardButton} onClick={(e) => handleClick(e, id)}>
                        {DOCUMENT_TEXT.cardButtonText}
                    </button>
                );
            case 'link':
                return (
                    <Link className={styles.cardLink}
                        href={pathname.includes('/useful/results') ? `/useful/results/${id}` : `/useful/advices/${id}`}>
                        {DOCUMENT_TEXT.cardLinkText}{'>'}
                    </Link>
                );
            default:
                null;
        }
    };

    const renderImage = (card) => {
        const imageUrl = `${API_BASE_URL}${card.images[0].slice(1)}`;
        // console.log('Full Image URL:', imageUrl);
        // console.log('API_BASE_URL:', API_BASE_URL);
        // console.log('Image Path:', card.images[0].slice(1));

        return (
            <Image
                src={imageUrl}
                alt={DOCUMENT_TEXT.cardAltText}
                sizes="100vw"
                width={268}
                height={268}
                style={{
                    width: "100%",
                    height: "auto",
                }}
            />
        );
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleSpecificChange = (page) => {
        if (page - 1 < totalPages && page >= 1) {
            onPageChange(page);
        }
    };

    const pageButtons = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (startPage > 1) {
        if (startPage > 2) {
            pageButtons.push(
                <button key="1" className={paginationStyles.pageButton} onClick={() => handleSpecificChange(1)}>
                    1
                </button>
            );
            pageButtons.push(<span key="ellipsis-start" className={paginationStyles.ellipsis}>...</span>);
        } else {
            startPage = 1;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                className={currentPage === i ? paginationStyles.currentPage : paginationStyles.pageButton}
                onClick={() => handleSpecificChange(i)}
                disabled={currentPage === i}
            >
                {i}
            </button>
        );
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageButtons.push(<span key="ellipsis-end" className={paginationStyles.ellipsis}>...</span>);
        }
        pageButtons.push(
            <button key={totalPages} className={paginationStyles.pageButton} onClick={() => handleSpecificChange(totalPages)}>
                {totalPages}
            </button>
        );
    }

    const telegramSend = async () => {

        const data = {
            fullname: adoptionModalForm.name,
            phoneNumber: adoptionModalForm.phone,
            animalName: adoptionModalForm.animalName,
            animalImageUri: adoptionModalForm.animalImageUri
        };

        try {
            const response = await axios.post(`${API_BASE_URL}api/telegrambot/sendannouncement`, data);

        } catch (error) {
            console.error('Error sending telegram message:', error);
        }
    };


    return (
        <div className={styles.container}>
            {data.map(card => (
                <div key={card.id} className={styles.cardContainer}>
                    <div className={styles.cardImage}>
                        {renderImage(card)}
                    </div>
                    <h2 className={`${styles.cardName} ${variables.subtitle2}`}>{card.name || card.title}</h2>
                    <div className={styles.contentHolder}>
                        <p className={styles.cardDesc}>{card.description}</p>
                        {renderButton(card.id)}
                    </div>
                </div>
            ))}

            <div className={paginationStyles.paginationContainer}>
                <div className={paginationStyles.navigationContainer}>
                    <ArrowLeft
                        className={`${paginationStyles.arrowIcon} ${currentPage === 1 ? paginationStyles.disabled : ''}`} />
                    <button onClick={handlePreviousPage}
                        className={paginationStyles.navigationButton}
                        disabled={currentPage === 1}>
                        Попередня
                    </button>
                </div>
                <div className={paginationStyles.pageButtonContainer}>
                    {pageButtons}
                </div>
                <div className={paginationStyles.navigationContainer}>
                    <button onClick={handleNextPage}
                        className={paginationStyles.navigationButton}
                        disabled={currentPage === totalPages}>
                        Наступна
                    </button>
                    <ArrowRight
                        className={`${paginationStyles.arrowIcon} ${currentPage === totalPages ? paginationStyles.disabled : ''}`} />
                </div>
            </div>

            {selectedCard && (
                <div className={styles.modalContentContainer}>
                    <div className={styles.modalBackground} onClick={closeModal}></div>
                    <div className={styles.modalContainer}>
                        <div className={styles.imageContainer}>
                            <button className={styles.leftIcon} onClick={() => handleCarousel('prev')}>
                                <LeftIcon className={styles.leftIcon} />
                            </button>
                            <Image
                                src={`${API_BASE_URL}${selectedCard.images[carouselIndex]}`}
                                alt={DOCUMENT_TEXT.cardAltText}
                                sizes="100vw"
                                width={300}
                                height={359}
                                style={{
                                    height: "359px",
                                }}
                            />
                            <button className={styles.rightIcon} onClick={() => handleCarousel('next')}>
                                <RightIcon className={styles.rightIcon} />
                            </button>
                            <button className={styles.closeButtonContainer} onClick={closeModal}><MenuBurgerClose className={styles.closeButton} />
                            </button>
                        </div>
                        <div className={styles.innerModalContainer}>
                            <h2>{selectedCard.name}</h2>
                            <p>{selectedCard.description}</p>
                            <h3>{selectedCard?.rescueHistory ? DOCUMENT_TEXT.rescueHistoryText : null}</h3>
                            <p>{selectedCard?.rescueHistory ? selectedCard.rescueHistory : null}</p>
                            <div className={styles.innerModalButtons}>
                                <button onClick={() => handleRedirect('/help')} className={styles.actionButtonTransparent}>
                                    {DOCUMENT_TEXT.actionButtonTransparentText}
                                </button>
                                <button onClick={(e) => handleAdoptionModal(e, selectedCard)} className={styles.actionButtonBackground}>
                                    {DOCUMENT_TEXT.actionButtonBackgroundText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {adoptionModal && (
                <div className={styles.modalContentContainer}>
                    <div className={styles.modalBackground} onClick={closeAdoptionModal}></div>
                    <div className={styles.adoptionModalContainer}>
                        <h3 className={styles.adoptionModalHeading}>
                            {DOCUMENT_TEXT.adoptionModalHeadingText}
                        </h3>
                        <form className={styles.adoptionModalForm} id='adoptionModal'>
                            <label htmlFor="name">
                                {DOCUMENT_TEXT.adoptionModalFormLabelText}
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder={DOCUMENT_TEXT.adoptionModalFormPlaceholderText}
                                className={styles.adoptionModalInput}
                                onChange={(e) => {
                                    setAdoptionModalForm(
                                        {
                                            ...adoptionModalForm,
                                            name: e.target.value
                                        }
                                    );
                                }}
                            />
                            <label htmlFor="phone">
                                {DOCUMENT_TEXT.adoptionModalFormPhoneText}
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder={DOCUMENT_TEXT.adoptionModalFormPhonePlaceholderText}
                                className={styles.adoptionModalInput}
                                value={adoptionModalForm.phone}
                                onFocus={(e) => adoptionModalTelInput(e)}
                                onChange={(e) => {
                                    setAdoptionModalForm(
                                        {
                                            ...adoptionModalForm,
                                            phone: e.target.value
                                        }
                                    );
                                }}
                            />
                            <p className={styles.adoptionModalErrorText}>{adoptionModalError}</p>
                            <p className={styles.adoptionModalText}>
                                {DOCUMENT_TEXT.adoptionModalText_text}<br /><span>{adoptionModal.name}</span></p>
                        </form>
                        <div className={styles.adoptionModalButtons}>
                            <input
                                className={styles.actionButtonBackground}
                                type="submit"
                                value={DOCUMENT_TEXT.adoptionModalButtonsText}
                                form='adoptionModal'
                                onClick={(e) => handleSendingAdoptionModal(e)}
                            />
                            <button
                                onClick={closeAdoptionModal}
                                className={styles.actionButtonTransparent}
                            >
                                {DOCUMENT_TEXT.adoptionModalButtonsCancelText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiPageCardItem;