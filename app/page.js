import HeroSection from "@/components/Hero/hero-section";
import styles from "./styles/main.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroSection />
    </div>
  );
}
