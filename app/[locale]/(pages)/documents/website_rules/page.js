// styles
import styles from './rules.module.scss';
// locale
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";

const i18nNamespaces = ["websiteRules", "common"];

const WebsiteRules = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    const DOCUMENT = {
        title: t('title'),
        intro: t('intro.0'),
        sections: t('sections', { returnObjects: true })
    };

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <div className={styles.container}>
                <h1 className={styles.heading}>{DOCUMENT.title}</h1>

                <p className={styles.paragraph}>{DOCUMENT.intro}</p>

                {DOCUMENT.sections.map((section, index) => (
                    <div key={index}>
                        <h2 className={styles.subheading}>{section.heading}</h2>
                        {section.paragraphs.map((p, i) => (
                            <p key={i} className={styles.paragraph}>{p}</p>
                        ))}
                        {section.list && (
                            <ol className={styles.list}>
                                {section.list.map((li, i) => (
                                    <li key={i} className={styles.listItem}>{li}</li>
                                ))}
                            </ol>
                        )}
                        {section.additional_paragraphs && section.additional_paragraphs.map((p, i) => (
                            <p key={i} className={styles.paragraph}>{p}</p>
                        ))}
                    </div>
                ))}
            </div>
            <ScrollToTop />
            <Footer />
        </TranslationsProvider>
    );
};

export default WebsiteRules;