import HeroSection from "@/components/Hero/hero-section";
import QuickAccessMenu from "@/components/QuickAccessMenu/QuickAccessMenu";
import styles from "./styles/main.module.scss";
import MissionSection from "@/components/Mission/mission-section";
import RescueTypes from "@/components/RescueTypes/RescueTypes";

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroSection />
      <QuickAccessMenu/>
      <MissionSection />
      <RescueTypes/>
    </div>
  );
}
