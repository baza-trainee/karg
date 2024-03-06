"use client";
import styles from "./styles/missionDetailsDisclosure.module.scss";
import { ArrowRight, DetailsClose } from "@/public/assets/icons";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const MotionBox = motion(Box);

const variants = {
  hidden: { opacity: 0, transform: "translateY(-100px)" },
  enter: { opacity: 1, transform: "translateY(-17px)" },
  exit: { opacity: 0, transform: "translateY(-100px)" },
};

const MissionDetailsDisclosure = () => {
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);
  const { t } = useTranslation();

  const handleDisclosure = () => {
    setIsDisclosureOpen(!isDisclosureOpen);
  };

  return (
    <div>
      <p className={styles.missionText}>
        {t('missionText')}
      </p>
      {!isDisclosureOpen && (
        <button
          className={styles.missionButton}
          type="button"
          onClick={handleDisclosure}
        >
          {t('missionMore')}
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
            {t('missionText')}
          </p>
          <button
            className={styles.missionButton}
            type="button"
            onClick={handleDisclosure}
          >
            {t('missionClose')}
            <DetailsClose className={styles.missionButtonIcon} />
          </button>
        </MotionBox>
      )}
    </div>
  );
};

export default MissionDetailsDisclosure;
