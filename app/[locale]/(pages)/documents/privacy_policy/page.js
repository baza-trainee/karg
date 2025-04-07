// styles
import styles from './privacy_polisy.module.scss';
// locale
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";

const i18nNamespaces = ["privacyPolicy", "common"];

export const metadata = ({ locale }) => {
    const isUkrainian = locale === "uk";

    return {
        title: isUkrainian ? "Політика конфіденційності" : "Privacy policy"
    };
};

const PrivacyPolicy = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const DOCUMENT = {
        title: t('title'),
        intro: [
            t('intro.paragraph1'),
            t('intro.paragraph2')
        ],
        terms: {
            heading: t('terms.heading'),
            list: [
                t('terms.list.0'),
                t('terms.list.1'),
                t('terms.list.2'),
                t('terms.list.3'),
                t('terms.list.4'),
                t('terms.list.5'),
                t('terms.list.6'),
                t('terms.list.7'),
                t('terms.list.8')
            ]
        },
        dataCollected: {
            heading: t('dataCollected.heading'),
            list: [
                t('dataCollected.list.0'),
                t('dataCollected.list.1')
            ],
            paragraphs: [
                t('dataCollected.paragraph')
            ]
        },
        cookies: [
            t('cookies.paragraph1'),
            t('cookies.paragraph2')
        ],
        purposes: {
            heading: t('purposes.heading'),
            list: [
                t('purposes.list.0'),
                t('purposes.list.1'),
                t('purposes.list.2'),
                t('purposes.list.3'),
                t('purposes.list.4'),
                t('purposes.list.5'),
                t('purposes.list.6')
            ]
        },
        legalBasis: [
            t('legalBasis.paragraph1'),
            t('legalBasis.paragraph2')
        ],
        specificPurposes: {
            heading: t('specificPurposes.heading'),
            list: [
                t('specificPurposes.list.0'),
                t('specificPurposes.list.1')
            ]
        },
        nonPersonalData: [
            t('nonPersonalData.paragraph1'),
            t('nonPersonalData.paragraph2')
        ],
        dataSharing: {
            heading: t('dataSharing.heading'),
            list: [
                t('dataSharing.list.0')
            ],
            paragraphs: [
                t('dataSharing.paragraph')
            ]
        },
        dataProtection: [
            t('dataProtection.paragraph1'),
            t('dataProtection.paragraph2'),
            t('dataProtection.paragraph3')
        ],
        userRights: [
            t('userRights.paragraph1'),
            t('userRights.paragraph2')
        ],
        dataTransfer: [
            t('dataTransfer.paragraph1'),
            t('dataTransfer.paragraph2'),
            t('dataTransfer.paragraph3'),
            t('dataTransfer.paragraph4'),
            t('dataTransfer.paragraph5')
        ],
        policyChanges: [
            t('policyChanges.paragraph')
        ]
    };

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <div className={styles.container}>
                <h1 className={styles.heading}><strong>{DOCUMENT.title}</strong></h1>

                {(DOCUMENT.intro).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

                <h2 className={`${styles.paragraph} ${styles.subheading}`}>{DOCUMENT.terms.heading}</h2>

                <ul className={styles.list}>
                    {(DOCUMENT.terms).list.map((text, index) => {
                        return <li key={index} className={`${styles.listItem} ${styles.paragraph}`}>{text}</li>;
                    })}

                </ul>

                <h2 className={`${styles.paragraph} ${styles.subheading}`}>{DOCUMENT.dataCollected.heading}</h2>

                <ul className={styles.list}>
                    {(DOCUMENT.dataCollected).list.map((text, index) => {
                        return <li key={index} className={`${styles.listItem} ${styles.paragraph}`}>{text}</li>;
                    })}
                </ul>

                <p className={styles.paragraph}>{DOCUMENT.dataCollected.paragraphs[0]}</p>

                {(DOCUMENT.cookies).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

                <h2 className={`${styles.paragraph} ${styles.subheading}`}>{DOCUMENT.purposes.heading}</h2>

                <ul className={styles.list}>
                    {(DOCUMENT.purposes).list.map((text, index) => {
                        return <li key={index} className={`${styles.listItem} ${styles.paragraph}`}>{text}</li>;
                    })}
                </ul>

                {(DOCUMENT.legalBasis).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

                <h2 className={`${styles.paragraph} ${styles.subheading}`}>{DOCUMENT.specificPurposes.heading}</h2>

                <ul className={styles.list}>
                    {(DOCUMENT.specificPurposes).list.map((text, index) => {
                        return <li key={index} className={`${styles.listItem} ${styles.paragraph}`}>{text}</li>;
                    })}
                </ul>

                {(DOCUMENT.nonPersonalData).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

                <h2 className={`${styles.paragraph} ${styles.subheading}`}>{DOCUMENT.dataSharing.heading}</h2>

                <ul className={styles.list}>
                    <li className={`${styles.listItem} ${styles.paragraph}`}>{DOCUMENT.dataSharing.list.at(0)}</li>
                </ul>

                <p className={styles.paragraph}>{DOCUMENT.dataSharing.paragraphs.at(0)}</p>

                {(DOCUMENT.dataProtection).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

                {(DOCUMENT.userRights).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

                {(DOCUMENT.dataTransfer).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

                {(DOCUMENT.policyChanges).map((text, index) => {
                    return <p key={index} className={styles.paragraph}>{text}</p>;
                })}

            </div>
            <ScrollToTop />
            <Footer />
        </TranslationsProvider>
    );
};
export default PrivacyPolicy;