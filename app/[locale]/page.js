import HeroSection from "@/components/Hero/hero-section";
import QuickAccessMenu from "@/components/QuickAccessMenu/QuickAccessMenu";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "./styles/main.module.scss";
import MissionSection from "@/components/Mission/mission-section";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import Achievements from "@/components/Achievements/Achievements";

// import { deviceDetect } from "@/utils/deviceDetect";

const i18nNamespaces = ['home', 'common'];

// export async function getServerSideProps(context) {
//   const viewport = deviceDetect(context);

//   return {
//     props: { viewport },
//   };
// }

export default async function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

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
        <Help  />
        <Footer />
      </div>
    </TranslationsProvider>
  );
}
