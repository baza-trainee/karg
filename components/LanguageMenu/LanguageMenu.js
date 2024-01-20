'use client'

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import i18nConfig from '@/i18nConfig';
import styles from './styles/LanguageMenu.module.scss'
import variables from "@/app/[locale]/variables.module.scss";
import { ArrowDown } from "@/public/assets/icons";
import { useMediaQuery } from 'react-responsive';

const LanguageMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const { i18n } = useTranslation();
    const router = useRouter();
    const currentLocale = i18n.language;
    const currentPathname = usePathname();
    const locales = i18nConfig.locales;
    const localeLables = {
        uk: 'ukr',
        en: 'eng'
    };
    const isMobile = useMediaQuery({ maxWidth: 767 });

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

    const handleMenuClick = () => {
        if (isMobile) {
            setOpen(!isOpen);
        }
    };

    const handleMenuHover = () => {
        if (!isMobile) {
            setOpen(true);
        }
    };

    const handleMenuLeave = () => {
        if (!isMobile) {
            setOpen(false);
        }
    };

    return (
        <div
            className={`${styles.languageMenu} ${variables.button2}`}
            onClick={handleMenuClick}
            onMouseOver={handleMenuHover}
            onMouseLeave={handleMenuLeave}
        >
            <div>{localeLables[currentLocale]}</div>
            <ul className={`${styles.languageList} ${isOpen ? styles.active : ''}`}>
                {locales.map((locale) => (
                    <li className={styles.languageItem} key={locale} onClick={() => changeLocale(locale)}>
                        {localeLables[locale]}
                    </li>
                ))}
            </ul>
            <ArrowDown />
        </div>
    );
};

export default LanguageMenu;


