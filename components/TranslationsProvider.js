'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';
import { useState, useEffect, useRef } from 'react';

export default function TranslationsProvider({ children, locale, namespaces, resources }) {
    const i18nRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!i18nRef.current) {
            i18nRef.current = createInstance();

            initTranslations(locale, namespaces, i18nRef.current, resources)
                .then(() => setIsReady(true))
                .catch(err => {
                    console.error("i18n initialization error:", err);
                    setIsReady(true);
                });
        }
    }, [locale, namespaces, resources]);

    if (!isReady) {
        return null;
    }
    return <I18nextProvider i18n={i18nRef.current}>{children}</I18nextProvider>;
}
