import styles from './styles/about.module.scss';

import initTranslations from "../../../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";


const i18nNamespaces = ['home', 'common'];

const About = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <div className={styles.about}>
                <Header />
                <div>About page</div>
                <Footer />
            </div>
        </TranslationsProvider>
    );
};
export default About;