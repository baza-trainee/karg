import PageHero from "@/components/common/PageHero/pageHero";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import initTranslations from "../../../../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "../our_team/ourTeam.module.scss";
import mobImage from "@/public/assets/images/about/ourTeam-page/team-hero-img-mob.jpg";
import tablImage from "@/public/assets/images/about/ourTeam-page/team-hero-img-tabl.jpg";
import deskImage from "@/public/assets/images/about/ourTeam-page/team-hero-img-desk.jpg";
import TeamSection from "./team-section/teamSection";
import Donation from "./donation-block/donation";
import Partners from "./partners/partners";
const i18nNamespaces = ['team', 'common'];

const OurTeam = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const altText = "rescuer holding a cat";
    const buttonText = "Наша команда";

    

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
                <TeamSection />
                <Donation />
                <Partners />
            </main>
            <Footer />
        </TranslationsProvider >
    );
};

export default OurTeam;