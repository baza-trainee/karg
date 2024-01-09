'use client'
import { useState } from 'react';
import styles from '../Localication/styles/LanguageMenu.module.scss'

export const LanguageMenu = () => {
    const languages = ['ukr', 'eng'];
    const [selectedLanguage, setSelectedlanguage] = useState(localStorage.getItem('language') || 'ukr');
    const [isOpen, setOpen] = useState(false);

    const switchLanguage = (language) => {
        setSelectedlanguage(language);
        localStorage.setItem('language', language);
        setOpen(false);
    }

    return (
        <div className={styles.languageMenu} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className={styles.selectedLanguage}>{selectedLanguage}</div>
            <ul className={`${styles.languageList} ${isOpen ? styles.active : ''}`} >
                {languages
                    .filter(language => language !== selectedLanguage)
                    .map((language) => (
                        <li className={styles.languageItem} key={language}
                            onClick={() => switchLanguage(language)}>{language}
                        </li>
                    ))}
            </ul>
            <div><img src='/check-mark-icon.png' alt='check mark icon'></img></div>
        </div>
    );
}