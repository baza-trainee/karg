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
} from "@/public/assets/images/helpUs";

const i18nNamespaces = ["home", "common"];

const text = { pageHero: { buttonText: "Допомогти нам", altText: 'Розділ "Допомогти нам"' } };

const Help = async ({ params: { locale } }) => {

    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}>
            <Header />
            <PageHero
                mobImage={help_usHeroMob.src}
                tablImage={help_usHeroTab.src}
                deskImage={help_usHeroDesk.src}
                buttonText={text.pageHero.buttonText}
                altText={text.pageHero.altText}
                priority={true}
            />
            <main className={styles.container}>
                <section className={styles.textBlock}>
                    <h2 className={`${styles.textBlock_title} ${variables.mobileHeading3}`}>Зробити донат</h2>
                    <p className={`${styles.textBlock_text} ${variables.font16w300lh20}`}>Команда рятувальників завжди рада благодійникам, за допомогою яких шанс на життя отримає більше тваринок. Отримані кошти насамперед покривають витрати на придбання нового спорядження або допомогу тваринам, які перебувають на лікуванні.<br /><br />
                        Для підтримки діяльності команди заповніть форму нижче.</p>
                </section>
                <section className={styles.bankingDetails_Container}>
                    <BankingDetails />
                </section>
                <section className={styles.paymentsButtons_Container}>
                    <h4 className={styles.paymentsButtons_title}>
                        Підтримати нас через інші платіжні системи
                    </h4>
                    <div className={styles.paymentsButtons_buttonContainer}>
                        <button className={`${styles.paymentsButtons_button} ${variables.mobileSubtitle1}`}>PayPal</button>
                        <button className={`${styles.paymentsButtons_button} ${variables.mobileSubtitle1}`}><a href='https://send.monobank.ua/jar/7hQnoo2erG'>Monobank</a></button>
                        <button className={`${styles.paymentsButtons_button} ${variables.mobileSubtitle1}`}><a href='https://www.patreon.com/karg'>Patreon</a></button>
                    </div>
                </section>
                <section className={styles.photoBlock_Container}>
                    <h4 className={`${styles.photoBlock_title} ${variables.mobileHeading3}`}>Дякуємо вам!</h4>
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
                            width: "100%",
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