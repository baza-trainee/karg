"use client"

import Logo1 from "@/public/assets/icons/our-team/partner1.svg";
import Logo2 from "@/public/assets/icons/our-team/partner2.svg";
import Logo3 from "@/public/assets/icons/our-team/partner3.svg";
import Logo4 from "@/public/assets/icons/our-team/partner4.svg";
import Logo5 from "@/public/assets/icons/our-team/partner5.svg";
import Logo6 from "@/public/assets/icons/our-team/partner6.svg";
import Logo7 from "@/public/assets/icons/our-team/partner7.svg";
import Logo8 from "@/public/assets/icons/our-team/partner8.svg";
import Button from "@/components/Button/button";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import styles from "../partners/styles/partners.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import { useState } from "react";

const partners = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8];
const openText = "Дивитись усі";
const closeText = "Згорнути";

const Partners = () => {
    const [visibleLogosCount, setVisibleLogosCount] = useState(4);
    const [isOpenButtonVisible, setOpenButtonVisible] = useState(true);

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
            <div className={`${styles.title} ${variables.subtitle1}`}>Партнери</div>
            <div className={styles.partners}>
                {partners.slice(0, visibleLogosCount).map((PartnerLogo, index) =>
                    <div key={index}>
                        <PartnerLogo className={styles.partnerLogo} />
                    </div>
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