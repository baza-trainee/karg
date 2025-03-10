import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import StatutContent from './statut';

const i18nNamespaces = ["common"];

const Statut = async ({ params: { locale } }) => {
    const { resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <StatutContent pdfUrl="/documents/statut.pdf" />
            <Footer />
        </TranslationsProvider>
    );
};

export default Statut;