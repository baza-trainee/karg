'use client';

import styles from './styles/footer.module.scss';
import variables from "@/app/[locale]/variables.module.scss";

import Link from "next/link";
import { Logo, ArrowDown, LocationIcon, EmailIcon, PhoneIcon } from "@/public/assets/icons";
import { useState } from 'react';
import SocialIcons from '../SocialIcons/socialIcons';
import ButtonAsLinkAsLink from '@/components/ButtonAsLink/buttonAsLink';

function Footer() {

    const [open, setOpen] = useState({ firstList: false, secondList: false });

    const handleClick = (e) => {
        const target = e.currentTarget.dataset.list;
        setOpen(prevState => ({ ...prevState, [target]: !prevState[target] }));
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.brandHolder}>
                <Link href="/">
                    <Logo className={styles.logo} />
                </Link>
                <h2 className={`${styles.brandHolderName} ${variables.button2}`}>KYIV ANIMAL RESCUE GROUP</h2>
            </div>
            <nav className={`${styles.navMenu} ${variables.button2}`}>
                <ul>
                    <li ><Link href="/">Головна</Link></li>
                    <li><p className={`${styles.navMenuInnerMenu}`} data-list="firstList" onClick={(e) => handleClick(e)}><span>Про нас</span><ArrowDown /></p>
                        {open.firstList ? <>
                            <ul className={styles.navMenuInnerList}>
                                <li><Link href="/about/history_of_origin">
                                    Історія виникнення
                                </Link></li>
                                <li><Link href="/about/rules_of_appeal">
                                    Правила звернення
                                </Link></li>
                                <li><Link href="/about/our_team">Наша команда</Link></li>
                                <li><Link href="/about/contacts">Контакти</Link></li>
                            </ul>
                        </> : null}
                    </li>
                    <li ><Link href="/animals">Наші тварини</Link></li>
                    <li><Link href="/help">Допомогти нам</Link></li>
                    <li><p className={styles.navMenuInnerMenu} data-list="secondList" onClick={(e) => handleClick(e)}><span>Корисне</span><ArrowDown className={styles.arrowDownIcon} /></p>
                        {open.secondList ? <ul className={styles.navMenuInnerList}>
                            <li><Link href="/useful">Поради</Link></li>
                            <li><Link href="/useful/faq">FAQ</Link></li>
                            <li><Link href="/useful/results">Підсумки</Link></li>
                        </ul> : null}
                    </li>
                </ul>
            </nav>
            <div className={styles.buttonAndIconsHolder}>
                <ButtonAsLinkAsLink route="/help" buttonCaption="Підтримати" buttonStyle="primary-lite-W-288" />
                <div className={styles.socialIconsHolderDesktop}>
                    <SocialIcons iconsColor='#A1A1A1' />
                </div>
            </div>
            <div className={`${styles.contactsContainer} ${variables.button2}`}>
                <div className={styles.contactsContainerHolder}>
                    <PhoneIcon className={styles.contactsContainerIcons} />
                    <div className={styles.contactsContainerTelephones}>
                        <a href="tel: +380939862262">+38 (093) 986-2262</a>
                        <a href="tel: +380988447937">+38 (098) 844-7937</a>
                    </div>
                </div>
                <div className={styles.contactsContainerEmail}>
                    <EmailIcon className={styles.contactsContainerIcons} />
                    <a href="mailto: karg.inform@gmail.com">karg.inform@gmail.com</a>
                </div>
                <div className={styles.contactsContainerLocation}>
                    <LocationIcon className={styles.contactsContainerIcons} />
                    <a href="https://maps.app.goo.gl/4Ra4rk12B7hkwKmM6" target="_blank">м. Київ</a>
                </div>
            </div>
            <div className={styles.socialIconsHolderMobile}><SocialIcons iconsColor='#A1A1A1' /></div>
            <p className={styles.signature}>Розробка Baza Trainee Ukraine © 2023 Всі права захищені</p>
        </footer>
    );
}

export default Footer;