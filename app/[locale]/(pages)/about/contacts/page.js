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

const i18nNamespaces = ["home", "common"];

const contactsData = [
  {
    id: 1,
    icon: <PhoneIconContacts className={styles.contactSvg} />,
    title: "Контактний телефон",
    data: ["+38 (093) 986-2262", "+38 (098) 844-7937"],
    href: ["tel:+380939862262", "tel:+380988447937"],
  },
  {
    id: 2,
    icon: <ClockIconContacts className={styles.contactSvg} />,
    title: "Графік роботи",
    data: [
      "Екстренні виклики (із ",
      "загрозою для життя ",
      "тварини) ",
      "приймаються ",
      "цілодобово",
    ],
  },
  {
    id: 3,
    icon: <EnvelopeIconContacts className={styles.contactSvg} />,
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

        {id === 2 && (
          <div className={styles.contactList}>
            <span className={styles.contactItem}>{data[0]}</span>
            <span className={styles.contactItem}>{data[1]}</span>
            <span className={styles.contactItem}>{data[2]}</span>
            <span className={styles.contactItem}>{data[3]}</span>
            <span className={styles.contactItem}>{data[4]}</span>
          </div>
        )}
        {id === 3 && (
          <div className={styles.contactItem}>
            <a href={href}>{data}</a>
          </div>
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

                  <SocialIcons className={styles.iconsContacts} />


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
