"use client";

import axios from 'axios';
import Button from "@/components/Button/button";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import styles from "../partners/styles/partners.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
// import { fetchPartners } from "./../../../dashboard/Partner/api/utilsFetchPartnerData";
import Spinner from "@/components/Spinner/Spinner";

const Partners = () => {
    const [visibleLogosCount, setVisibleLogosCount] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenButtonVisible, setOpenButtonVisible] = useState(true);
    const [partners, setPartners] = useState([]);
    const { t } = useTranslation();
    const openText = t('common:buttonOpenText');
    const closeText = t('common:buttonCloseText');
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // const getPartners = async () => {
    //     setIsLoading(true);
    //     try {
    //         const data = await fetchPartners(setPartners);
    //         return data;
    //     } catch (error) {
    //         throw error;
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     const partnersData = getPartners();
    //     setPartners(partnersData);
    // }, []);

    const fetchPartners = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}api/partner/getall?page=1&pageSize=18&CategoryFilter=&NameSearch=&cultureCode=ua`);
            setPartners(response.data.items);
        } catch (error) {
            console.error("Error fetching partners:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);


    const handleOpenClick = () => {
        setVisibleLogosCount(partners.length);
        setOpenButtonVisible(false);
    };

    const handleCloseClick = () => {
        setVisibleLogosCount(4);
        setOpenButtonVisible(true);
    };

    const handleLogoClick = (partner) => {
        window.open(partner.uri, '_blank', 'noopener,noreferrer');
    };

    const processedPhotoSrc = (images) => {
        if (!Array.isArray(images) && images.length === 0) {
            return null;
        }
        return images[0]?.startsWith('http') ? images[0] : `${API_URL}${images[0]}`;
    };

    return (
        isLoading ? (
            <Spinner />
        ) : (
            <>
                <div className={styles.container}>
                    <div className={`${styles.title} ${variables.mainSubtitle_shared}`}>{t('partnersTitle')}</div>
                    <div className={styles.partners}>
                        {Array.isArray(partners) && partners.length > 0 && (
                            partners.slice(0, visibleLogosCount).map((partner, index) => (
                                (processedPhotoSrc ? (
                                    <img onClick={() => handleLogoClick(partner)}
                                        key={index}
                                        src={processedPhotoSrc(partner.images)}
                                        alt={partner.name}
                                        width={92}
                                        height={92}
                                        loading="lazy"
                                        className={styles.partnerLogo}
                                    />
                                ) : (
                                    <div className={styles.partnerLogoPlaceholder} aria-hidden="true"></div>
                                ))
                            ))
                        )}
                    </div>
                    <Button
                        className={stylesBtn.seeAllbtn}
                        onClick={isOpenButtonVisible ? handleOpenClick : handleCloseClick}
                    >
                        {isOpenButtonVisible ? openText : closeText}
                    </Button>
                </div>
            </>
        )
    );
};
export default Partners;