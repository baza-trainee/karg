"use client";

import styles from "./styles/mission.module.scss";

const MissionSection = () => {
  return (
    <section>
      <h2>Наша місія</h2>
      <p>
        Нашою місією є створення безпечного та турботливого середовища для
        тварин у Києві. Мета роботи команди - порятунок тварин, що опинились в
        надзвичайній ситуації, і не можуть вибратися звідти самостійно, чи за
        допомогою небайдужих людей за відсутності спеціальних навиків та
        спорядження, також допомога диким тваринам, та допомога в надзвичайних
        ситуаціях в екосистемах. Ми працюємо для того, щоб кожна тварина мала
        шанс на нове життя.
      </p>
      <button type="button" onClick={() => {}}>
        Детальніше
        <svg width="24" height="24">
          <use href="./../../public/assets/icons/sprite.svg#icon-arrow-right"></use>
        </svg>
      </button>

      <ul>
        <li>
          <img src="" alt="" />
        </li>
        <li>
          <img src="" alt="" />
        </li>
        <li>
          <img src="" alt="" />
        </li>
      </ul>
    </section>
  );
};

export default MissionSection;
