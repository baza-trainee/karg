// 'use client';

// styles
import styles from './styles/animals.module.scss';
// locale
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
// components
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import MultiPageCardItem from '@/components/MultiPageCardItem/multiPageCardItem';
import PageHero from '@/components/common/PageHero/pageHero';
// images
import { ourAnimalsImage } from '@/public/assets/images/animals';

import CardChakra from '@/components/CardChakra/CardChakra';

const i18nNamespaces = ['home', 'common'];

const data = [{ id: 1, catName: "Біляш", description: "Неймовіно красивий кіт Біляшик ще зовсім юний. Охоче грається, але інколи може булити інших котів. Територіальні війни, як ніяк. Біляш надзвичайно ласкавий, тому регулярна кототерапія вам забезпечена. Котик дуже любить ...", rescueHistory: "В липні 2023 р. наш рятувальник, повертаючись після зміни додому, побачив кота на дорозі та не зміг проїхати повз. У клініці в Біляша виявили травму кульшової кістки та забиття печінки. Зараз кіт повністю здоровий, кастрований та привчений до лотка.", image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" }, images: [{ url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" }, { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbpHmCoksK8ZUDlh8FBQpX9BmWhz5m7wV85SzpGa0IK5Fi6_o2iMkWTfWbA&s", alt: "A cat" }, { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-f7HclUKR6x_JPSNVanC4aF7CcsCOLf3nm5AMMhvwP_ezMYRnwq6e8u9S3w&s", alt: "A cat" }] },
{
    id: 2,
    catName: "Мурзик",
    description: "Мурзик - це енергійний і дружелюбний кіт. Він має яскраві зелені очі та м'яку шерсть. Мурзик любить грати з іграшками, особливо з м'ячиками. Він також любить спостерігати за птахами з вікна. Мурзик є дуже люблячим котом, який шукає домівку, де йому буде тепло та безпечно.",
    rescueHistory: "Мурзик був знайдений в холодну зиму 2023 року. Він був маленьким і худим, замерзаючи на вулиці. Добрі люди знайшли його та принесли до тваринного притулку. Там йому надали необхідну медичну допомогу та догляд. Зараз Мурзик здоровий, активний та готовий знайти свій новий дім.",
    image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
    images: [
        { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbpHmCoksK8ZUDlh8FBQpX9BmWhz5m7wV85SzpGa0IK5Fi6_o2iMkWTfWbA&s", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-f7HclUKR6x_JPSNVanC4aF7CcsCOLf3nm5AMMhvwP_ezMYRnwq6e8u9S3w&s", alt: "A cat" }
    ]
},
{
    id: 3,
    catName: "Картопляник ",
    description: "Картопляник - це великий і міцний кіт з густою шерстю. Він любить спати і їсти, але коли він не спить, він дуже активний і грайливий. Картопляник є дуже дружелюбним і ласкавим котом, який любить людей і інших тварин.",
    rescueHistory: "Картопляник був знайдений у міському парку, де він жив у кущах. Він був дуже слабкий і голодний, але завдяки добрим людям, які його знайшли, він отримав необхідну допомогу і тепер він здоровий і готовий до нового дому.",
    image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
    images: [
        { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbpHmCoksK8ZUDlh8FBQpX9BmWhz5m7wV85SzpGa0IK5Fi6_o2iMkWTfWbA&s", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-f7HclUKR6x_JPSNVanC4aF7CcsCOLf3nm5AMMhvwP_ezMYRnwq6e8u9S3w&s", alt: "A cat" }
    ]
},
{
    id: 4,
    catName: "Барсік",
    description: "Барсік - це маленький і швидкий кіт, який любить грати з іграшками і бігати по будинку. Він дуже дружелюбний і любить бути в центрі уваги. Барсік є дуже розумним котом, який швидко вчиться новим командам.",
    rescueHistory: "Барсік був знайдений на вулиці в холодну зиму. Він був маленьким і худим, але завдяки людям, які його знайшли, він отримав тепло, їжу і допомогу, яка була йому потрібна. Зараз він здоровий і готовий до нового дому",
    image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
    images: [
        { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbpHmCoksK8ZUDlh8FBQpX9BmWhz5m7wV85SzpGa0IK5Fi6_o2iMkWTfWbA&s", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-f7HclUKR6x_JPSNVanC4aF7CcsCOLf3nm5AMMhvwP_ezMYRnwq6e8u9S3w&s", alt: "A cat" }
    ]
},
{
    id: 5,
    catName: "Мурка",
    description: "Мурка - це красива кошка з довгою шерстю. Вона дуже спокійна і любить спати на вікні, дивлячись на вулицю. Мурка є дуже незалежною кошкою, яка любить проводити час сама, але вона також любить отримувати ласку від своїх людей",
    rescueHistory: "Мурка була знайдена в старому будинку, де вона жила сама. Вона була дуже боязкою і не довіряла людям, але завдяки терпінню і любові людей, які її знайшли, вона почала довіряти і тепер вона готова до нового дому.",
    image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
    images: [
        { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbpHmCoksK8ZUDlh8FBQpX9BmWhz5m7wV85SzpGa0IK5Fi6_o2iMkWTfWbA&s", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-f7HclUKR6x_JPSNVanC4aF7CcsCOLf3nm5AMMhvwP_ezMYRnwq6e8u9S3w&s", alt: "A cat" }
    ]
},
{
    id: 6,
    catName: "Сімба",
    description: "Сімба - це великий і міцний кіт з яскравими зеленими очима. Він дуже захисний і любить доглядати за своїми людьми. Сімба є дуже вірним котом, який завжди буде поруч, коли вам це потрібно.",
    rescueHistory: "Сімба був знайдений на вулиці після сильної грози. Він був мокрий і боявся, але люди, які його знайшли, дали йому тепло і безпеку. Зараз він здоровий і готовий до нового дому.",
    image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
    images: [
        { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbpHmCoksK8ZUDlh8FBQpX9BmWhz5m7wV85SzpGa0IK5Fi6_o2iMkWTfWbA&s", alt: "A cat" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-f7HclUKR6x_JPSNVanC4aF7CcsCOLf3nm5AMMhvwP_ezMYRnwq6e8u9S3w&s", alt: "A cat" }
    ]
},];

const Animals = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    const DOCUMENT_TEXT = {
        buttonText: 'Наші тварини',
        altText: 'Наші тварини',
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
                    <p>Вітаємо у нашому особливому світі, де кожен хвіст – це власна історія кохання та чекання. Кожен кіт та собака, яких ви зустрінете в анкетах нижче, не просто шукають дім – вони чекають на той момент, коли їхня історія переплететься з вашою. </p>
                    <p>Якщо ви поки не готові обзавестися другом, але дуже хочете допомогти тваринці, можна стати її опікуном. Тут все просто: щомісяця переводите певну сумму на утримання тваринки, а вона вам - свої відео та фото.</p>
                </section>
                <MultiPageCardItem data={data} buttonVariant={'button'} />
            </main>
            <Footer />
        </TranslationsProvider>
    );
};
export default Animals;