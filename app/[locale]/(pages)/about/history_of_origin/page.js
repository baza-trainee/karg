import styles from "./historyOfOrigin.module.scss";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ButtonAsLink from "@/components/ButtonAsLink/buttonAsLink";
import Image from "next/image";
import {
  historyHeroMob,
  historyHeroTab,
  historyHeroDesk,
  historyMobOne,
  historyMobTwo,
  historyMobThree,
  historyMobFour,
  historyTabOne,
  historyTabTwo,
  historyTabThree,
  historyTabFour,
  historyDeskOne,
  historyDeskTwo,
  historyDeskThree,
  historyDeskFour,
} from "@/public/assets/images/about/history-page/index";
import PageHero from "@/components/common/PageHero/pageHero";
import NeedInfo from "@/components/common/NeedInfo/needInfo";

const i18nNamespaces = ["home", "common"];

const historyOfOrigin = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const altText = "Boy open a car trunk";
  const buttonText = "Історія виникнення";
  const title = "Потрібна допомога?";
  const subtitle =
    "Перш ніж звертатися до нас, обов`язково ознайомтеся з переліком послуг, які ми надаємо, і правилами звернення до нас.";
  const buttonCaption = "Правила звернення";
  const route = "/rules_of_appeal";

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className={styles.history}>
        <Header />
        <PageHero
          mobImage={historyHeroMob.src}
          tablImage={historyHeroTab.src}
          deskImage={historyHeroDesk.src}
          buttonText={buttonText}
          altText={altText}
        />
        <div className={styles.container}>
          <h3 className={styles.historyTitle}>Історія виникнення команди</h3>
          <div className={`${styles.historyText} ${styles.historyTextTop}`}>
            <p>
              Жодна державна чи комунальна установа в Україні не спеціалізується
              на рятуванні диких, безхатніх чи домашніх тварин, що потрапили в
              смертельно небезпечне становище. Тому ці завдання лягають на плечі
              волонтерів із необхідними навичками і спорядженням. Так, у Києві з
              2014 року працює Команда порятунку тварин, або Kyiv Animal Rescue
              Group (KARG) — громадська організація, яка за час своєї діяльності
              врятувала понад 10 тисяч живих істот.
            </p>
            <p>
              У селі Плоскому,неподалік Києва, кіт потрапив до вентиляційної
              шахти будинку. Отримавши дзвінок від власниці тварини, екіпаж
              рятувальників вирушає на завдання. Троє людей, одягнені у
              спеціальні робочі костюми, підіймаються на горище. Спершу вони
              роблять два заміри: один вказує на відстань від вентиляції до
              торцевої стіни будівлі, а інший — висоту, де застряг кіт. Після
              цього вони просвердлюють перфоратором кахельну стіну ванної
              кімнати (до якої тварина перебуває найближче). Звідти на них
              позирає пара спантеличених котячих очей. Наостанок лишається
              небагато: відламати ще кілька сантиметрів цементу та витягнути
              тварину.
            </p>
          </div>
          <div className={`${styles.imgOuterWrap} ${styles.imgOuterWrapTop}`}>
            <Image
              className={styles.historyMob}
              src={historyMobOne}
              alt="Team seat on the car"
              style={{
                width: "288px",
                height: "100%",
              }}
            />
            <Image
              className={styles.historyTab}
              src={historyTabOne}
              alt="Team seat on the car"
              style={{
                width: "706px",
                height: "100%",
              }}
            />
            <Image
              className={styles.historyDesk}
              src={historyDeskOne}
              alt="Team seat on the car"
              style={{
                width: "1170px",
                height: "100%",
              }}
            />

            <div className={styles.imgInnerWrap}>
              <Image
                className={styles.historyMob}
                src={historyMobTwo}
                alt="Girl in the boat"
                style={{
                  width: "136px",
                  height: "100%",
                }}
              />
              <Image
                className={styles.historyTab}
                src={historyTabTwo}
                alt="Girl in the boat"
                style={{
                  width: "343px",
                  height: "100%",
                }}
              />
              <Image
                className={styles.historyDesk}
                src={historyDeskTwo}
                alt="Girl in the boat"
                style={{
                  width: "570px",
                  height: "100%",
                }}
              />

              <Image
                className={styles.historyMob}
                src={historyMobThree}
                alt="Boy with a swan"
                style={{
                  width: "136px",
                  height: "100%",
                }}
              />
              <Image
                className={styles.historyTab}
                src={historyTabThree}
                alt="Boy with a swan"
                style={{
                  width: "343px",
                  height: "100%",
                }}
              />
              <Image
                className={styles.historyDesk}
                src={historyDeskThree}
                alt="Boy with a swan"
                style={{
                  width: "570px",
                  height: "100%",
                }}
              />
            </div>
          </div>
          <p className={`${styles.historyText} ${styles.historyTextBottom}`}>
            Саме так працює KARG — структура, що починалася з особистої
            ініціативи двох волонтерів — Михайла Сторожука та Любови Кравчук — і
            перетворилася на громадську організацію, яка опікується порятунком
            тварин. У її розпорядженні є чотири рятувальні автомобілі та один
            пожежний, а сама організація нараховує понад двадцять людей. Щодня
            на гарячу лінію Команди порятунку надходять дзвінки: зазвичай
            звертаються із запитами кияни, однак телефонують також люди з
            передмістя. А часом навіть із інших регіонів країни. Бо сьогодні
            вкрай важко знайти організацію, члени якої не лише володіли б
            специфічними навичками порятунку тварин, а й погодилися робити це за
            невелику плату, а подеколи й безкоштовно.
          </p>
          <div
            className={`${styles.imgOuterWrap} ${styles.imgOuterWrapBottom}`}
          >
            <Image
              className={styles.historyMob}
              src={historyMobFour}
              alt="Team seat on the car"
              style={{
                width: "288px",
                height: "100%",
              }}
            />
            <Image
              className={styles.historyTab}
              src={historyTabFour}
              alt="Team seat on the car"
              style={{
                width: "706px",
                height: "100%",
              }}
            />
            <Image
              className={styles.historyDesk}
              src={historyDeskFour}
              alt="Team seat on the car"
              style={{
                width: "1170px",
                height: "100%",
              }}
            />
          </div>
          <div className={styles.btnWrap}>
            <ButtonAsLink
              route="/our_team"
              buttonCaption="Про команду"
              buttonStyle="rescue"
            />
          </div>
        </div>
        <NeedInfo
          title={title}
          subtitle={subtitle}
          buttonCaption={buttonCaption}
          route={route}
        />
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default historyOfOrigin;
