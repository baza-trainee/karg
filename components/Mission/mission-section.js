"use client";

import MissionDetailsDisclosure from "../MissionDetailsDisclosure/mission-details-disclosure";
import SwiperSlider from "../SwiperSlider/swiper-slider";
import styles from "./styles/mission.module.scss";

const MissionSection = () => {
  return (
    <section className={styles.mission}>
      <div className={styles.container}>
        <h2 className={styles.missionTitle}>Наша місія</h2>
        <MissionDetailsDisclosure />
        <SwiperSlider />
      </div>
    </section>
  );
};

export default MissionSection;
