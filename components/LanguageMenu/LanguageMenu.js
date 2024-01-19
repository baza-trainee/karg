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
        en: 'eng'
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
                <svg width="13" height="8">
                    <use href="/assets/icons/sprite.svg#icon-check-mark" />
                </svg>
            </div>
        </div>
    );
};

export default LanguageMenu;
