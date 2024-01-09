import HeroSection from "@/components/Hero/hero-section";
import { LanguageMenu } from '../components/Localication/LanguageMenu';
import styles from "./styles/main.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <LanguageMenu />
      <HeroSection />
    </div>
  );
}
