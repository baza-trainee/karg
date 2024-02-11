import initTranslations from "../../../../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "../rules_of_appeal/styles/rulesOfAppeal.module.scss";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import PageHero from "@/components/common/PageHero/pageHero";
import mobImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-mob.jpg";
import tablImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-tabl.jpg";
import deskImage from "@/public/assets/images/about/rulesOfAppeal/rules-hero-img-desk.jpg";
import NeedInfo from "@/components/common/NeedInfo/needInfo";
import Rules from "./rules/rules";
import RescueTypes from "@/components/RescueTypes/RescueTypes";
import variables from "@/app/[locale]/variables.module.scss";

const i18nNamespaces = ['rules', 'common'];

const RulesOfAppeal = async ({ params: { locale } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const altText = "Rescuers near the man";
    const buttonText = "Правила звернення";
    const title = "Виникли питання?";
    const subtitle = "Перш ніж звертатися до нас, можете ознайомитись та знайти відповіді на поширені запитання.";
    const buttonCaption = "Питання та відповіді";
    const route = "/useful";

    const rescueTypes = [
        { cardMessage: "Зняття котів з дерев", id: 1 },
        { cardMessage: "Зняття котів з конструкцій будинків", id: 2 },
        { cardMessage: "Підняття тварин з колодязя, колектора, зливи", id: 3 },
        { cardMessage: "Порятунок котів з вентиляції", id: 4 },
        { cardMessage: "Порятунок тварини на льоду чи воді", id: 5 },
        { cardMessage: "Вилучення тварин із вузьких або важкодоступних місць", id: 6 },
        { cardMessage: "Відлов тварини в житлових комунікаціях, зокрема у підвалах будинків", id: 7 },
    ];

    return (
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
            <Header />
            <main>
                <PageHero
                    mobImage={mobImage.src}
                    tablImage={tablImage.src}
                    deskImage={deskImage.src}
                    buttonText={buttonText}
                    altText={altText} />
                <Rules />
                <RescueTypes rescueTypes={rescueTypes} isButtonAsLink={false} />
                <div className={`${styles.article} ${variables.body}`}>
                    <p>При порятунку пораненої тварини та її госпіталізації варто врахувати,
                        що ветеринарна медицина в нашій країні платна і рятувальники не зможуть вплинути
                        на вартість подальшого лікування тварини, зазначену у ветклініці. Якщо врятовану тварину
                        необхідно лікувати, будь ласка, заздалегідь ознайомтеся із цінами та послугами клініки,
                        до якої плануєте звертатися.</p>
                    <p>При порятунку бездомної тварини має бути людина, яка буде готова прихистити тварину,
                        взяти під опіку або займатися її прилаштуванням, оскільки, наприклад, знята з дерева кішка
                        може в паніці залізти на інше дерево або загинути від переохолодження, тож в такому випадку
                        зусилля команди виявляться марними.</p>
                </div>
                <NeedInfo
                    title={title}
                    subtitle={subtitle}
                    route={route}
                    buttonCaption={buttonCaption}
                />
            </main>
            <Footer />
        </TranslationsProvider >
    );
};

export default RulesOfAppeal;