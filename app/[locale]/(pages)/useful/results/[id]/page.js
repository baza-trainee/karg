import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import ArticleClient from "@/components/ArticleClient/ArticleClient";

const i18nNamespaces = ["advices", "common"];

const ItemAdvice = async ({ params: { locale, id } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  let cultureCode = (locale === "uk") ? "ua" : "en";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const translations = {
    goBackButtonText: t('goBackButtonText'),
    shareText: t('shareText')
  };

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <Header />
      <main style={{ flex: 1 }}>
        <ArticleClient
          id={id}
          cultureCode={cultureCode}
          API_BASE_URL={API_BASE_URL}
          endpoint={'api/yearresult'}
          translations={translations}
        />
      </main>
      <ScrollToTop />
      <Footer />
    </TranslationsProvider>
  );
};

export default ItemAdvice;