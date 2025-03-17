'use client';

import axios from 'axios';
import styles from './multiPageCardItemGrid.module.scss';
import variables from '../../app/[locale]/variables.module.scss';
import { MenuBurgerClose } from "@/public/assets/icons";
import { LeftIcon, RightIcon } from '@/public/assets/icons/imageCarousel';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Pagination from './pagination';

const MultiPageCardItem = ({ data, buttonVariant, totalPages, onPageChange, currentPage }) => {
    const { t } = useTranslation('uniCards');

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [selectedCard, setSelectedCard] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [adoptionModal, setAdoptionModal] = useState(null);
    const [adoptionModalForm, setAdoptionModalForm] = useState(
        { name: '', phone: '', animalName: '', animalImageUri: '' }
    );
    const [adoptionModalError, setAdoptionModalError] = useState('');
    const [infoModal, setInfoModal] = useState(
        { showModal: false, status: false, text: '' }
    );

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
        infoModalSuccess: t('infoModalSuccess'),
        infoModalError: t('infoModalError'),
        returnToPortalButton: t('returnToPortalButton')
    };

    function handleClick(e, id) {
        const card = data.find(card => card.id === id);
        setSelectedCard(card);
        setModalPosition({ x: e.clientX, y: e.clientY });
    }

    const closeModal = () => {
        setSelectedCard(null);
    };

    const closeAdoptionModal = () => {
        setAdoptionModal(null);
    };

    const closeInfoModal = () => {
        setInfoModal({ showModal: false, status: false, text: '' });
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
        closeAdoptionModal();
        telegramSend();
        setAdoptionModalForm({ name: '', phone: '', animalName: '', animalImageUri: '' });
    };

    const handleRedirect = (route) => {
        router.push(route);
    };

    const renderButton = (id) => {
        switch (buttonVariant) {
            case 'button':
                return (
                    <button className={`${styles.cardButton} ${variables.button1}`} onClick={(e) => handleClick(e, id)}>
                        {DOCUMENT_TEXT.cardButtonText}
                    </button>
                );
            case 'link':
                return (
                    <Link className={`${styles.cardLink} ${variables.button1}`}
                        href={`${pathname.startsWith('/en') ? '/en' : ''}${pathname.includes('/useful/results') ? `/useful/results/${id}` : `/useful/advices/${id}`}`}>
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
                sizes="100vw"
                width={268}
                height={268}
                // loading="lazy"
                priority={true}
            />
        );
    };

    const telegramSend = async () => {

        const data = {
            fullname: adoptionModalForm.name,
            phoneNumber: adoptionModalForm.phone,
            animalName: adoptionModalForm.animalName,
            animalImageUri: adoptionModalForm.animalImageUri
        };

        try {
            const response = await axios.post(`${API_BASE_URL}api/telegrambot/sendannouncement`, data);
            console.log(response.status);
            console.log(response.data);

            setInfoModal({ showModal: true, status: true, text: DOCUMENT_TEXT.infoModalSuccess });
        } catch (error) {
            console.error('Error sending telegram message:', error);
            setInfoModal({ showModal: true, status: false, text: DOCUMENT_TEXT.infoModalError });
        }
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
                            <p className={styles.cardDesc}>{card.description}</p>
                            {renderButton(card.id)}
                        </div>
                    </div>
                ))}

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
                                    width={268}
                                    height={268}
                                    loading="lazy"
                                />
                                <button className={styles.rightIcon} onClick={() => handleCarousel('next')}>
                                    <RightIcon className={styles.rightIcon} />
                                </button>
                                <button
                                    className={styles.closeButtonContainer}
                                    onClick={closeModal}><MenuBurgerClose
                                        className={styles.closeButton} />
                                </button>
                            </div>
                            <div className={styles.innerModalDesktopContainer}>
                                <div className={styles.innerModalDesktopNameContainer}>
                                    <h2>{selectedCard.name}</h2>
                                    <button
                                        className={styles.closeButtonContainer}
                                        onClick={closeModal}>
                                        <MenuBurgerClose
                                            className={styles.closeButton} />
                                    </button>
                                </div>
                                <p>{selectedCard.description}</p>
                                <div className={styles.innerModalButtons}>
                                    <button
                                        onClick={() => handleRedirect('/help')}
                                        className={`${styles.actionButtonTransparent} ${variables.button1}`}>
                                        {DOCUMENT_TEXT.actionButtonTransparentText}
                                    </button>
                                    <button
                                        onClick={(e) => handleAdoptionModal(e, selectedCard)}
                                        className={`${styles.actionButtonBackground} ${variables.button1}`}>
                                        {DOCUMENT_TEXT.actionButtonBackgroundText}
                                    </button>
                                </div>
                            </div>
                            <div className={styles.innerModalDesktopHistoryContainer}>
                                <h3 className={variables.subtitle2}>{selectedCard?.story ? DOCUMENT_TEXT.rescueHistoryText : null}</h3>
                                <p>{selectedCard?.story ? selectedCard.story : null}</p>
                            </div>
                            <div className={styles.innerModalContainer}>
                                <h2 className={variables.button1}>{selectedCard.name}</h2>
                                <p>{selectedCard.description}</p>
                                <h3 className={variables.button1}>{selectedCard?.story ? DOCUMENT_TEXT.rescueHistoryText : null}</h3>
                                <p>{selectedCard?.story ? selectedCard.story : null}</p>
                                <div className={styles.innerModalButtons}>
                                    <button
                                        onClick={() => handleRedirect('/help')}
                                        className={`${styles.actionButtonTransparent} ${variables.button1}`}>
                                        {DOCUMENT_TEXT.actionButtonTransparentText}
                                    </button>
                                    <button
                                        onClick={(e) => handleAdoptionModal(e, selectedCard)}
                                        className={`${styles.actionButtonBackground}`}>
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
                                    autoComplete='off'
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
                                    autoComplete='off'
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
                                    className={`${styles.actionButtonBackground} ${variables.button1}`}
                                    type="submit"
                                    value={DOCUMENT_TEXT.adoptionModalButtonsText}
                                    form='adoptionModal'
                                    onClick={(e) => handleSendingAdoptionModal(e)}
                                />
                                <button
                                    onClick={closeAdoptionModal}
                                    className={`${styles.actionButtonTransparent} ${variables.button1}`}
                                >
                                    {DOCUMENT_TEXT.adoptionModalButtonsCancelText}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {infoModal.showModal && (
                    <div className={styles.modalContentContainer}>
                        <div
                            className={styles.modalBackground}
                            onClick={closeInfoModal}></div>
                        <div className={styles.adoptionModalContainer}>
                            <h3 style={{ textAlign: 'center' }} className={variables.mainSubtitle_shared}>
                                {infoModal.text}
                            </h3>
                            <button
                                onClick={closeInfoModal}
                                className={`${styles.actionButtonBackground} ${variables.button1}`}
                            >
                                {DOCUMENT_TEXT.returnToPortalButton}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default MultiPageCardItem;