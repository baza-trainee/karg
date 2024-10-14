// styles
import styles from './styles/animals.module.scss';
// locale
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from '@/components/common/PageHero/pageHero';
import InfiniteScroll from './infiniteScroll';
import InitialFetch from './initialFetch';
// images
import { ourAnimalsImage } from '@/public/assets/images/animals';

const i18nNamespaces = ["ourAnimals", "common"];

const Animals = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    const DOCUMENT_TEXT = {
        buttonText: t('buttonText'),
        altText: t('buttonText'),
        p1: t('p1'),
        p2: t('p2'),
    };

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <PageHero
                mobImage={ourAnimalsImage.src}
                tablImage={ourAnimalsImage.src}
                deskImage={ourAnimalsImage.src}
                buttonText={DOCUMENT_TEXT.buttonText}
                altText={DOCUMENT_TEXT.altText}
            />

            <main className={styles.pageContainer}>
                <section className={styles.textContainer}>
                    <p>{DOCUMENT_TEXT.p1}</p>
                    <p>{DOCUMENT_TEXT.p2}</p>
                </section>
                <InitialFetch />
                <InfiniteScroll />
            </main>
            <Footer />
        </TranslationsProvider>
    );
};
export default Animals;