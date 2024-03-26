import initTranslations from "../../../../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "../rules_of_appeal/styles/rulesOfAppeal.module.scss";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from "@/components/common/PageHero/pageHero";
import mobImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-mob.jpg";
import tablImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-tabl.jpg";
import deskImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-desk.jpg";
import NeedInfo from "@/components/common/NeedInfo/needInfo";
import Rules from "./rules/rules";
import RescueTypes from "@/components/RescueTypes/RescueTypes";
import variables from "@/app/[locale]/variables.module.scss";

const i18nNamespaces = ['rulesOfAppeal', 'common'];

const RulesOfAppeal = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const altText = "Rescuers near the man";
    const buttonText = t('pseudoButtonText');
    const title = t('common:needInfoTitle');
    const subtitle = t('common:needInfoSubtitle');
    const buttonCaption = t('common:buttonQuestion');
    const route = "/useful/faq";

    const rescueTypes = [
        { cardMessage: t('common:rescueTypes1'), id: 1 },
        { cardMessage: t('common:rescueTypes2'), id: 2 },
        { cardMessage: t('common:rescueTypes3'), id: 3 },
        { cardMessage: t('common:rescueTypes4'), id: 4 },
        { cardMessage: t('common:rescueTypes5'), id: 5 },
        { cardMessage: t('common:rescueTypes6'), id: 6 },
        { cardMessage: t('common:rescueTypes7'), id: 7 },
    ];

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <Header />
            <main>
                <PageHero
                    mobImage={mobImage.src}
                    tablImage={tablImage.src}
                    deskImage={deskImage.src}
                    buttonText={buttonText}
                    altText={altText} />
                <Rules locale={locale} namespaces={i18nNamespaces} />
                <RescueTypes locale={locale} namespaces={i18nNamespaces} rescueTypes={rescueTypes} isButtonAsLink={false} />
                <div className={`${styles.article} ${variables.text4}`}>
                    <p>{t('articleFirstPar')}</p>
                    <p>{t('articleSecondPar')}</p>
                </div>
                <NeedInfo
                    title={title}
                    subtitle={subtitle}
                    route={route}
                    buttonCaption={buttonCaption}
                />
            </main>
            <Footer />
        </TranslationsProvider >
    );
};

export default RulesOfAppeal;