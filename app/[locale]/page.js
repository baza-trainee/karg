import HeroSection from "@/components/Hero/hero-section";
import QuickAccessMenu from "@/components/QuickAccessMenu/QuickAccessMenu";
import LanguageMenu from '@/components/LanguageMenu/LanguageMenu';
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "./styles/main.module.scss";
import MissionSection from "@/components/Mission/mission-section";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import Achievements from "@/components/Achievements/Achievements";
import RescueTypes from "@/components/RescueTypes/RescueTypes";

const i18nNamespaces = ['home', 'common'];

export default async function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <div className={styles.main}>
        <Header />
        <LanguageMenu />
        <HeroSection />
        <QuickAccessMenu />
        <MissionSection />
        <Achievements />
        <RescueTypes/>
        <Footer />
      </div>
    </TranslationsProvider>
  );
}
