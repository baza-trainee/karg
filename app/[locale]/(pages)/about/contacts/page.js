import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from "@/components/common/PageHero/pageHero";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import ContactsClientSection from "./ContactsClientSection";

import {
  contactsHeroMob,
  contactsHeroTab,
  contactsHeroDesk,
} from "@/public/assets/images/about/contacts/index";

const i18nNamespaces = ["contacts", "common"];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateMetadata({ params: { locale } }) {
  const isUkrainian = locale === "uk";

  return {
    title: isUkrainian ? "Контакти" : "Contacts",
    alternates: {
      canonical: isUkrainian ? `${API_BASE_URL}about/contacts` : `${API_BASE_URL}en/about/contacts`,
    },
  };
};

const Contacts = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const translatedTexts = {
    contactsTitle: t('contactsTitle'),
    titleId1: t('titleId1'),
    titleId2: t('titleId2'),
    titleId3: t('titleId3'),
    dataId2Row0: t('dataId2Row0'),
    dataId2Row1: t('dataId2Row1'),
    dataId2Row2: t('dataId2Row2'),
    dataId2Row3: t('dataId2Row3'),
    dataId2Row4: t('dataId2Row4'),
    dataId2Row5: t('dataId2Row5'),
    dataId2Row6: t('dataId2Row6'),
    dataId2Row7: t('dataId2Row7'),
    dataId2Row8: t('dataId2Row8'),
    socialNetworksText: t('socialNetworksText'),
  };

  const altText = "Squirrel sit on a tree";

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <Header />
      <main>
        <PageHero
          mobImage={contactsHeroMob.src}
          tablImage={contactsHeroTab.src}
          deskImage={contactsHeroDesk.src}
          buttonText={t('pageHeroButtonText')}
          altText={altText}
        />
        <ContactsClientSection translatedTexts={translatedTexts} />
      </main>
      <ScrollToTop />
      <Footer />
    </TranslationsProvider>
  );
};

export default Contacts;