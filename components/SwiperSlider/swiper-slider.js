import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/autoplay";
import { Autoplay } from "swiper/modules";

import styles from "./styles/swiper.module.scss";

const SwiperSlider = () => {
  return (
    <Swiper
      slidesPerView={1.3}
      spaceBetween={30}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1.3,
          spaceBetween: 30,
        },
        375: {
          slidesPerView: 1.5,
          spaceBetween: 30,
        },

        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      modules={[Autoplay]}
      className={styles.swiper}
    >
      <SwiperSlide className={styles.swiperSlide}>
        <picture className={styles.picture}>
          <source
            srcSet="/assets/images/mission/mission-desk-1.jpg"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/assets/images/mission/mission-mob-1.jpg"
            media="(max-width: 767px)"
          />
          <img
            className={styles.img}
            src="/assets/images/mission/mission-mob-1.jpg"
            alt="дівчина тримає кролика"
            width={234}
            height={356}
          />
        </picture>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <picture className={styles.picture}>
          <source
            srcSet="/assets/images/mission/mission-desk-2.jpg"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/assets/images/mission/mission-mob-2.jpg"
            media="(max-width: 767px)"
          />
          <img
            className={styles.img}
            src="/assets/images/mission/mission-mob-2.jpg"
            alt="сірий кіт на руках"
            width={234}
            height={356}
          />
        </picture>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <picture className={styles.picture}>
          <source
            srcSet="/assets/images/mission/mission-desk-3.jpg"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/assets/images/mission/mission-mob-3.jpg"
            media="(max-width: 767px)"
          />
          <img
            className={styles.img}
            src="/assets/images/mission/mission-mob-3.jpg"
            alt="хлопець тримає на руках лебедя"
            width={234}
            height={356}
          />
        </picture>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperSlider;
