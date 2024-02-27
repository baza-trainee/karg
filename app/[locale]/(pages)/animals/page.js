// styles
import styles from './styles/animals.module.scss';
// locale
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';

const i18nNamespaces = ['home', 'common'];

const Animals = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <main className={styles.pageContainer}>
                <section className={styles.textContainer}>
                    <p>Вітаємо у нашому особливому світі, де кожен хвіст – це власна історія кохання та чекання. Кожен кіт та собака, яких ви зустрінете в анкетах нижче, не просто шукають дім – вони чекають на той момент, коли їхня історія переплететься з вашою. </p>
                    <p>Якщо ви поки не готові обзавестися другом, але дуже хочете допомогти тваринці, можна стати її опікуном. Тут все просто: щомісяця переводите певну сумму на утримання тваринки, а вона вам - свої відео та фото.</p>
                </section>
                <MultiPageCardItem />
            </main>
            <Footer />
        </TranslationsProvider>
    );
};
export default Animals;