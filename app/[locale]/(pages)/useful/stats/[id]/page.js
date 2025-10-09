import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import ArticleClient from "@/components/ArticleClient/ArticleClient";

const i18nNamespaces = ["advices", "common"];

export async function generateMetadata({ params }) {
  const { locale, id } = params;
  const isUkrainian = locale === "uk";
  const cultureCode = isUkrainian ? "ua" : "en";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${API_BASE_URL}api/yearresult/getbyid?id=${id}&cultureCode=${cultureCode}`);

    const advice = await response.json();

    const adviceTitle = advice.title || (isUkrainian ? "Підсумки" : "Year results");

    return {
      title: isUkrainian ? `${adviceTitle}` : `${adviceTitle}`,
      alternates: {
        canonical: isUkrainian
          ? `${API_BASE_URL}useful/stats/${id}`
          : `${API_BASE_URL}en/useful/stats/${id}`,
      },
      openGraph: {
        url: isUkrainian
          ? `${API_BASE_URL}useful/stats/${id}`
          : `${API_BASE_URL}en/useful/stats/${id}`,
      },
    };
  } catch (error) {
    console.error("Failed to fetch article data for metadata", error);
    return {
      title: isUkrainian ? "Підсумки" : "Year results",
      alternates: {
        canonical: isUkrainian
          ? `${API_BASE_URL}useful/stats`
          : `${API_BASE_URL}en/useful/stats`,
      },
    };
  }
}

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