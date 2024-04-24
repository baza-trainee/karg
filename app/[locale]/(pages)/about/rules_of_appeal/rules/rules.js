import styles from "/app/[locale]/(pages)/about/rules_of_appeal/rules/styles/rules.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import Image from "next/image";
import ruleImageMob from "@/public/assets/images/about/rulesOfAppeal/rule-img-mob.jpg";
import ruleImageTabl from "@/public/assets/images/about/rulesOfAppeal/rule-img-tabl.jpg";
import ruleImageDesk from "@/public/assets/images/about/rulesOfAppeal/rule-img-desk.jpg";
import initTranslations from "../../../../../i18n";

const Rules = async ({ locale, namespaces }) => {
    const { t } = await initTranslations(locale, namespaces);

    return (
        <div className={styles.container}>
            <div className={`${styles.rulesTitle} ${variables.Subtitle2}`}>{t('rulesTitle')}</div>
            <div className={styles.rulesBlock}>
                <div className={styles.ruleAvailability}>
                    <span className={`${styles.ruleText} ${variables.text1}`}>{t('ruleAvailability')}</span>
                </div>
                <div className={styles.rulePaymentConditions}>
                    <span className={`${styles.ruleText} ${variables.text1}`}>{t('rulePaymentConditions')}</span>
                </div>
                <div className={styles.ruleAnimalRescue}>
                    <span className={`${styles.ruleText} ${variables.text1}`}>{t('ruleAnimalRescue')}</span>
                </div>
                <div className={styles.ruleImage}>
                    <Image
                        className={`${styles.ruleImage} ${styles.mobImage}`}
                        src={ruleImageMob}
                        alt="rescuer near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.ruleImage} ${styles.tablImage}`}
                        src={ruleImageTabl}
                        alt="rescuer near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                    <Image
                        className={`${styles.ruleImage} ${styles.deskImage}`}
                        src={ruleImageDesk}
                        alt="rescuer near the car"
                        sizes="100vw"
                        style={{
                            width: "100vw",
                            height: "auto",
                        }}
                    />
                </div>
                <div className={`${styles.ruleDescription} ${variables.text4}`}>
                    <p>{t('ruleDescriptionFirstPar')}</p>
                    <p>{t('ruleDescriptionSecondPar')}</p>
                    <p>{t('ruleDescriptionThirdPar')}</p>
                    <p>{t('ruleDescriptionFourthPar')}</p>
                </div>
            </div>
        </div>
    );
}

export default Rules;