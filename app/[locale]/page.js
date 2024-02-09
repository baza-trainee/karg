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
    { cardMessage: "Зняття котів з дерев", id: 1 },
    { cardMessage: "Зняття котів з конструкцій будинків", id: 2 },
    { cardMessage: "Підняття тварин з колодязя, колектора, зливи", id: 3 },
    { cardMessage: "Порятунок котів з вентиляції", id: 4 },
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
        <RescueTypes rescueTypes={rescueTypes} />
        <Help />
        <Support />
        <Footer />
      </div>
    </TranslationsProvider>
  );
}
