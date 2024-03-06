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

const i18nNamespaces = ["contacts", "common"];

const ContactItem = ({ id, icon, title, data, href }) => {
  return (
    <>
      <span className={styles.contactIcon}>{icon}</span>
      <div className={styles.contactWrap}>
        <h4 className={styles.contactTitle}>{title}</h4>
        {id === 1 && (
          <ul>
            <li className={`${styles.contactItem} ${styles.contactItemLink}`}>
              <a href={href[0]}>{data[0]}</a>
            </li>
            <li className={`${styles.contactItem} ${styles.contactItemLink}`}>
              <a href={href[1]}>{data[1]}</a>
            </li>
          </ul>
        )}

        {id === 2 && (
          <div className={styles.contactList}>
            {data?.map((item, idx) => {
              return (
                <span
                  className={`${styles.contactItem} ${styles.contactItemText}`}
                  key={idx}
                >
                  {item}
                </span>
              );
            })}
          </div>
        )}
        {id === 3 && (
          <div className={`${styles.contactItem} ${styles.contactItemLink}`}>
            <a href={href}>{data}</a>
          </div>
        )}
      </div>
    </>
  );
};

const Contacts = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const contactsData = [
    {
      id: 1,
      icon: <PhoneIconContacts className={styles.contactSvg} />,
      title: t('titleId1'),
      data: ["+38 (093) 986-2262", "+38 (098) 844-7937"],
      href: ["tel:+380939862262", "tel:+380988447937"],
    },
    {
      id: 2,
      icon: <ClockIconContacts className={styles.contactSvg} />,
      title: t('titleId2'),
      data: [
        t('dataId2Row0'),
        t('dataId2Row1'),
        t('dataId2Row2'),
        t('dataId2Row3'),
        t('dataId2Row4'),
        t('dataId2Row5'),
        t('dataId2Row6'),
        t('dataId2Row7'),
        t('dataId2Row8'),
      ],
    },
    {
      id: 3,
      icon: <EnvelopeIconContacts className={styles.contactSvg} />,
      title: t('titleId3'),
      data: "karg.inform@gmail.com",
      href: "mailto:karg.inform@gmail.com",
    },
  ];

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
          buttonText={t('pageHeroButtonText')}
          altText={altText}
        />
        <section className={styles.contacts}>
          <h3 className={styles.contactsTitle}>{t('contactsTitle')}</h3>
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
                  <h4 className={styles.contactSocTitle}>{t('socialNetworksText')}</h4>

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
