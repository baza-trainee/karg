"use client"

import logos from "./logo_components/logoIndex";
import Button from "@/components/Button/button";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import styles from "../partners/styles/partners.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const partners = Object.values(logos);

const Partners = () => {
    const [visibleLogosCount, setVisibleLogosCount] = useState(4);
    const [isOpenButtonVisible, setOpenButtonVisible] = useState(true);
    const { t } = useTranslation();
    const openText = t('common:buttonOpenText');
    const closeText = t('common:buttonCloseText');

    const handleOpenClick = () => {
        setVisibleLogosCount(partners.length);
        setOpenButtonVisible(false);
    }

    const handleCloseClick = () => {
        setVisibleLogosCount(4);
        setOpenButtonVisible(true);
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.title} ${variables.subtitle1}`}>{t('partnersTitle')}</div>
            <div className={styles.partners}>
                {partners.slice(0, visibleLogosCount).map((PartnerLogo, index) =>
                    <PartnerLogo key={index} className={styles.partnerLogo} />
                )}
            </div>
            <Button
                className={stylesBtn.seeAllbtn}
                onClick={isOpenButtonVisible ? handleOpenClick : handleCloseClick}
            >
                {isOpenButtonVisible ? openText : closeText}
            </Button>
        </div>
    );
}
export default Partners;