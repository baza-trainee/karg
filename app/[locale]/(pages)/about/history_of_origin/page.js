import styles from "./historyOfOrigin.module.scss";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ButtonAsLink from "@/components/ButtonAsLink/buttonAsLink";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import Image from "next/image";
import {
  historyHeroMob,
  historyHeroTab,
  historyHeroDesk,
  historyMobOne,
  historyMobTwo,
  historyMobThree,
  historyMobFour,
  historyTabOne,
  historyTabTwo,
  historyTabThree,
  historyTabFour,
  historyDeskOne,
  historyDeskTwo,
  historyDeskThree,
  historyDeskFour,
} from "@/public/assets/images/about/history-page/index";
import PageHero from "@/components/common/PageHero/pageHero";
import NeedInfo from "@/components/common/NeedInfo/needInfo";

const i18nNamespaces = ["historyOfOrigin", "common"];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateMetadata({ params: { locale } }) {
  const isUkrainian = locale === "uk";

  return {
    title: isUkrainian ? "Історія виникнення команди" : "Team's history of origin",
    alternates: {
      canonical: isUkrainian ? `${API_BASE_URL}about/history_of_origin` : `${API_BASE_URL}en/about/history_of_origin`,
    },
  };
};

const historyOfOrigin = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const localizedPath = (path) => locale === 'uk' ? path : `/${locale}${path}`;
  const altText = "Boy open a car trunk";

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className={styles.history}>
        <Header />
        <PageHero
          mobImage={historyHeroMob.src}
          tablImage={historyHeroTab.src}
          deskImage={historyHeroDesk.src}
          buttonText={t("pageHeroButtonText")}
          altText={altText}
        />
        <div className={styles.container}>
          <h2 className={styles.historyTitle}>{t("historyOfOriginTitle")}</h2>
          <div className={`${styles.historyText} ${styles.historyTextTop}`}>
            <p>{t("historyOfOriginTextFirstPart")}</p>
            <p>{t("historyOfOriginTextSecondPart")}</p>
          </div>
          <div className={`${styles.imgOuterWrap} ${styles.imgOuterWrapTop} `}>
            <Image
              className={styles.historyMob}
              src={historyMobOne}
              alt="Team seat on the car"
              sizes="100vw"
              quality={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
            <Image
              className={styles.historyTab}
              src={historyTabOne}
              alt="Team seat on the car"
              sizes="100vw"
              quality={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
            <Image
              className={styles.historyDesk}
              src={historyDeskOne}
              alt="Team seat on the car"
              sizes="100vw"
              quality={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />

            <div className={styles.imgInnerWrap}>
              <Image
                className={styles.historyMob}
                src={historyMobTwo}
                alt="Girl in the boat"
                sizes="50vw"
                quality={100}
                style={{
                  width: "50vw",
                  height: "auto",
                }}
              />
              <Image
                className={styles.historyTab}
                src={historyTabTwo}
                alt="Girl in the boat"
                sizes="50vw"
                quality={100}
                style={{
                  width: "50vw",
                  height: "auto",
                }}
              />
              <Image
                className={styles.historyDesk}
                src={historyDeskTwo}
                alt="Girl in the boat"
                sizes="50vw"
                quality={100}
                style={{
                  width: "50vw",
                  height: "auto",
                }}
              />

              <Image
                className={styles.historyMob}
                src={historyMobThree}
                alt="Boy with a swan"
                sizes="50vw"
                quality={100}
                style={{
                  width: "50vw",
                  height: "auto",
                }}
              />
              <Image
                className={styles.historyTab}
                src={historyTabThree}
                alt="Boy with a swan"
                sizes="50vw"
                quality={100}
                style={{
                  width: "50vw",
                  height: "auto",
                }}
              />
              <Image
                className={styles.historyDesk}
                src={historyDeskThree}
                alt="Boy with a swan"
                sizes="50vw"
                quality={100}
                style={{
                  width: "50vw",
                  height: "auto",
                }}
              />
            </div>
          </div>
          <p className={`${styles.historyText} ${styles.historyTextBottom} `}>
            {t("historyOfOriginTextThirdPart")}
          </p>
          <div
            className={`${styles.imgOuterWrap} ${styles.imgOuterWrapBottom} `}
          >
            <Image
              className={styles.historyMob}
              src={historyMobFour}
              alt="Team seat on the car"
              sizes="100vw"
              quality={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
            <Image
              className={styles.historyTab}
              src={historyTabFour}
              alt="Team seat on the car"
              sizes="100vw"
              quality={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
            <Image
              className={styles.historyDesk}
              src={historyDeskFour}
              alt="Team seat on the car"
              sizes="100vw"
              quality={100}
              style={{
                width: "100vw",
                height: "auto",
              }}
            />
          </div>
          <div className={styles.btnWrap}>
            <ButtonAsLink
              route={localizedPath("/about/our_team")}
              buttonCaption={t("historyOfOriginButtonText")}
              buttonStyle="rescue"
            />
          </div>
        </div>
        <NeedInfo
          title={t("needInfoTitle")}
          subtitle={t("needInfoSubtitle")}
          buttonCaption={t("needInfoButtonCaption")}
          route={localizedPath("/about/rules_of_appeal")}
        />
        <ScrollToTop />
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default historyOfOrigin;
