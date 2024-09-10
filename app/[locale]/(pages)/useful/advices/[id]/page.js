import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Image from "next/image";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import GoBackIcon from "@/components/ServerSideIcon/GoBackIcon";
import GoBackButton from "@/components/common/GoBackButton/GoBackButton";
import variables from '@/app/[locale]/variables.module.scss';
import SocialIcons from "@/components/SocialIcons/socialIcons";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import { getAdviceById } from "../../../dashboard/Advice/api";


const i18nNamespaces = ["advices", "common"];
import styles from '../[id]/styles/[id].module.scss';


const ItemAdvice = async ({ params: { locale, id } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  let cultureCode = (locale === "uk") ? "ua" : "en";

  const imageAlt = "pet image";
  const res = await getAdviceById(id, cultureCode);
  const adviceBody = res.description;
  const adviceArray = adviceBody.split("\n");
  const dataArray = res.created_At.split("/");
  let correctOrder = [dataArray[1], dataArray[0], dataArray[2]].join(".");

  const firstTextPart = adviceArray.slice(0, 2);
  const lastTextPart = adviceArray.slice(2);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <Header />
      <main>
        <div className={styles.container}>

          <GoBackButton className={styles.goBackButton}>
            <GoBackIcon />
            <span className={variables.Button2}>{t('goBackButtonText')}</span>
          </GoBackButton>

          <div className={`${variables.Heading3} ${styles.adviceTitle}`}>
            {res.title}
          </div>
          <div className={styles.line}></div>

          <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
              <Image
                loading="lazy"
                width={570}
                height={393}
                className={`${styles.image} ${styles.deskImage}`}
                src={res.images[0]}
                alt={imageAlt}
                quality={100}
                sizes="33vw"
                style={{
                  width: "100vw",
                  height: "auto",
                }}
              />
              <Image
                loading="lazy"
                width={706}
                height={487}
                className={`${styles.image} ${styles.tablImage}`}
                src={res.images[0]}
                alt={imageAlt}
                quality={100}
                sizes="100vw"
                style={{
                  width: "100vw",
                  height: "auto",
                }}
              />
              <Image
                loading="lazy"
                width={288}
                height={199}
                className={`${styles.image} ${styles.mobImage}`}
                src={res.images[0]}
                alt={imageAlt}
                quality={100}
                sizes="33vw"
                style={{
                  width: "100vw",
                  height: "auto",
                }}
              />
            </div>
            <div className={`${variables.Subtitle3} ${styles.adviceTimeStamp} ${styles.mb15}`}>
              {locale === "uk" ? `Опубліковано ${(correctOrder)}` : `Published ${correctOrder}`}
            </div>

            {firstTextPart.map((firstItem) => (
              <div key={firstItem} className={`${variables.Text3}`}>
                <p className={styles.paragraph}>
                  {firstItem}
                </p>
              </div>
            ))}
          </div>

          {lastTextPart.map((lastItem) => (
            <div key={lastItem} className={`${variables.Text3}`}>
              <p className={styles.paragraph}>
                {lastItem}
              </p>
            </div>
          ))}

          <div className={styles.shareContainer}>
            <span className={variables.Subtitle3}>{t('shareText')}</span>
            <div className={styles.iconsContainer}>
              <SocialIcons className={styles.socIcons} />
            </div>
          </div>
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </TranslationsProvider>
  );
};

export default ItemAdvice;
