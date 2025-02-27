
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
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import FetchInitialCards from "@/components/FetchInitialCards/FetchInitialCards";
import styles from "./faq.module.scss";
import { FaqItem } from "@/components/FaqItem/faq-item";

const buttonText = "FAQ";
const altText = "bats sit on a branch";
const i18nNamespaces = ["home", "common"];

const Faq = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const faqData = await FetchInitialCards(locale, 'api/faq', 'getall', 50);
  // console.log(faqData);

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
          {faqData && faqData ? (
            faqData.map(({ id, question, answer }) => (
              <li key={id}>
                <FaqItem q={question} a={answer} />
              </li>
            ))
          ) : (
            <ul>
              <li>Ой лишенько ! Щось пішло не так і розділ "питань і відповідей" кудись подівся.</li>
              <li>No FAQs found</li>
            </ul>
          )}
        </ul>
      </main>
      <ScrollToTop />
      <Footer />
    </TranslationsProvider>
  );
};

export default Faq;