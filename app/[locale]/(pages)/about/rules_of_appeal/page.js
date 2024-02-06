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

const i18nNamespaces = ['rules', 'common'];

const RulesOfAppeal = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const altText = "Rescuers near the man";
    const buttonText = "Правила звернення";
    const title = "Виникли питання?";
    const subtitle = "Перш ніж звертатися до нас, можете ознайомитись та знайти відповіді на поширені запитання.";
    const buttonCaption = "Питання та відповіді";
    const route = "/useful";

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <Header />
            <div>
                <PageHero
                    mobImage={mobImage.src}
                    tablImage={tablImage.src}
                    deskImage={deskImage.src}
                    buttonText={buttonText}
                    altText={altText} />
                <Rules />
                <NeedInfo
                    title={title}
                    subtitle={subtitle}
                    route={route}
                    buttonCaption={buttonCaption}
                />
            </div>
            <Footer />
        </TranslationsProvider >
    );
};

export default RulesOfAppeal;