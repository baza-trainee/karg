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

import {
  PhoneIconContacts,
  EnvelopeIconContacts,
  ClockIconContacts,
} from "@/public/assets/icons/index";

const i18nNamespaces = ["home", "common"];

const contactsData = [
  {
    id: 1,
    icon: <PhoneIconContacts />,
    title: "Контактний телефон",
    data: ["+38 (093) 986-2262", "+38 (098) 844-7937"],
    href: ["tell:+380939862262", "tell:+380988447937"],
  },
  {
    id: 2,
    icon: <ClockIconContacts />,
    title: "Графік роботи",
    data: "Екстренні виклики (із загрозою для життя тварини) приймаються цілодобово",
  },
  {
    id: 3,
    icon: <EnvelopeIconContacts />,
    title: "Електронна пошта",
    data: "karg.inform@gmail.com",
    href: "mailto:karg.inform@gmail.com",
  },
];

const ContactItem = ({ id, icon, title, data, href }) => {
  return (
    <div>
      {icon}
      <h4>{title}</h4>
      {id === 1 && (
        <ul>
          <li>
            <a href={href[0]}>{data[0]}</a>
          </li>
          <li>
            <a href={href[1]}>{data[1]}</a>
          </li>
        </ul>
      )}
      {id === 2 && <p>{data}</p>}
      {id === 3 && <a href={href}>{data}</a>}
    </div>
  );
};

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
      <h3>Як нас знайти</h3>
      <div>
        <ul>
          {contactsData?.map((c) => {
            return (
              <li key={c?.id}>
                <ContactItem
                  id={c?.id}
                  icon={c?.icon}
                  title={c?.title}
                  data={c?.data}
                  href={c?.href}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </TranslationsProvider>
  );
};

export default Contacts;
