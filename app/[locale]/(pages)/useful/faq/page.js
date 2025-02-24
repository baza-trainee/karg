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
import { FaqItem } from "@/components/FaqItem/faq-item";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
// import { getAllFAQ } from "@/app/[locale]/(pages)/dashboard/FAQ/api";
import styles from "./faq.module.scss";
import axios from 'axios';

const buttonText = "FAQ";
const altText = "bats sit on a branch";
const i18nNamespaces = ["home", "common"];

const Faq = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  let cultureCode = (locale === "uk") ? "ua" : "en";
  // const response = await getAllFAQ("", cultureCode);
  let API_URL = `https://dev.karg.kyiv.ua/api/faq/getall?page=1&pageSize=50&cultureCode=${cultureCode}`;

  let response = null;
  try {
    response = await axios.get(API_URL);
  } catch (error) {
    console.error("Error fetching FAQ:", error);
  }

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <Header />
      <main>
        <PageHero
          mobImage={faqHeroMob.src}
          tablImage={faqHeroTab.src}
          deskImage={faqHeroDesk.src}
          buttonText={buttonText}
          altText={altText}
          priority={true}
        />
        <ul className={styles.questionsList}>
          {response && response.data && response.data.items && Array.isArray(response.data.items) ? (
            response.data.items.map(({ id, question, answer }) => (
              <li key={id}>
                <FaqItem q={question} a={answer} />
              </li>
            ))
          ) : (
            <li>No FAQs found</li>
          )}
        </ul>
      </main>
      <ScrollToTop />
      <Footer />
    </TranslationsProvider>
  );
};

export default Faq;
