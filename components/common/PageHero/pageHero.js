import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from "./styles/pageHero.module.scss";

const PageHero = ({ mobImage, tablImage, deskImage, buttonText, altText }) => {

    return (
        <section className={styles.pageHero}>
            <div className={styles.pseudoButton}>
                <span className={styles.buttonText} >
                    {buttonText}
                </span>
            </div>
            <Image
                className={`${styles.image} ${styles.mobImage}`}
                src={mobImage}
                alt={altText}
                sizes="100vw"
                width={320}
                height={120}
            />
            <Image
                className={`${styles.image} ${styles.tablImage}`}
                src={tablImage}
                alt={altText}
                sizes="100vw"
                width={834}
                height={232}
            />
            <Image
                className={`${styles.image} ${styles.deskImage}`}
                src={deskImage}
                alt={altText}
                sizes="100vw"
                width={1440}
                height={400}
            />
        </section>
    );
};

PageHero.propTypes = {
    mobImage: PropTypes.string,
    tablImage: PropTypes.string,
    deskImage: PropTypes.string,
    buttonText: PropTypes.string,
    altText: PropTypes.string,
};

export default PageHero;

