'use client'

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18nConfig from '@/i18nConfig';
import styles from './styles/LanguageMenu.module.scss'

const LanguageMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();
    const locales = i18nConfig.locales;
    const localeLables = {
        uk: 'ukr',
        en: 'eng',
        fr: 'fre'
    }
    const changeLocale = (locale) => {
        const newLocale = locale;
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = '; expires=' + date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }
        router.refresh();
        setOpen(false);
    };

    return (
        <div className={styles.languageMenu} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className={styles.selectedLanguage}>{localeLables[currentLocale]}</div>
            <ul className={`${styles.languageList} ${isOpen ? styles.active : ''}`}>
                {locales
                    .filter((locale) => locale !== currentLocale)
                    .map((locale) => (
                        <li className={styles.languageItem} key={locale} onClick={() => changeLocale(locale)}>
                            {localeLables[locale]}
                        </li>
                    ))}
            </ul>
            <div className={styles.iconContainer}>
                <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.271972 0.271972C0.634602 -0.0906574 1.22254 -0.0906574 1.58517 0.271972L6.5 5.1868L11.4148 0.271972C11.7775 -0.0906574 12.3654 -0.0906574 12.728 0.271972C13.0907 0.634602 13.0907 1.22254 12.728 1.58517L7.1566 7.1566C6.79397 7.51923 6.20603 7.51923 5.8434 7.1566L0.271972 1.58517C-0.0906574 1.22254 -0.0906574 0.634602 0.271972 0.271972Z" fill="white" />
                </svg>
            </div>
        </div>
    );
};

export default LanguageMenu;
 