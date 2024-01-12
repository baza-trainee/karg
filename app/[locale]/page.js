import HeroSection from "@/components/Hero/hero-section";
import LanguageMenu from '@/components/Localication/LanguageMenu';
import ExampleClientComponent from "@/components/ExampleClientComponent";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "./styles/main.module.scss";

const i18nNamespaces = ['home', 'common'];

export default async function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <div className={styles.main}>
        <div className="removeThisStyle"><LanguageMenu /></div>
        {t('key')}
        <ExampleClientComponent />
        <HeroSection />
      </div>
    </TranslationsProvider>
  );
}
