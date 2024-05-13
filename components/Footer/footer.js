"use client";

import styles from "./styles/footer.module.scss";
import variables from "@/app/[locale]/variables.module.scss";

import Link from "next/link";
import {
  Logo,
  ArrowDown,
  LocationIcon,
  EmailIcon,
  PhoneIcon,
} from "@/public/assets/icons";
import { useState } from "react";
import SocialIcons from "../SocialIcons/socialIcons";
import ButtonAsLinkAsLink from "@/components/ButtonAsLink/buttonAsLink";
import { useTranslation } from 'react-i18next';

function Footer() {
  const [open, setOpen] = useState({ firstList: false, secondList: false });
  const { t } = useTranslation();

  const handleClick = (e) => {
    const target = e.currentTarget.dataset.list;
    setOpen((prevState) => ({ ...prevState, [target]: !prevState[target] }));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.brandHolder}>
        <Link href="/">
          <Logo className={styles.logo} />
        </Link>
        <h2 className={`${styles.brandHolderName} ${variables.button2}`}>
          KYIV ANIMAL RESCUE GROUP
        </h2>
      </div>
      <nav className={`${styles.navMenu} ${variables.button2}`}>
        <ul>
          <li>
            <Link href="/">{t('common:linkMain')}</Link>
          </li>
          <li>
            <p
              className={`${styles.navMenuInnerMenu}`}
              data-list="firstList"
              onClick={(e) => handleClick(e)}
            >
              <span>{t('common:linkAboutUs')}</span>
              <ArrowDown />
            </p>
            {open.firstList ? (
              <>
                <ul className={styles.navMenuInnerList}>
                  <li>
                    <Link href="/about/history_of_origin">
                      {t('common:linkHistory')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/rules_of_appeal">{t('common:linkRules')}</Link>
                  </li>
                  <li>
                    <Link href="/about/our_team">{t('common:linkTeam')}</Link>
                  </li>
                  <li>
                    <Link href="/about/contacts">{t('common:linkContacts')}</Link>
                  </li>
                </ul>
              </>
            ) : null}
          </li>
          <li>
            <Link href="/animals">{t('common:linkAnimals')}</Link>
          </li>
          <li>
            <Link href="/help">{t('common:linkHelpUs')}</Link>
          </li>
          <li>
            <p
              className={styles.navMenuInnerMenu}
              data-list="secondList"
              onClick={(e) => handleClick(e)}
            >
              <span>{t('common:linkUseful')}</span>
              <ArrowDown className={styles.arrowDownIcon} />
            </p>
            {open.secondList ? (
              <ul className={styles.navMenuInnerList}>
                <li>
                  <Link href="/useful/advices">{t('common:linkAdvices')}</Link>
                </li>
                <li>
                  <Link href="/useful/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/useful/results">{t('common:linkSummaries')}</Link>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
      </nav>
      <div className={styles.buttonAndIconsHolder}>
        <ButtonAsLinkAsLink
          route="/help"
          buttonCaption={t('common:buttonSupportText')}
          buttonStyle="primary-lite-W-288"
        />
        <div className={styles.socialIconsHolderDesktop}>
          <SocialIcons className={styles.socIcons} />
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
          <a href="https://maps.app.goo.gl/4Ra4rk12B7hkwKmM6" target="_blank">
            {t('common:address')}
          </a>
        </div>
      </div>
      <div className={styles.socialIconsHolderMobile}>
        <SocialIcons className={styles.socIcons} />
      </div>
      <p className={styles.signature}>
        {t('common:copyright')}
      </p>
    </footer>
  );
}

export default Footer;
