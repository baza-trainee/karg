import HeroSection from "@/components/Hero/hero-section";
import styles from "./styles/main.module.scss";
import MissionSection from "@/components/Mission/mission-section";
import Header from "@/components/Header/header";

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <HeroSection />
      <MissionSection />
    </div>
  );
}
