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
            srcSet="/assets/images/mission/mission-pic-1.jpg"
            media="(min-width: 1440px)"
          />
          <source
            srcSet="/assets/images/mission/mission-pic-1-mob.jpg"
            media="(max-width: 1439px)"
          />
          <img
            className={styles.img}
            src="/assets/images/mission/mission-pic-1-mob.jpg"
            alt="дівчина тримає кролика"
            width={234}
            height={356}
          />
        </picture>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <picture className={styles.picture}>
          <source
            srcSet="/assets/images/mission/mission-pic-2.jpg"
            media="(min-width: 1440px)"
          />
          <source
            srcSet="/assets/images/mission/mission-pic-2-mob.jpg"
            media="(max-width: 1439px)"
          />
          <img
            className={styles.img}
            src="/assets/images/mission/mission-pic-2-mob.jpg"
            alt="сірий кіт на руках"
            width={234}
            height={356}
          />
        </picture>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <picture className={styles.picture}>
          <source
            srcSet="/assets/images/mission/mission-pic-3.jpg"
            media="(min-width: 1440px)"
          />
          <source
            srcSet="/assets/images/mission/mission-pic-3-mob.jpg"
            media="(max-width: 1439px)"
          />
          <img
            className={styles.img}
            src="/assets/images/mission/mission-pic-3-mob.jpg"
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
