"use client";

import MissionDetailsDisclosure from "../MissionDetailsDisclosure/mission-details-disclosure";
import SwiperSlider from "../SwiperSlider/swiper-slider";
import styles from "./styles/mission.module.scss";
import { useTranslation } from 'react-i18next';

const MissionSection = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.mission}>
      <div className={styles.container}>
        <h2 className={styles.missionTitle}>{t('missionTitle')}</h2>
        <MissionDetailsDisclosure />
        <SwiperSlider />
      </div>
    </section>
  );
};

export default MissionSection;
