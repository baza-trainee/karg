// "use client";
import styles from "./faq.module.scss";

// import { useState, useEffect } from "react";

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
import initialFaq from "@/public/qa";

const buttonText = "FAQ";
const altText = "bats sit on a branch";

const i18nNamespaces = ["home", "common"];

const Faq = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  // const [questions, setQuestion] = useState(initialFaq);

  const questions = initialFaq;

  // useEffect(() => {
  //   const fetchQA = async () => {
  //     try {
  //       const res = await fetch("./");
  //       const data = await res.json();
  //       setQuestion(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchQA();
  // }, []);

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
          {questions?.map(({ id, q, a }) => (
            <li key={id}>
              <FaqItem q={q} a={a} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </TranslationsProvider>
  );
};

export default Faq;
