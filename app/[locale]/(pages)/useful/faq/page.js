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
import { getAllFAQ } from "@/app/[locale]/(pages)/dashboard/FAQ/api";
import styles from "./faq.module.scss";

const buttonText = "FAQ";
const altText = "bats sit on a branch";
const i18nNamespaces = ["home", "common"];

const Faq = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  let cultureCode = (locale === "uk") ? "ua" : "en";
  const response = await getAllFAQ("", cultureCode);

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
          {response?.map(({ id, question, answer }) => (
            <li key={id}>
              <FaqItem q={question} a={answer} />
            </li>
          ))}
        </ul>
      </main>
      <ScrollToTop />
      <Footer />
    </TranslationsProvider>
  );
};

export default Faq;
