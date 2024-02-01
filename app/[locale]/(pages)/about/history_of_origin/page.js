import styles from "./historyOfOrigin.module.scss";

import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ButtonAsLink from "@/components/ButtonAsLink/buttonAsLink";
import Image from "next/image";
import {
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
} from "@/public/assets/images/history-page/index";

const i18nNamespaces = ["home", "common"];

const historyOfOrigin = async ({ params: { locale } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className={styles.history}>
        <Header />
        <div>
          <h3>Історія виникнення команди</h3>
          <p>
            Жодна державна чи комунальна установа в Україні не спеціалізується
            на рятуванні диких, безхатніх чи домашніх тварин, що потрапили в
            смертельно небезпечне становище. Тому ці завдання лягають на плечі
            волонтерів із необхідними навичками і спорядженням. Так, у Києві з
            2014 року працює Команда порятунку тварин, або Kyiv Animal Rescue
            Group (KARG) — громадська організація, яка за час своєї діяльності
            врятувала понад 10 тисяч живих істот. У селі Плоскому, неподалік
            Києва, кіт потрапив до вентиляційної шахти будинку. Отримавши
            дзвінок від власниці тварини, екіпаж рятувальників вирушає на
            завдання. Троє людей, одягнені у спеціальні робочі костюми,
            підіймаються на горище. Спершу вони роблять два заміри: один вказує
            на відстань від вентиляції до торцевої стіни будівлі, а інший —
            висоту, де застряг кіт. Після цього вони просвердлюють перфоратором
            кахельну стіну ванної кімнати (до якої тварина перебуває найближче).
            Звідти на них позирає пара спантеличених котячих очей. Наостанок
            лишається небагато: відламати ще кілька сантиметрів цементу та
            витягнути тварину.
          </p>
          <div className={styles.imgOuterWrap}>
            <Image
              className={styles.historyMob}
              src={historyMobOne}
              alt="Team seat on the car"
              style={{
                width: "288px",
                height: "127px",
              }}
            />
            <div className={styles.imgInnerWrap}>
              <Image
                className={styles.historyMob}
                src={historyMobTwo}
                alt="Girl in the boat"
                style={{
                  width: "136px",
                  height: "170px",
                }}
              />
              <Image
                className={styles.historyMob}
                src={historyMobThree}
                alt="Boy with a swan"
                style={{
                  width: "136px",
                  height: "170px",
                }}
              />
            </div>
          </div>
        </div>
        <ButtonAsLink />
        <Footer />
      </div>
    </TranslationsProvider>
  );
};

export default historyOfOrigin;
