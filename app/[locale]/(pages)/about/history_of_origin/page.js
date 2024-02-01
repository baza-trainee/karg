import styles from "./historyOfOrigin.module.scss";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

const i18nNamespaces = ["home", "common"];

const historyOfOrigin = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className={styles.history}>
        <Header />
        <div>History of origin page</div>
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default historyOfOrigin;
