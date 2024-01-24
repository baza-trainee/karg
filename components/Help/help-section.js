'use client'

import styles from './styles/help.module.scss'
import variables from "@/app/[locale]/variables.module.scss";
import Link from 'next/link';

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
                <Link href='/about' className={styles.button}>
                    <span className={`${styles.buttonText} ${variables.button1}`}>Правила звернення</span>
                </Link>
            </div>
        </section>
    );
}

export default Help;