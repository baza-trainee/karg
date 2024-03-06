'use client';
import React, { useState, useEffect } from 'react';
import { ArrowDown } from '@/public/assets/icons';
import styles from "../ScrollToTop/styles/scrollToTop.module.scss";

export default function ScrollToTop() {
    const isBrowser = () => typeof window !== 'undefined';

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
        setIsVisible(true);
        } else {
        setIsVisible(false);
        }
    };

    useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    }, []);


  return (
    <div className={`... scrollToTopButton ${isVisible ? 'visible' : ''}`} onClick={ scrollToTop }>
        {isVisible && 
            <div className={styles.container}>
                <ArrowDown className={styles.icon}/>
            </div>
        }
    </div>
  )
}
