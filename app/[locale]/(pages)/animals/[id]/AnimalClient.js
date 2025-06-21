'use client';

import { useEffect, useState } from "react";
import { getById } from "@/components/common/api/apiGet";
import Image from "next/image";
import styles from './animalArticle.module.scss';
import modalStyles from './modalStyles.module.scss';
import variables from '@/app/[locale]/variables.module.scss';
import SocialIcons from "@/components/SocialIcons/socialIcons";
import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import GoBackIcon from "@/components/ServerSideIcon/GoBackIcon";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';
import { LeftIcon, RightIcon } from '@/public/assets/icons/imageCarousel';

const AnimalClient = ({ id, cultureCode, API_BASE_URL, endpoint, translations }) => {

    const [article, setArticle] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const localizedPath = (path) => cultureCode === 'ua' ? path : `/${cultureCode}${path}`;

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const res = await getById(endpoint, id, cultureCode);
                if (res.status === 404) {
                    router.push(cultureCode === "ua" ? `/not-found` : `/en/not-found`);
                    return;
                }
                setArticle(res);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching Article:", err);
                setError(err.message || "Failed to load article");
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id, cultureCode]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!article) return <div className={styles.notFound}>Article not found</div>;

    const handleCarousel = (caseButton) => {
        switch (caseButton) {
            case 'prev':
                setCarouselIndex((carouselIndex - 1 + article.images.length) % article.images.length);
                break;
            case 'next':
                setCarouselIndex((carouselIndex + 1) % article.images.length);
                break;
        }
    };

    const handleRedirect = (route) => {
        router.push(route);
    };

    const handleAdoptionModal = (e, article) => {
        setAdoptionModal(article);
        setAdoptionModalForm({
            ...adoptionModalForm,
            animalName: article.name,
            animalImageUri: `${API_BASE_URL}${article.images[0]}`
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

    const closeAdoptionModal = () => {
        setAdoptionModal(null);
        setAdoptionModalForm({ name: '', phone: '', animalName: '', animalImageUri: '' });
    };

    const closeInfoModal = () => {
        setInfoModal(null);
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

            setInfoModal({ showModal: true, status: true, text: DOCUMENT_TEXT.infoModalSuccess });
        } catch (error) {
            console.error('Error sending telegram message:', error);
            setInfoModal({ showModal: true, status: false, text: DOCUMENT_TEXT.infoModalError });
        }
    };

    return (
        <div className={styles.container}>
            <GoBackButton className={styles.goBackButton}>
                <GoBackIcon />
                <span className={variables.advicesButton_page}>{translations.goBackButtonText}</span>
            </GoBackButton>

            <div className={styles.line}></div>

            <div className={styles.wrapper}>
                <div className={styles.contentHolder}>
                    <div className={styles.imageContainer}>
                        <div className={styles.mainImageContainer}>
                            <button className={styles.leftIcon} onClick={() => handleCarousel('prev')}>
                                <LeftIcon className={styles.leftIcon} />
                            </button>
                            <Image
                                loading="lazy"
                                width={1200}
                                height={1200}
                                className={styles.image}
                                src={`${API_BASE_URL}${article.images[carouselIndex]}`}
                                alt="pet image"
                                quality={100}
                                sizes="
                                (max-width: 768px) 288px, 
                                (max-width: 1400px) 570px, 
                                706px
                            "
                            />
                            <button className={styles.rightIcon} onClick={() => handleCarousel('next')}>
                                <RightIcon className={styles.rightIcon} />
                            </button>
                        </div>
                        <div className={styles.imageCarouselContainer}>
                            {article.images.map((element, index) => {
                                if (index !== carouselIndex) {
                                    return (
                                        <div
                                            key={element}
                                            className={`${styles.imageCarouselWrapper} ${index === carouselIndex ? styles.active : ""}`}
                                            onClick={() => setCarouselIndex(index)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Image
                                                key={element}
                                                loading="lazy"
                                                width={170}
                                                height={171}
                                                className={`${styles.imageCarousel}`}
                                                src={`${API_BASE_URL}${element}`}
                                                alt="pet image"
                                                quality={100}
                                                sizes="
                                (max-width: 768px) 80px, 
                                (max-width: 1400px) 130px, 
                                170px
                            "
                                                style={{
                                                    padding: 5,
                                                    border: index === carouselIndex ? "2px solid #2196f3" : "none",
                                                    opacity: index === carouselIndex ? 1 : 0.7,
                                                    transition: "border 0.2s, opacity 0.2s"
                                                }}
                                            />
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.mainTextWrapper}>
                        <div className={`${variables.Heading3} ${styles.adviceTitle}`}>
                            {article.name}
                        </div>
                    </div>
                    <div className={styles.secondaryTextWrapper}>
                        <div className={`${variables.mobileSubtitle2}`}>
                            Опис:
                        </div>
                        <p className={`${variables.mobileText2}`}>
                            {article.description}
                        </p>
                    </div>
                </div>
                <div className={`${styles.secondaryTextWrapper} ${styles.story}`}>
                    <div className={`${variables.mobileSubtitle2}`}>
                        Історія порятунку:
                    </div>
                    <p className={`${variables.mobileText2}`}>
                        {article.story}
                    </p>
                </div>
                <div className={styles.innerModalButtons}>
                    <button
                        onClick={() => handleRedirect(localizedPath('/help'))}
                        className={`${styles.actionButtonTransparent} ${variables.button1}`}>
                        {translations.actionButtonTransparentText}
                    </button>
                    <button
                        onClick={(e) => handleAdoptionModal(e, article)}
                        className={`${styles.actionButtonBackground} ${variables.button1}`}>
                        {translations.actionButtonBackgroundText}
                    </button>
                </div>

            </div>

            {adoptionModal && (
                <div className={modalStyles.modalContentContainer}>
                    <div className={modalStyles.modalBackground} onClick={closeAdoptionModal}></div>
                    <div className={modalStyles.adoptionModalContainer}>
                        <h3 className={modalStyles.adoptionModalHeading}>
                            {translations.adoptionModalHeadingText}
                        </h3>
                        <form className={modalStyles.adoptionModalForm} id='adoptionModal'>
                            <label htmlFor="name">
                                {translations.adoptionModalFormLabelText}
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder={translations.adoptionModalFormPlaceholderText}
                                className={modalStyles.adoptionModalInput}
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
                                {translations.adoptionModalFormPhoneText}
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder={translations.adoptionModalFormPhonePlaceholderText}
                                className={modalStyles.adoptionModalInput}
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
                            <p className={modalStyles.adoptionModalErrorText}>{adoptionModalError}</p>
                            <p className={modalStyles.adoptionModalText}>
                                {translations.adoptionModalText_text}<br /><span>{adoptionModal.name}</span></p>
                        </form>
                        <div className={modalStyles.adoptionModalButtons}>
                            <input
                                className={`${modalStyles.actionButtonBackground} ${variables.button1}`}
                                type="submit"
                                value={translations.adoptionModalButtonsText}
                                form='adoptionModal'
                                onClick={(e) => handleSendingAdoptionModal(e)}
                            />
                            <button
                                onClick={closeAdoptionModal}
                                className={`${modalStyles.actionButtonTransparent} ${variables.button1}`}
                            >
                                {translations.adoptionModalButtonsCancelText}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {infoModal.showModal && (
                <div className={modalStyles.modalContentContainer}>
                    <div
                        className={modalStyles.modalBackground}
                        onClick={closeInfoModal}></div>
                    <div className={modalStyles.adoptionModalContainer}>
                        <h3 style={{ textAlign: 'center' }} className={variables.mainSubtitle_shared}>
                            {infoModal.text}
                        </h3>
                        <button
                            onClick={closeInfoModal}
                            className={`${modalStyles.actionButtonBackground} ${variables.button1}`}
                        >
                            {translations.returnToPortalButton}
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.shareContainer}>
                <span className={variables.Subtitle3}>{translations.shareText}</span>
                <div className={styles.iconsContainer}>
                    <SocialIcons className={styles.socIcons} shareCurrentPage={true} />
                </div>
            </div>
        </div>
    );
};

export default AnimalClient;