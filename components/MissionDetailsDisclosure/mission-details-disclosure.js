"use client";
import styles from "./styles/missionDetailsDisclosure.module.scss";
import { ArrowRight, DetailsClose } from "@/public/assets/icons";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

const variants = {
  hidden: { opacity: 0, transform: "translateY(-100px)" },
  enter: { opacity: 1, transform: "translateY(-30px)" },
  exit: { opacity: 0, transform: "translateY(-100px)" },
};

const MissionDetailsDisclosure = () => {
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);

  const handleDisclosure = () => {
    setIsDisclosureOpen(!isDisclosureOpen);
  };

  return (
    <div>
      <p className={styles.missionText}>
        Нашою місією є створення безпечного та турботливого середовища для
        тварин у Києві. Мета роботи команди - порятунок тварин, що опинились в
        надзвичайній ситуації, і не можуть вибратися звідти самостійно, чи за
        допомогою небайдужих людей за відсутності спеціальних навиків та
        спорядження, також допомога диким тваринам, та допомога в надзвичайних
        ситуаціях в екосистемах. Ми працюємо для того, щоб кожна тварина мала
        шанс на нове життя.
      </p>
      {!isDisclosureOpen && (
        <button
          className={styles.missionButton}
          type="button"
          onClick={handleDisclosure}
        >
          Детальніше
          <ArrowRight className={styles.missionButtonIcon} />
        </button>
      )}
      {isDisclosureOpen && (
        <MotionBox
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <p className={styles.missionText}>
            Нашою місією є створення безпечного та турботливого середовища для
            тварин у Києві. Мета роботи команди - порятунок тварин, що опинились
            в надзвичайній ситуації, і не можуть вибратися звідти самостійно, чи
            за допомогою небайдужих людей за відсутності спеціальних навиків та
            спорядження, також допомога диким тваринам, та допомога в
            надзвичайних ситуаціях в екосистемах. Ми працюємо для того, щоб
            кожна тварина мала шанс на нове життя.
          </p>
          <button
            className={styles.missionButton}
            type="button"
            onClick={handleDisclosure}
          >
            Закрити
            <DetailsClose className={styles.missionButtonIcon} />
          </button>
        </MotionBox>
      )}
    </div>
  );
};

export default MissionDetailsDisclosure;
