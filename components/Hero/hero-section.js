import styles from "./styles/hero.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Kyiv animal rescue group</h1>
    </section>
  );
};

export default HeroSection;
