'use client';
import React, { useState, useEffect } from 'react';
import { ScrollArrowMob, ScrollArrowDesk } from '@/public/assets/icons';
import styles from "../ScrollToTop/styles/scrollToTop.module.scss";

export default function ScrollToTop() {
  const isBrowser = () => typeof window !== 'undefined';
  const clientInnerHeight = typeof window !== 'undefined' && window.innerHeight;

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isReachedBottom, setIsReachedBottom] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > clientInnerHeight) {
      setIsVisible(true);
    }
    else {
      setIsVisible(false);
    }
  };

  const handleDetectPageBottom = () => {
    if ((window.innerWidth < 834) && (window.innerHeight + window.scrollY >= document.body.scrollHeight - 637)) {
      // you're at the bottom of the page
      setIsReachedBottom(true);
    }
    if ((window.innerWidth >= 834) && (window.innerWidth <= 1199) && (window.innerHeight + window.scrollY >= document.body.scrollHeight - 624)) {
      setIsReachedBottom(true);
    }
    if ((window.innerWidth >= 1200) && (window.innerWidth <= 1440) && (window.innerHeight + window.scrollY >= document.body.scrollHeight - 339)) {
      setIsReachedBottom(true);
    }
    if ((window.innerWidth >= 1441) && (window.innerHeight + window.scrollY >= document.body.scrollHeight - 339)) {
      setIsReachedBottom(true);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleDetectPageBottom);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleDetectPageBottom);
    };
  }, [isReachedBottom, isVisible]);


  return (
    <div className={`...scrollToTopButton ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      {isVisible &&
        <div className={isReachedBottom ? styles.scrollBtnMargin : styles.container}>
          <ScrollArrowMob className={styles.iconMob} />
          <ScrollArrowDesk className={styles.iconDesk} />
        </div>
      }
    </div>
  )
}
