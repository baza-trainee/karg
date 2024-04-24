import Image from "next/image";
import teamImages from "@/public/assets/images/about/ourTeam-page/images";
import styles from "../team-section/styles/teamSection.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import initTranslations from "../../../../../i18n";

const TeamSection = async ({ locale, namespaces }) => {
    const { t } = await initTranslations(locale, namespaces);

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.introduction}>
                    <h3 className={variables.Subtitle2}>{t('subtitle')}</h3>
                    <div className={styles.foundersQuote}>
                        <p className={`${styles.quote} ${variables.subtitle2}`}>{t('quote')}</p>
                        <p className={`${styles.signature} ${variables.text3}`}>{t('signature')}</p>
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
                        {t('teamEquipmentTextFirstPar')}
                    </p>
                    <p>
                        {t('teamEquipmentTextSecondPar')}
                    </p>
                    <p>
                        {t('teamEquipmentTextThirdPar')}
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
                    {t('volontiersText')}
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
                <p className={`${styles.donatesText} ${variables.text4}`}>
                    {t('donatesText')}
                </p>
            </div>
        </section>
    );
}

export default TeamSection;
