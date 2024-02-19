import styles from "./contacts.module.scss";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from "@/components/common/PageHero/pageHero";
import SocialIcons from "@/components/SocialIcons/socialIcons";

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
import Link from "next/link";

const i18nNamespaces = ["home", "common"];

const contactsData = [
  {
    id: 1,
    icon: <PhoneIconContacts width={21} height={21} />,
    title: "Контактний телефон",
    data: ["+38 (093) 986-2262", "+38 (098) 844-7937"],
    href: ["tel:+380939862262", "tel:+380988447937"],
  },
  {
    id: 2,
    icon: <ClockIconContacts width={24} height={24} />,
    title: "Графік роботи",
    // data: "Екстренні виклики (із загрозою для життя тварини) приймаються цілодобово",
    data: [
      "Екстренні виклики (із загрозою",
      "для життя тварини)",
      "приймаються цілодобово",
    ],
  },
  {
    id: 3,
    icon: <EnvelopeIconContacts width={21} height={17} />,
    title: "Електронна пошта",
    data: "karg.inform@gmail.com",
    href: "mailto:karg.inform@gmail.com",
  },
];

const ContactItem = ({ id, icon, title, data, href }) => {
  return (
    <>
      <span className={styles.contactIcon}>{icon}</span>
      <div className={styles.contactWrap}>
        <h4 className={styles.contactTitle}>{title}</h4>
        {id === 1 && (
          <ul>
            <li className={styles.contactItem}>
              <a href={href[0]}>{data[0]}</a>
            </li>
            <li className={styles.contactItem}>
              <a href={href[1]}>{data[1]}</a>
            </li>
          </ul>
        )}
        {/* {id === 2 && <span className={styles.contactItem}>{data}</span>} */}
        {id === 2 && (
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span>{data[0]}</span>
            </li>
            <li className={styles.contactItem}>
              <span>{data[1]}</span>
            </li>
            <li className={styles.contactItem}>
              <span>{data[2]}</span>
            </li>
          </ul>
        )}
        {id === 3 && (
          <a className={styles.contactItem} href={href}>
            {data}
          </a>
        )}
      </div>
    </>
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
      <main>
        <PageHero
          mobImage={contactsHeroMob.src}
          tablImage={contactsHeroTab.src}
          deskImage={contactsHeroDesk.src}
          buttonText={buttonText}
          altText={altText}
        />
        <section className={styles.contacts}>
          <h3 className={styles.contactsTitle}>Як нас знайти</h3>
          <div className={styles.contactsContainer}>
            <div className={styles.contactsWrap}>
              <ul className={styles.contactsList}>
                {contactsData?.map((c) => {
                  return (
                    <li className={styles.contactsItem} key={c?.id}>
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
              <div className={styles.socImgWrap}>
                <Image
                  className={styles.imgMob}
                  src={contactsMobOne}
                  alt="A man is standing backside in a jacket with a signature Animal rescue team"
                  style={{
                    width: "100vw",
                    height: "100%",
                  }}
                />
                <Image
                  className={styles.imgTab}
                  src={contactsTabOne}
                  alt="A man is standing backside in a jacket with a signature Animal rescue team"
                  style={{
                    height: "100%",
                  }}
                />
                <Image
                  className={styles.imgDesk}
                  src={contactsDeskOne}
                  alt="A man is standing backside in a jacket with a signature Animal rescue team"
                  style={{
                    height: "100%",
                  }}
                />
                <div className={styles.contactsSoc}>
                  <h4 className={styles.contactSocTitle}>Соціальні мережі</h4>
                  <SocialIcons
                    // className={styles.iconSizes}
                    customStyles="iconsContacts"
                    iconsColor="#6B5199"
                  // gridOption={{
                  //   width: "100%",
                  //   justifyContent: "space-around",
                  // }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </TranslationsProvider>
  );
};

export default Contacts;
