'use client'

import styles from './styles/help.module.scss'
import variables from "@/app/[locale]/variables.module.scss";
import ButtonAsLink from '../ButtonAsLink/buttonAsLink';
import Image from "next/image";
import helpImageMob from "@/public/assets/images/help/help-img-mob.jpg";
import helpImageTabl from "@/public/assets/images/help/help-img-tabl.jpg";
import helpImageDesk from "@/public/assets/images/help/help-img-desk.jpg";

const Help = () => {

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
                className={`${styles.image} ${styles.mobImage}`}
                src={helpImageMob}
                alt="Rescuer near the car"
                sizes="100vw"
                fill={true}
            />
            <Image
                className={`${styles.image} ${styles.tablImage}`}
                src={helpImageTabl}
                alt="Rescuer near the car"
                sizes="100vw"
                fill={true}
            />
            <Image
                className={`${styles.image} ${styles.deskImage}`}
                src={helpImageDesk}
                alt="Rescuer near the car"
                sizes="100vw"
                fill={true}
            />
        </section>
    );
}

export default Help;