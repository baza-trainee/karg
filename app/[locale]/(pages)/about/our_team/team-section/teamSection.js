import Image from "next/image";
import teamImages from "@/public/assets/images/about/ourTeam-page/images";
import styles from "../team-section/styles/teamSection.module.scss";
import variables from "@/app/[locale]/variables.module.scss";

const TeamSection = () => {
    return (
        <section>
            <div className={styles.container}>
                <div className={styles.introduction}>
                    <h3 className={variables.Subtitle2}>Наша команда</h3>
                    <div className={styles.foundersQuote}>
                        <p className={`${styles.quote} ${variables.subtitle2}`}>— Ми команда небайдужих добровольців, рятуємо тварин, які потрапили в халепу.</p>
                        <p className={`${styles.signature} ${variables.text3}`}>засновники KARG Михайло та Любов</p>
                    </div>
                    <div className={styles.singleImageContainer}>
                        <Image
                            className={`${styles.singleImage} ${styles.mobImage}`}
                            src={teamImages.teamOne.mob}
                            alt="group photo of the team"
                            sizes="100vw"
                            style={{
                                width: "100vw",
                                height: "auto",
                            }}
                        />
                        <Image
                            className={`${styles.singleImage} ${styles.tablImage}`}
                            src={teamImages.teamOne.tabl}
                            alt="group photo of the team"
                            sizes="100vw"
                            style={{
                                width: "100vw",
                                height: "auto",
                            }}
                        />
                        <Image
                            className={`${styles.singleImage} ${styles.deskImage}`}
                            src={teamImages.teamOne.desk}
                            alt="group photo of the team"
                            sizes="100vw"
                            style={{
                                width: "100vw",
                                height: "auto",
                            }}
                        />
                    </div>
                </div>
                <div className={`${styles.teamEquipmentText} ${variables.text4}`}>
                    <p>
                        У її розпорядженні KARG - чотири рятувальні автомобілі та один пожежний, а сама команда
                        нараховує понад двадцять людей - рятувальники, водії , диспетчери, програміст, інженер-механік,
                        завідувач гаражу, бухгалтер, юрист-консультант.
                    </p>
                    <p>
                        Учасники команди або професійні альпіністи, або спелеологи (дослідники печер),або ж дигери
                        (дослідники підземних сполучень), тому можуть дістати тваринок фактично з будь-якого місця.
                    </p>
                    <p>
                        Крім того є у розпорядженні моторний човен та обладнання для роботи на воді.
                        У випадку лісових пожеж команда використовує пожежну машину для ліквідації лісових загорянь
                        та групу з 10 волонтерів, які не є рятувальниками команди.
                    </p>
                </div>
                <div className={styles.twoImagesContainer}>
                    <Image
                        className={`${styles.twoImages} ${styles.mobImage}`}
                        src={teamImages.teamTwo.mob}
                        alt="rescuers with a swan"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.twoImages} ${styles.mobImage}`}
                        src={teamImages.teamThree.mob}
                        alt="rescuers with a deer"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.twoImages} ${styles.tablImage}`}
                        src={teamImages.teamTwo.tabl}
                        alt="rescuers with a swan"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.twoImages} ${styles.tablImage}`}
                        src={teamImages.teamThree.tabl}
                        alt="rescuers with a deer"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.twoImages} ${styles.deskImage}`}
                        src={teamImages.teamTwo.desk}
                        alt="rescuers with a swan"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.twoImages} ${styles.deskImage}`}
                        src={teamImages.teamThree.desk}
                        alt="rescuers with a deer"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                </div>
                <p className={`${styles.volontiersText} ${variables.text4}`}>
                    Дотепер лави Команди порятунку час від часу поповнюються новими волонтерами.
                    Щоби стати рятувальником KARG, треба пройти стажування. Але багато людей долучаються
                    до команди на короткий термін, а згодом йдуть і більше не повертаються. В організації
                    бували й складні періоди, коли одна людина могла виконувати кілька ролей одночасно і
                    брати 4-5 змін поспіль. Попри це, за весь час Команда порятунку жодного разу не
                    призупиняла роботу. А волонтери, яким вдається протриматися в організації більше місяця,
                    залишаються тут надовго.
                </p>
                <div className={styles.treeImagesContainer}>
                    <Image
                        className={`${styles.treeImagesTop} ${styles.mobImage}`}
                        src={teamImages.teamFour.mob}
                        alt="rescuers and equipment near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesLeft} ${styles.mobImage}`}
                        src={teamImages.teamFive.mob}
                        alt="rescuers with a cat"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesRight} ${styles.mobImage}`}
                        src={teamImages.teamSix.mob}
                        alt="rescuers near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesTop} ${styles.tablImage}`}
                        src={teamImages.teamFour.tabl}
                        alt="rescuers and equipment near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesLeft} ${styles.tablImage}`}
                        src={teamImages.teamFive.tabl}
                        alt="rescuers with a cat"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesRight} ${styles.tablImage}`}
                        src={teamImages.teamSix.tabl}
                        alt="rescuers near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesTop} ${styles.deskImage}`}
                        src={teamImages.teamFour.desk}
                        alt="rescuers and equipment near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesLeft} ${styles.deskImage}`}
                        src={teamImages.teamFive.desk}
                        alt="rescuers with a cat"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.treeImagesRight} ${styles.deskImage}`}
                        src={teamImages.teamSix.desk}
                        alt="rescuers near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                </div>
                <p className={`${styles.donatesText} ${variables.text4}`}>Дзвінків зі зверненнями про допомогу щодня
                більше, а кількість оплачуваних виїздів не росте: лише третина заявників готові платити за роботу.
                Стабільних фінансових надходжень отримувати немає можливості. Тому рятувальники завжди раді
                благодійникам, за допомогою яких шанс на життя отримає більше тваринок.
            </p>
            </div>
        </section>
    );
}

export default TeamSection;
