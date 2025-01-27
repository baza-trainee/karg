'use client';
// styles
import styles from './multiPageCardItemGrid.module.scss';
import variables from '../../app/[locale]/variables.module.scss';
import { MenuBurgerClose } from "@/public/assets/icons";
import { LeftIcon, RightIcon } from '@/public/assets/icons/imageCarousel';
// components
import Image from "next/image";
import Link from 'next/link';
// hooks
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MultiPageCardItem = ({ data, buttonVariant }) => {
    const { t } = useTranslation('uniCards');

    const [selectedCard, setSelectedCard] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [adoptionModal, setAdoptionModal] = useState(null);
    const [adoptionModalForm, setAdoptionModalForm] = useState({ name: '', phone: '' });
    const [adoptionModalError, setAdoptionModalError] = useState('');

    const router = useRouter();

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
        // console.log(selectedCard.images);
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
        // console.log(selectedCard);
        closeModal();
        setAdoptionModal(selectedCard);
        setModalPosition({ x: e.clientX, y: e.clientY });
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
        } else {
            console.log('name good');
        }

        if (!phoneRegex.test(adoptionModalForm.phone)) {
            return setAdoptionModalError("Введено некоректний номер телефону");
        } else {
            console.log('phone good');
        }


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
                    <Link className={styles.cardLink} href={`/useful/advices/${id}`}>
                        {DOCUMENT_TEXT.cardLinkText}{'>'}
                    </Link>
                );
            default:
                null;
        }
    };

    const getImageSource = (image) => {
        const isBase64 = (str) => {
            try {
                return btoa(atob(str)) === str;
            } catch (err) {
                return false;
            }
        };

        return isBase64(image)
            ? `data:image/png;base64,${image}`
            : image;
    };

    return (
        <div className={styles.container}>
            {data.map(card => (

                <div key={card.id} className={styles.cardContainer}>
                    <div className={styles.cardImage}>
                        <Image
                            // src={card.images[0]}
                            // src={`data:image/png;base64,${card.images[0]}`}
                            src={getImageSource(card.images[0])}
                            alt={DOCUMENT_TEXT.cardAltText}
                            sizes="100vw"
                            width={268}
                            height={268}
                            style={{
                                width: "100%",
                                height: "auto",
                            }}

                        />

                    </div>
                    <h2 className={`${styles.cardName} ${variables.subtitle2}`}>{card.name || card.title}</h2>
                    <div className={styles.contentHolder}>
                        <p className={styles.cardDesc}>{card.description}</p>
                        {renderButton(card.id)}
                    </div>
                </div>

            ))}

            {selectedCard && (
                <div className={styles.modalContentContainer}>
                    <div className={styles.modalBackground} onClick={closeModal}></div>

                    <div
                        className={styles.modalContainer}
                    // style={{ top: modalPosition.y }}
                    >
                        <div className={styles.imageContainer}>
                            <button className={styles.leftIcon} onClick={() => handleCarousel('prev')}>
                                <LeftIcon className={styles.leftIcon} />
                            </button>
                            <Image
                                // src={selectedCard.images[carouselIndex]}
                                // src={`data:image/png;base64,${selectedCard.images[carouselIndex]}`}
                                src={getImageSource(selectedCard.images[carouselIndex])}
                                alt={DOCUMENT_TEXT.cardAltText}
                                sizes="100vw"
                                width={300}
                                height={359}
                                style={{
                                    // width: "100%",
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
                                <button className={styles.actionButtonTransparent}>
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