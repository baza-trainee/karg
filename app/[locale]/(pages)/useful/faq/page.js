
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from "@/components/common/PageHero/pageHero";
import {
  faqHeroMob,
  faqHeroTab,
  faqHeroDesk,
} from "@/public/assets/images/useful/faq";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import InitialFetch from "./initialFetch";

const buttonText = "FAQ";
const altText = "bats sit on a branch";
const i18nNamespaces = ["home", "common"];

const Faq = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <PageHero
          mobImage={faqHeroMob.src}
          tablImage={faqHeroTab.src}
          deskImage={faqHeroDesk.src}
          buttonText={buttonText}
          altText={altText}
          priority={true}
        />
        <InitialFetch locale={locale} />
      </main>
      <ScrollToTop />
      <Footer />
    </TranslationsProvider>
  );
};

export default Faq;