'use client'

import styles from './styles/help.module.scss'
import Image from "next/image";
import helpImageMob from "@/public/assets/images/help/help-img-mob.jpg";
import helpImageTabl from "@/public/assets/images/help/help-img-tabl.jpg";
import helpImageDesk from "@/public/assets/images/help/help-img-desk.jpg";
import NeedInfo from "../common/NeedInfo/needInfo";

const Help = () => {
    const title = "Потрібна допомога?";
    const subtitle = "Перш ніж звертатися до нас, обов'язково ознайомтеся з переліком послуг, які ми надаємо, і правилами звернення до нас.";
    const buttonCaption = "Правила звернення";
    const route = "/about/rules_of_appeal";

    return (
        <section className={styles.container}>
            <NeedInfo
                title={title}
                subtitle={subtitle}
                route={route}
                buttonCaption={buttonCaption}
                isMainPageStyle={true}
            />
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