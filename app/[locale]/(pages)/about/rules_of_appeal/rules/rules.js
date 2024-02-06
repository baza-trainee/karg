import styles from "/app/[locale]/(pages)/about/rules_of_appeal/rules/styles/rules.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import Image from "next/image";
import ruleImageMob from "@/public/assets/images/about/rulesOfAppeal/rule-img-mob.jpg";
import ruleImageTabl from "@/public/assets/images/about/rulesOfAppeal/rule-img-tabl.jpg";
import ruleImageDesk from "@/public/assets/images/about/rulesOfAppeal/rule-img-desk.jpg";

const Rules = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.rulesTitle} ${variables.Subtitle2}`}>Правила звернення до Команди</div>
            <div className={styles.rulesBlock}>
                <div className={styles.ruleAvailability}>
                    <span className={`${styles.ruleText} ${variables.text1}`}>Цілодобово та без вихідних</span>
                </div>
                <div className={styles.rulePaymentConditions}>
                    <span className={`${styles.ruleText} ${variables.text1}`}>Оплата за виїзд береться тільки тоді, коли людина може це зробити</span>
                </div>
                <div className={styles.ruleAnimalRescue}>
                    <span className={`${styles.ruleText} ${variables.text1}`}>Рятуємо тварин у надзвичайних ситуаціях, коли вони не можуть вибратися самостійно або за допомогою небайдужих</span>
                </div>
                <div className={styles.ruleImage}>
                    <Image
                        className={`${styles.ruleImage} ${styles.mobImage}`}
                        src={ruleImageMob}
                        alt="rescuer near the car"
                        sizes="100vw"
                        fill={true}
                    />
                    <Image
                        className={`${styles.ruleImage} ${styles.tablImage}`}
                        src={ruleImageTabl}
                        alt="rescuer near the car"
                        sizes="100vw"
                        fill={true}
                    />
                    <Image
                        className={`${styles.ruleImage} ${styles.deskImage}`}
                        src={ruleImageDesk}
                        alt="rescuer near the car"
                        sizes="100vw"
                        fill={true}
                    />
                </div>
                <div className={`${styles.ruleDescription} ${variables.body}`}>
                    <p>Працювати на висоті та під землею складно. Така робота потребує дорогого і якісного спорядження, засобів для відлову тварин, бензину для автомобіля служби тощо.</p>
                    <p>Залежно від складності виконання робіт та часу доби виклику, ціна виїзду групи становить від 200 до 500 грн.</p>
                    <p>Отримані кошти насамперед покривають витрати на придбання нового спорядження або допомогу тваринам, які перебувають на лікуванні.</p>
                    <p>Бездомні тварини або тварини, які опинилися в ситуаціях в рамках компетенцій Команди, господарі яких не в змозі оплатити виклик, будуть врятовані у будь-якому разі, навіть якщо Команді доведеться працювати безкоштовно.</p>
                </div>
            </div>
        </div>
    );
}

export default Rules;