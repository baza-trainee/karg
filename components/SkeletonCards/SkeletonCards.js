import styles from './skeleton.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const SkeletonCards = () => {
    const skeletons = Array.from({ length: 15 }, (_, i) => (
        <div key={i} className={styles.cardContainer}>
            <div className={`${styles.cardImage} ${styles.skeleton}`}></div>
            <div className={styles.cardName}>
                <div className={`${styles.skeletonTextTitle} ${styles.skeleton}`}></div>
            </div>
            <div className={styles.contentHolder}>
                <div className={styles.cardDesc}>
                    <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
                    <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
                    <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
                    <div className={`${styles.skeletonText} ${styles.skeleton}`}></div>
                </div>
                <button className={`${styles.cardButton} ${variables.button1}`} disabled>
                    <div className={`${styles.skeletonTextButton} ${styles.skeleton}`}></div>
                </button>
            </div>
        </div>
    ));

    return <div className={styles.container}>{skeletons}</div>;
};

export default SkeletonCards;