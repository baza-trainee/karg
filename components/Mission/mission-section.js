"use client";

import styles from "./styles/mission.module.scss";

const MissionSection = () => {
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
          onClick={() => {}}
        >
          Детальніше
          <svg className={styles.missionButtonIcon} width="24" height="24">
            <use href="/assets/icons/sprite.svg#icon-arrow-right" />
          </svg>
        </button>
        <ul className={styles.missionPicList}>
          <li className={styles.missionPicItem}>
            <picture>
              <source
                srcSet="/assets/images/mission/mission-pic-1.jpg"
                media="(min-width: 1440px)"
              />
              <source srcSet="" media="(max-width: 1439px)" />
              <img
                src="/assets/images/mission/mission-pic-1.jpg"
                alt="дівчина тримає кролика"
                width={370}
              />
            </picture>
          </li>
          <li className={styles.missionPicItem}>
            <picture>
              <source
                srcSet="/assets/images/mission/mission-pic-2.jpg"
                media="(min-width: 1440px)"
              />
              <source srcSet="" media="(max-width: 1439px)" />
              <img
                src="/assets/images/mission/mission-pic-2.jpg"
                alt="сірий кіт на руках"
                width={370}
              />
            </picture>
          </li>
          <li className={styles.missionPicItem}>
            <picture>
              <source
                srcSet="/assets/images/mission/mission-pic-3.jpg"
                media="(min-width: 1440px)"
              />
              <source srcSet="" media="(max-width: 1439px)" />
              <img
                src="/assets/images/mission/mission-pic-3.jpg"
                alt="хлопець тримає на руках тримає лебедя"
                width={370}
              />
            </picture>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MissionSection;
