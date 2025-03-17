'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from '@/i18nConfig';

const LocaleSync = () => {
    const pathname = usePathname();
    const { i18n } = useTranslation();
    const extractLocaleFromPath = (path) => {
        const segments = path.split("/");
        return segments.length > 1 && i18nConfig.locales.includes(segments[1]) ? segments[1] : i18nConfig.defaultLocale;
    };

    useEffect(() => {
        const localeFromUrl = extractLocaleFromPath(pathname);
        if (i18n.language !== localeFromUrl) {
            i18n.changeLanguage(localeFromUrl);
        }
    }, [pathname, i18n]);

    return null;
};

export default LocaleSync;
