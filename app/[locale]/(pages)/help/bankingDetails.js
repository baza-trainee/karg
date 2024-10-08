'use client';
import React, { useState } from 'react';
import styles from './styles/help.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
import BankingCard from './bankingCard';

const BankingDetails = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error('error: ', err);
        });
    };

    const bankingDetails_text = {
        usd: {
            swift: [{ label: 'IBAN', value: 'UA303220010000026202326656577' },
            { label: 'SWIFT/BIC code', value: 'UNJSUAUKXXX' },
            { label: 'Receiver', value: 'STOROZHUK MYKHAILO' },
            { label: 'Address', address: '01001, Ukraine, c. Kyiv, ave. Peremohy, build. 99/1, fl. 13' }
            ]
        },
        eur: {
            swift: [
                { label: 'IBAN', value: 'UA223220010000026204326655101' },
                { label: 'SWIFT/BIC code', value: 'UNJSUAUKXXX' },
                { label: 'Receiver', value: 'STOROZHUK MYKHАЙЛО' },
                { label: 'Address', address: '01001, Ukraine, c. Kyiv, ave. Peremohy, build. 99/1, fl. 13' }
            ],
            sepa: [
                { label: 'IBAN', value: 'GB07CLJU00997182234651' },
                { label: 'BIC code', value: 'CLJUGB21' },
                { label: 'Receiver', value: 'STOROZHUK MYKHAILO' },
            ]
        }

    };

    return (
        <div className={styles.bankingDetails_Container}>
            <div className={styles.bankingDetails_cardsContainer}>
                <BankingCard title="USD (SWIFT)" details={bankingDetails_text.usd.swift} copyToClipboard={copyToClipboard} />
                <BankingCard title="EUR (SWIFT)" details={bankingDetails_text.eur.swift} copyToClipboard={copyToClipboard} />
                <BankingCard title="EUR (SEPA)" details={bankingDetails_text.eur.sepa} copyToClipboard={copyToClipboard} />
            </div>
            <div className={`${styles.bankingDetails_toast} ${copied ? styles.bankingDetails_toast_show : ''}`}>
                <div className={styles.bankingDetails_toast_content}>
                    <span>Copied to clipboard!</span>
                </div>
            </div>
        </div>
    );
};

export default BankingDetails;