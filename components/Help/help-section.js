'use client'

import styles from './styles/help.module.scss'
import variables from "@/app/[locale]/variables.module.scss";
import ButtonAsLink from '../ButtonAsLink/buttonAsLink';
import Image from "next/image";
import { useWindowWidth } from '@react-hook/window-size'

const Help = () => {
    const width = useWindowWidth();

    let backgroundImage = "/assets/images/help/help-img-mob.jpg";
    
    if (width >= 768 && width < 1200) {
        backgroundImage = "/assets/images/help/help-img-tabl.jpg";
    } else if (width >= 1200) {
        backgroundImage = "/assets/images/help/help-img-desk.jpg";
    }

    return (
        <section className={styles.container}>
            <div className={styles.desk}>
                <div className={styles.text}>
                    <div className={`${styles.title} ${variables.Subtitle1}`}>Потрібна допомога?</div>
                    <div className={`${styles.subtitle} ${variables.p}`}>
                        Перш ніж звертатися до нас, обов'язково ознайомтеся з переліком послуг,
                        які ми надаємо, і правилами звернення до нас.
                    </div>
                </div>
                <ButtonAsLink route='/about' buttonCaption='Правила звернення' buttonStyle='button-help' />
            </div>
            <Image
                className={styles.image}
                src={backgroundImage}
                alt="рятівник поруч з автомобілем"
                fill={true}
                style={{
                    objectFit: "cover",
                }}
            />
        </section>
    );
}

export default Help;