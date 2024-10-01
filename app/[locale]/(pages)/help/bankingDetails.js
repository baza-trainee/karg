'use client';
import React, { useState } from 'react';
import styles from './styles/help.module.scss';
import variables from "@/app/[locale]/variables.module.scss";
import { Copy_icon } from "@/public/assets/icons/help";

const BankingDetails = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch((err) => {
            console.error('Ошибка при копировании текста: ', err);
        });
    };

    return (
        <div className={styles.bankingDetails_Container}>
            <div className={styles.bankingDetails_cardsContainer}>
                <div className={styles.bankingDetails_card}>
                    <h4 className={`${styles.bankingDetails_cardTitle} ${variables.mobileSubtitle1}`}>
                        USD
                    </h4>
                    <div className={`${styles.bankingDetails_cardText} ${variables.mobileText2}`}>
                        <dl>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>SWIFT</strong></dt>
                                <dd></dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>IBAN:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('UA303220010000026202326656577')}>
                                    <span>UA303220010000026202326656577</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>SWIFT/BIC code:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('UNJSUAUKXXX')}>
                                    <span>UNJSUAUKXXX</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>Receiver:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('STOROZHUK MYKHAILO')}>
                                    <span>STOROZHUK MYKHAILO</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>Address:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('01001, Ukraine, c. Kyiv, ave. Peremohy, build. 99/1, fl. 13')}>
                                    <address>
                                        01001, Ukraine, c. Kyiv, ave. Peremohy, build. 99/1, fl. 13
                                    </address>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className={styles.bankingDetails_card}>
                    <h4 className={`${styles.bankingDetails_cardTitle} ${variables.mobileSubtitle1}`}>
                        EUR
                    </h4>
                    <div className={`${styles.bankingDetails_cardText} ${variables.mobileText2}`}>
                        <dl>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>SEPA</strong></dt>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>IBAN:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('GB07CLJU00997182234651')}>
                                    <span>GB07CLJU00997182234651</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>BIC code:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('CLJUGB21')}>
                                    <span>CLJUGB21</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>Receiver:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('STOROZHUK MYKHAILO')}>
                                    <span>STOROZHUK MYKHAILO</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>SWIFT</strong></dt>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>IBAN:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('UA223220010000026204326655101')}>
                                    <span>UA223220010000026204326655101</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>SWIFT/BIC code:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('UNJSUAUKXXX')}>
                                    <span>UNJSUAUKXXX</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>Receiver:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('STOROZHUK MYKHAILO')}>
                                    <span>STOROZHUK MYKHАЙЛО</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                            <div className={styles.bankingDetails_textItem}>
                                <dt><strong>Address:</strong></dt>
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard('01001, Ukraine, c. Kyiv, ave. Peremohy, build. 99/1, fl. 13')}>
                                    <address>
                                        01001, Ukraine, c. Kyiv, ave. Peremohy, build. 99/1, fl. 13
                                    </address>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <div className={`${styles.bankingDetails_toast} ${copied ? styles.bankingDetails_toast_show : ''}`}>
                <div className={styles.bankingDetails_toast_content}>
                    <span>Скопійовано!</span>
                </div>
            </div>
        </div>
    );
};

export default BankingDetails;