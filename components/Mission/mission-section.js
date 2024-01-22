"use client";

import { ArrowRight } from "@/public/assets/icons";
import SwiperSlider from "../SwiperSlider/swiper-slider";
import styles from "./styles/mission.module.scss";
import { useState } from "react";

const MissionSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOnBtnClick = () => {
    setModalOpen(true);
  };

  return (
    <section className={styles.mission}>
      <div className={styles.container}>
        <h2 className={styles.missionTitle}>Наша місія</h2>
        <p className={styles.missionText}>
          Нашою місією є створення безпечного та турботливого середовища для
          тварин у Києві. Мета роботи команди - порятунок тварин, що опинились в
          надзвичайній ситуації, і не можуть вибратися звідти самостійно, чи за
          допомогою небайдужих людей за відсутності спеціальних навиків та
          спорядження, також допомога диким тваринам, та допомога в надзвичайних
          ситуаціях в екосистемах. Ми працюємо для того, щоб кожна тварина мала
          шанс на нове життя.
        </p>
        <button
          className={styles.missionButton}
          type="button"
          onClick={handleOnBtnClick}
        >
          Детальніше
          <ArrowRight className={styles.missionButtonIcon} />
          {/* <svg className={styles.missionButtonIcon} width="24" height="24">
            <use href="/assets/icons/sprite.svg#icon-arrow-right" />
          </svg> */}
        </button>
        <SwiperSlider />
      </div>
    </section>
  );
};

export default MissionSection;
