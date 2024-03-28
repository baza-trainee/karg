"use client";

import { useTranslation } from 'react-i18next';
import PageHero from "@/components/common/PageHero/pageHero";
import mobImage from "@/public/assets/images/useful/advices/advices-hero-mob.jpg";
import tablImage from "@/public/assets/images/useful/advices/advices-hero-tab.jpg";
import deskImage from "@/public/assets/images/useful/advices/advices-hero-desk.jpg";
import Search from '@/components/common/Search/Search';

const Advices = () => {
    const { t } = useTranslation();

    const altText = "rescue members are smiling";
    const buttonText =  t('advices:pseudoButtonText');

    return (
        <main>
            <PageHero
                mobImage={mobImage.src}
                tablImage={tablImage.src}
                deskImage={deskImage.src}
                buttonText={buttonText}
                altText={altText}
            />
            <Search/>
        </main>
    );
};
export default Advices;