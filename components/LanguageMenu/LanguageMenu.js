'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import i18nConfig from '@/i18nConfig';
import styles from './styles/LanguageMenu.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
import { ArrowDown } from "@/public/assets/icons";

const LanguageMenu = () => {
    const [isOpen, setOpen] = useState(false);
    const { i18n } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locales = i18nConfig.locales;
    const defaultLocale = i18nConfig.defaultLocale;

    const getCurrentLocale = () => {
        const segments = pathname.split('/').filter(Boolean);
        return segments.length > 0 && locales.includes(segments[0]) ? segments[0] : defaultLocale;
    };

    const [currentLocale, setCurrentLocale] = useState(getCurrentLocale);

    const localeLabels = {
        uk: 'ukr',
        en: 'eng'
    };

    const changeLocale = (newLocale) => {
        if (newLocale === currentLocale) return;
        let segments = pathname.split('/').filter(Boolean);

        if (locales.includes(segments[0])) {
            segments.shift();
        }
        let newPathname = newLocale === defaultLocale
            ? `/${segments.join('/')}`
            : `/${newLocale}/${segments.join('/')}`;

        const queryString = searchParams.toString();
        if (queryString) {
            newPathname += `?${queryString}`;
        }
        router.push(newPathname, { scroll: false });
    };

    useEffect(() => {
        const newLocale = getCurrentLocale();
        setCurrentLocale(newLocale);
        i18n.changeLanguage(newLocale);
    }, [pathname]);

    const handleMenuToggle = () => {
        setOpen(!isOpen);
    };

    const wrapRef = useRef(null);
    const handleClickOutsideMenu = (event) => {
        if (wrapRef.current && !wrapRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, []);

    return (
        <div className={`${styles.languageMenu} ${variables.button2}`} onClick={handleMenuToggle} ref={wrapRef}>
            <div className={styles.languageMenuIndicator}>{localeLabels[currentLocale]}</div>
            <ul className={`${styles.languageList} ${isOpen ? styles.active : ''}`}>
                {locales.map((locale) => (
                    <li className={styles.languageItem} key={locale} onClick={() => changeLocale(locale)}>
                        {localeLabels[locale]}
                    </li>
                ))}
            </ul>
            <ArrowDown className={styles.languageMenuIndicator} />
        </div>
    );
};

export default LanguageMenu;
