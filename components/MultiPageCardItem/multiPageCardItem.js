import styles from './multiPageCardItem.module.scss';

import Image from "next/image";

const data = [{ catName: "Біляш", description: "Неймовіно красивий кіт Біляшик ще зовсім юний. Охоче грається, але інколи може булити інших котів. Територіальні війни, як ніяк. Біляш надзвичайно ласкавий, тому регулярна кототерапія вам забезпечена. Котик дуже любить ...", image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" } },
{ catName: "Пан Котейко Von Hohenzollern", description: "Пан Котейко Von Hohenzollern - це не просто кіт, це справжній аристократ у світі котів. Він має вишукані манери, виразний взгляд і неймовірну гордість. Його величність Пан Котейко любить проводити час, граючись з іграшками, але не забуває про свої королівські обов'язки - інколи він любить показати іншим котам, хто тут головний. Але не думайте, що він завжди серйозний. Він також дуже ласкавий і любить отримувати увагу від людей. Його мурчання - це найкраща музика для ваших вух. І хоча він може бути трохи капризний, він завжди готовий до кототерапії. Пан Котейко - це не просто кіт, це справжній друг, який завжди порадує вас своєю присутністю.", image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" } },
{ catName: "Картопляник", description: "Неймовіно красивий кіт Біляшик ще зовсім юний. Охоче грається, але інколи може булити інших котів. Територіальні війни, як ніяк. Біляш надзвичайно ласкавий, тому регулярна кототерапія вам забезпечена. Котик дуже любить ...", image: { url: "https://iili.io/JEDPWwF.md.jpg", alt: "A cat" } }];


const MultiPageCardItem = () => {
    return (
        data.map(card => (
            <div className={styles.cardContainer}>
                <Image
                    src={card.image.url}
                    alt={card.image.alt}
                    sizes="100vw"
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                />
                <h2 className={styles.cardName}>{card.catName}</h2>
                <p className={styles.cardDesc}>{card.description}</p>
                <button className={styles.cardButton}>Детальніше</button>
            </div>
        ))

    );
};

export default MultiPageCardItem;