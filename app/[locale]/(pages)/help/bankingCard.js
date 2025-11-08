import React from 'react';
import styles from './styles/help.module.scss';
import { Copy_icon } from "@/public/assets/icons/help";

const BankingCard = ({ title, details, copyToClipboard }) => {
    return (
        <div className={styles.bankingDetails_card}>
            <h4 className={`${styles.bankingDetails_cardTitle}`}>
                {title}
            </h4>
            <div className={`${styles.bankingDetails_cardText}`}>
                <dl>
                    {details.map((item, index) => (
                        <div key={index} className={styles.bankingDetails_textItem}>
                            <dt><strong>{item.label}</strong></dt>
                            {item.value && (
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard(item.value)}>
                                    <span>{item.value}</span>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            )}
                            {item.address && (
                                <dd className={styles.bankingDetails_IconItem} onClick={() => copyToClipboard(item.address)}>
                                    <address>{item.address}</address>
                                    <Copy_icon className={styles.copy_icon} />
                                </dd>
                            )}
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default BankingCard;