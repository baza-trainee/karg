import HeroSection from "@/components/Hero/hero-section";
import QuickAccessMenu from "@/components/QuickAccessMenu/QuickAccessMenu";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "./styles/main.module.scss";
import MissionSection from "@/components/Mission/mission-section";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import Achievements from "@/components/Achievements/Achievements";
import RescueTypes from "@/components/RescueTypes/RescueTypes";
import Help from "@/components/Help/help-section";
import Support from "@/components/Support/Support";
const i18nNamespaces = ['home', 'common'];

export default async function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const rescueTypes = [
    { cardMessage: t('common:rescueTypes1'), id: 1 },
    { cardMessage: t('common:rescueTypes2'), id: 2 },
    { cardMessage: t('common:rescueTypes3'), id: 3 },
    { cardMessage: t('common:rescueTypes4'), id: 4 },
  ];

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className={styles.main}>
        <Header />
        <HeroSection />
        <QuickAccessMenu />
        <MissionSection />
        <Achievements />
        <RescueTypes locale={locale} namespaces={i18nNamespaces} rescueTypes={rescueTypes} />
        <Help />
        <Support />
        <Footer />
      </div>
    </TranslationsProvider>
  );
}
