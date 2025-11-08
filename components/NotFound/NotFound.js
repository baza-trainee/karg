import styles from "./styles/not-found.module.scss";
import { Icon404 } from "@/public/assets/icons";
import ButtonAsLink from "@/components/ButtonAsLink/buttonAsLink";

export default function NotFound({ locale }) {
    locale = locale || "ua";
    const translations = {
        en: {
            notFoundTitle: "Oops,",
            notFoundSubtitle: "Page not found",
            notFoundText: "This page doesn’t exist or has been removed. You can go back to the homepage.",
            backToHome: "Back to Home"
        },
        ua: {
            notFoundTitle: "Упс,",
            notFoundSubtitle: "Сторінку не знайдено",
            notFoundText: "Ця сторінка не існує або була видалена! Пропонуємо вам повернутися на головну",
            backToHome: "На головну"
        }
    };

    const t = (key) => translations[locale][key] || key;

    return (
        <div className={styles.container}>
            <Icon404 className={styles.Icon404} />
            <div className={styles.titleBlock}>
                <div className={styles.title}>{t("notFoundTitle")}</div>
                <div className={styles.subtitle}>{t("notFoundSubtitle")}</div>
            </div>
            <div className={styles.text}>{t("notFoundText")}</div>
            <ButtonAsLink route={locale === 'ua' ? "/" : `/${locale}/`} buttonCaption={t("backToHome")} buttonStyle="backToHome" />
        </div>
    );
}