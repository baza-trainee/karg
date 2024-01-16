import HeroSection from "@/components/Hero/hero-section";
import styles from "./styles/main.module.scss";
import MissionSection from "@/components/Mission/mission-section";
import Achievements from "@/components/Achievements/Achievements";

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroSection />
      <MissionSection />
      <Achievements/>
    </div>
  );
}
