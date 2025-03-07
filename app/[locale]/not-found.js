import styles from "./styles/not-found.module.scss";
import { Icon404 } from "@/public/assets/icons";
import ButtonAsLink from "@/components/ButtonAsLink/buttonAsLink";

export default async function NotFound() {
   
    return (
        <div className={styles.container}>
            <Icon404 className={styles.Icon404} />
            <div className={styles.titleBlock}>
                <div className={styles.title}>Упс,</div>
                <div className={styles.subtitle}>Сторінку не знайдено</div>
            </div>
            <div className={styles.text}>Ця сторінка не існує або була видалена!
                Пропонуємо вам повернутися на головн</div>
            <ButtonAsLink route="/" buttonCaption={"На головну"} buttonStyle="backToHome" />
        </div>
    );
}