import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/autoplay";
import { Autoplay } from "swiper/modules";

import styles from "./styles/swiper.module.scss";
import Image from "next/image";

import {
  missionMobOne,
  missionMobTwo,
  missionMobThree,
  missionTabOne,
  missionTabTwo,
  missionTabThree,
  missionDeskOne,
  missionDeskTwo,
  missionDeskThree,
} from "@/public/assets/images/mission/index";

const SwiperSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 30,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 15,
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      modules={[Autoplay]}
      className={styles.swiper}
    >
      <SwiperSlide className={styles.swiperSlide}>
        <div className={`${styles.picture} ${styles.imgMissionMob}`}>
          <Image
            src={missionMobOne}
            alt="Girl with rabbit"
            style={{
              width: "100vw",
              height: "100%",
            }}
          />
        </div>
        <div className={`${styles.picture} ${styles.imgMissionTab}`}>
          <Image
            src={missionTabOne}
            alt="Girl with rabbit"
            style={{
              width: "33vw",
              height: "100%",
            }}
          />
        </div>
        <div className={`${styles.picture} ${styles.imgMissionDesk}`}>
          <Image
            src={missionDeskOne}
            alt="Girl with rabbit"
            style={{
              width: "33vw",
              height: "100%",
            }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <div className={`${styles.picture} ${styles.imgMissionMob}`}>
          <Image
            src={missionMobTwo}
            alt="Gray cat"
            style={{
              width: "100vw",
              height: "100%",
            }}
          />
        </div>
        <div className={`${styles.picture} ${styles.imgMissionTab}`}>
          <Image
            src={missionTabTwo}
            alt="Gray cat"
            style={{
              width: "33vw",
              height: "100%",
            }}
          />
        </div>
        <div className={`${styles.picture} ${styles.imgMissionDesk}`}>
          <Image
            src={missionDeskTwo}
            alt="Gray cat"
            style={{
              width: "33vw",
              height: "100%",
            }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <div className={`${styles.picture} ${styles.imgMissionMob}`}>
          <Image
            src={missionMobThree}
            alt="Boy with a swan"
            style={{
              width: "100vw",
              height: "100%",
            }}
          />
        </div>
        <div className={`${styles.picture} ${styles.imgMissionTab}`}>
          <Image
            src={missionTabThree}
            alt="Boy with a swan"
            style={{
              width: "33vw",
              height: "100%",
            }}
          />
        </div>
        <div className={`${styles.picture} ${styles.imgMissionDesk}`}>
          <Image
            src={missionDeskThree}
            alt="Boy with a swan"
            style={{
              width: "33vw",
              height: "100%",
            }}
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;
