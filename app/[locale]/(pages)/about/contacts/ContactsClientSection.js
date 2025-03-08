'use client';

import { useContactLinks } from '@/app/contactLinksProvider';
import styles from "@/app/[locale]/(pages)/about/contacts/contacts.module.scss";
import SocialIcons from "@/components/SocialIcons/socialIcons";
import {
    PhoneIconContacts,
    EnvelopeIconContacts,
    ClockIconContacts,
} from "@/public/assets/icons/index";
import Image from "next/image";
import {
    contactsMobOne,
    contactsTabOne,
    contactsDeskOne,
} from "@/public/assets/images/about/contacts/index";

const ContactItem = ({ id, icon, title, data, href }) => {
    return (
        <>
            <span className={styles.contactIcon}>{icon}</span>
            <div className={styles.contactWrap}>
                <h4 className={styles.contactTitle}>{title}</h4>
                {id === 1 && (
                    <ul>
                        <li className={`${styles.contactItem} ${styles.contactItemLink}`}>
                            <a href={href[0]}>{data[0]}</a>
                        </li>
                        <li className={`${styles.contactItem} ${styles.contactItemLink}`}>
                            <a href={href[1]}>{data[1]}</a>
                        </li>
                    </ul>
                )}

                {id === 2 && (
                    <div className={styles.contactList}>
                        {data?.map((item, idx) => {
                            return (
                                <span
                                    className={`${styles.contactItem} ${styles.contactItemText}`}
                                    key={idx}
                                >
                                    {item}
                                </span>
                            );
                        })}
                    </div>
                )}
                {id === 3 && (
                    <div className={`${styles.contactItem} ${styles.contactItemLink}`}>
                        <a href={href}>{data}</a>
                    </div>
                )}
            </div>
        </>
    );
};

export default function ContactsClientSection({ translatedTexts }) {
    const {
        phone1,
        phone2,
        email,
        address
    } = useContactLinks();

    const contactsData = [
        {
            id: 1,
            icon: <PhoneIconContacts className={styles.contactSvg} />,
            title: translatedTexts.titleId1,
            data: [phone1, phone2],
            href: [`tel:${phone1}`, `tel:${phone2}`],
        },
        {
            id: 2,
            icon: <ClockIconContacts className={styles.contactSvg} />,
            title: translatedTexts.titleId2,
            data: [
                translatedTexts.dataId2Row0,
                translatedTexts.dataId2Row1,
                translatedTexts.dataId2Row2,
                translatedTexts.dataId2Row3,
                translatedTexts.dataId2Row4,
                translatedTexts.dataId2Row5,
                translatedTexts.dataId2Row6,
                translatedTexts.dataId2Row7,
                translatedTexts.dataId2Row8,
            ],
        },
        {
            id: 3,
            icon: <EnvelopeIconContacts className={styles.contactSvg} />,
            title: translatedTexts.titleId3,
            data: email,
            href: `mailto:${email}`,
        },
    ];

    return (
        <section className={styles.contacts}>
            <h3 className={styles.contactsTitle}>{translatedTexts.contactsTitle}</h3>
            <div className={styles.contactsContainer}>
                <div className={styles.contactsWrap}>
                    <ul className={styles.contactsList}>
                        {contactsData?.map((c) => {
                            return (
                                <li className={styles.contactsItem} key={c?.id}>
                                    <ContactItem
                                        id={c?.id}
                                        icon={c?.icon}
                                        title={c?.title}
                                        data={c?.data}
                                        href={c?.href}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles.socImgWrap}>
                        <Image
                            className={styles.imgMob}
                            src={contactsMobOne}
                            alt="A man is standing backside in a jacket with a signature Animal rescue team"
                            style={{
                                width: "100vw",
                                height: "100%",
                            }}
                        />
                        <Image
                            className={styles.imgTab}
                            src={contactsTabOne}
                            alt="A man is standing backside in a jacket with a signature Animal rescue team"
                            style={{
                                height: "100%",
                            }}
                        />
                        <Image
                            className={styles.imgDesk}
                            src={contactsDeskOne}
                            alt="A man is standing backside in a jacket with a signature Animal rescue team"
                            style={{
                                height: "100%",
                            }}
                        />
                        <div className={styles.contactsSoc}>
                            <h4 className={styles.contactSocTitle}>{translatedTexts.socialNetworksText}</h4>
                            <SocialIcons className={styles.iconsContacts} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}