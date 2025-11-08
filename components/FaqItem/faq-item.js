"use client";

import styles from "./styles/faqItem.module.scss";

import { useState } from "react";

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { ArrowDown, ArrowUp } from "@/public/assets/icons";

const MotionBox = motion(Box);

const variants = {
  hidden: { opacity: 0, translateY: -20 },
  enter: { opacity: 1, translateY: 8 },
  exit: { opacity: 0, translateY: -100 },
};

export const FaqItem = ({ q, a }) => {
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);

  const handleDisclosure = () => {
    setIsDisclosureOpen(!isDisclosureOpen);
  };

  return (
    <>
      <div className={styles.questionWrap} onClick={handleDisclosure}>
        <p className={styles.question}>{q}</p>
        <button className={styles.questionButton} type="button">
          {isDisclosureOpen ? (
            <ArrowUp className={styles.questionArrow} />
          ) : (
            <ArrowDown className={styles.questionArrow} />
          )}
        </button>
      </div>
      <MotionBox
        variants={variants}
        initial="hidden"
        animate={isDisclosureOpen ? "enter" : "hidden"}
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ display: isDisclosureOpen ? "block" : "none" }}
      >
        <p className={styles.answer}>{a}</p>
      </MotionBox>
    </>
  );
};
