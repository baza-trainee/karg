// direct page css
import styles from './styles/help.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
// translation
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// external components
import Image from "next/image";
// inner components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from "@/components/common/PageHero/pageHero";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import BankingDetails from './bankingDetails';
// images, icons
import {
    help_usHeroMob,
    help_usHeroTab,
    help_usHeroDesk,
    help_usImage,
    help_usImage_tablet,
    help_usImage_desktop,
    help_usHeroDeskExp,
} from "@/public/assets/images/helpUs";

const i18nNamespaces = ["helpUs", "common"];

const Help = async ({ params: { locale } }) => {

    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const DOCUMENT_TEXT = {
        buttonText: t('buttonText'),
        altText: t('altText'),
        title: t('title'),
        articleP1: t('articleP1'),
        textBlock_title2: t('textBlock_title2'),
        paymentsButtons_title: t('paymentsButtons_title'),
        photoBlock_title: t('photoBlock_title')
    };

    const text = {
        pageHero: {
            buttonText: DOCUMENT_TEXT.buttonText,
            altText: DOCUMENT_TEXT.altText
        }
    };

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}>
            <Header />
            <PageHero
                mobImage={help_usHeroDeskExp.src}
                tablImage={help_usHeroDeskExp.src}
                deskImage={help_usHeroDeskExp.src}
                buttonText={text.pageHero.buttonText}
                altText={text.pageHero.altText}
                priority={true}
            />
            <main className={styles.container}>
                <section className={styles.textBlock}>
                    <h2 className={`${styles.textBlock_title} ${variables.Heading3}`}>
                        {DOCUMENT_TEXT.title}
                    </h2>
                    <p className={`${styles.textBlock_text} ${variables.text_4}`}>
                        {DOCUMENT_TEXT.articleP1}</p>
                </section>
                <section className={styles.bankingDetails_Container}>
                    <h3 className={`${styles.textBlock_title} ${variables.Heading3}`}>
                        {DOCUMENT_TEXT.textBlock_title2}
                    </h3>
                    <BankingDetails />
                </section>
                <section className={styles.paymentsButtons_Container}>
                    <h4 className={`${styles.paymentsButtons_title} ${variables.Heading3}`}>
                        {DOCUMENT_TEXT.paymentsButtons_title}
                    </h4>
                    <div className={styles.paymentsButtons_buttonContainer}>
                        <a href='https://www.paypal.com/donate?token=edi9sEF4oDBmWo0mD58z1FB4RdVsYAeZB2XBwIzYqUJHt4GGhEG6GN8z9ztM1z-iOWAsAAElsFwd-2xk'>
                            <button className={`${styles.paymentsButtons_button} ${variables.mainSubtitle_shared}`}>PayPal</button>
                        </a>

                        <a href='https://send.monobank.ua/jar/7hQnoo2erG'>
                            <button className={`${styles.paymentsButtons_button} ${variables.mainSubtitle_shared}`}>Monobank</button>
                        </a>

                        <a href='https://www.patreon.com/karg'>
                            <button className={`${styles.paymentsButtons_button} ${variables.mainSubtitle_shared}`}>Patreon</button>
                        </a>

                    </div>
                </section>
                <section className={styles.photoBlock_Container}>
                    <h4 className={`${styles.photoBlock_title} ${variables.Heading3}`}>
                        {DOCUMENT_TEXT.photoBlock_title}
                    </h4>
                    <Image
                        className={styles.photoBlock_image_mobile}
                        src={help_usImage}
                        alt="Фото задоволеної тварини"
                        sizes="100vw"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={styles.photoBlock_image_tablet}
                        src={help_usImage_tablet}
                        alt="Фото задоволеної тварини"
                        sizes="100vw"
                        style={{
                            width: "706px",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={styles.photoBlock_image_desktop}
                        src={help_usImage_desktop}
                        alt="Фото задоволеної тварини"
                        sizes="100vw"
                        style={{
                            width: "970px",
                            height: "auto",
                        }}
                    />
                </section>
            </main>
            <ScrollToTop />
            <Footer />
        </TranslationsProvider>

    );
};
export default Help;