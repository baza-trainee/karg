"use client"

import Button from "@/components/Button/button";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import styles from "../partners/styles/partners.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { fetchPartners } from "./../../../dashboard/Partner/api/utilsFetchPartnerData";
import Spinner from "@/components/Spinner/Spinner";

const Partners = () => {
    const [visibleLogosCount, setVisibleLogosCount] = useState(4);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenButtonVisible, setOpenButtonVisible] = useState(true);
    const [partners, setPartners] = useState([]);
    const { t } = useTranslation();
    const openText = t('common:buttonOpenText');
    const closeText = t('common:buttonCloseText');

    const getPartners = async () => {
        setIsLoading(true);
        try {
            const data = await fetchPartners(setPartners);
            return data;
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const partnersData = getPartners();
        setPartners(partnersData);
    }, []);

    const handleOpenClick = () => {
        setVisibleLogosCount(partners.length);
        setOpenButtonVisible(false);
    }

    const handleCloseClick = () => {
        setVisibleLogosCount(4);
        setOpenButtonVisible(true);
    }

    const handleLogoClick = (partner) => {
        window.open(partner.uri, '_blank', 'noopener,noreferrer');
    }

    return (
        isLoading ? (
            <Spinner />
        ) : (
            <>
                <div className={styles.container}>
                    <div className={`${styles.title} ${variables.subtitle1}`}>{t('partnersTitle')}</div>
                    <div className={styles.partners}>
                        {Array.isArray(partners) && partners.length > 0 && (
                            partners.slice(0, visibleLogosCount).map((partner, index) => (
                                <img
                                    key={index}
                                    src={partner.images[0]}
                                    alt={partner.name}
                                    className={styles.partnerLogo}
                                    onClick={() => handleLogoClick(partner)}
                                />
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
}
export default Partners;