// styles
import styles from './styles/advices.module.scss';
// locale
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from '@/components/common/PageHero/pageHero';
// images
import { advices } from '@/public/assets/images/advices';
import AdviceClient from './AdviceClient';

const i18nNamespaces = ["advices", "uniCards", "common"];

const Advices = async ({ params: { locale } }) => {
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
                mobImage={advices.src}
                tablImage={advices.src}
                deskImage={advices.src}
                buttonText={DOCUMENT_TEXT.buttonText}
                altText={DOCUMENT_TEXT.altText}
            />

            <main className={styles.pageContainer} style={{ flex: 1 }}>
                <AdviceClient locale={locale} />
            </main>
            <Footer />
        </TranslationsProvider>
    );

};

export default Advices;