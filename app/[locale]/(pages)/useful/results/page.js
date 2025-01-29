// styles
import styles from './styles/results.module.scss';
// locale
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from '@/components/common/PageHero/pageHero';
// import InfiniteScroll from './infiniteScroll';
import InitialFetch from './initialFetch';
// images
import { results } from '@/public/assets/images/useful/results';

const i18nNamespaces = ["results", "uniCards", "common"];

const Results = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const DOCUMENT_TEXT = {
        buttonText: t('pseudoButtonText'),
        altText: t('pseudoButtonText'),
    };

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <PageHero
                mobImage={results.src}
                tablImage={results.src}
                deskImage={results.src}
                buttonText={DOCUMENT_TEXT.buttonText}
                altText={DOCUMENT_TEXT.altText}
            />

            <main className={styles.pageContainer}>
                <InitialFetch locale={locale} />
                {/* <InfiniteScroll /> */}
            </main>
            <Footer />
        </TranslationsProvider>
    );

};

export default Results;