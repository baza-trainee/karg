import styles from "./contacts.module.scss";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from "@/components/common/PageHero/pageHero";

import Image from "next/image";
import {
  contactsHeroMob,
  contactsHeroTab,
  contactsHeroDesk,
  contactsMobOne,
  contactsTabOne,
  contactsDeskOne,
} from "@/public/assets/images/about/contacts/index";

const i18nNamespaces = ["home", "common"];

const Contacts = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const altText = "Squirrel sit on a tree";
  const buttonText = "Контакти";

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <Header />
      <PageHero
        mobImage={contactsHeroMob.src}
        tablImage={contactsHeroTab.src}
        deskImage={contactsHeroDesk.src}
        buttonText={buttonText}
        altText={altText}
      />
      Contacts
      <Footer />
    </TranslationsProvider>
  );
};

export default Contacts;
