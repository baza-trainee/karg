import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import StatutContent from './StatutContent';
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import styles from './statut.module.scss';
import variables from '@/app/[locale]/variables.module.scss';
import ButtonAsLink from "@/components/ButtonAsLink/buttonAsLink";

const i18nNamespaces = ["statut", "common"];

export async function generateMetadata({ params: { locale } }) {
    const isUkrainian = locale === "uk";

    return {
        title: isUkrainian ? "Статут" : "Statut"
    };
};

const Statut = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <section className={styles.container}>
                <div className={styles.subContainer}>
                    <h1 className={`${styles.heading} ${variables.heading}`}>
                        {t('title')}
                    </h1>
                    <ButtonAsLink route="/documents/statut.pdf" buttonCaption={t('button')} buttonStyle="primary-lite-W-288" />
                </div>
                <StatutContent pdfUrl="/documents/statut.pdf" />
            </section>
            <ScrollToTop />
            <Footer />
        </TranslationsProvider>
    );
};

export default Statut;