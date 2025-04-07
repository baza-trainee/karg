"use client";
import styles from "./styles/footer.module.scss";

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
import ButtonAsLink from "@/components/ButtonAsLink/buttonAsLink";
import { useTranslation } from 'react-i18next';
import { useContactLinks } from '@/app/contactLinksProvider';

function Footer() {
  const [open, setOpen] = useState({ firstList: false, secondList: false });
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const localizedPath = (path) => currentLocale === 'uk' ? path : `/${currentLocale}${path}`;

  const {
    phone1,
    phone2,
    email,
    address
  } = useContactLinks();

  const handleClick = (e) => {
    const target = e.currentTarget.dataset.list;
    // setOpen((prevState) => ({ ...prevState, [target]: !prevState[target] }));
    setOpen((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach(key => {
        if (key === target) {
          newState[key] = !prevState[key];
          return;
        } else {
          newState[key] = false;
        }
      });
      return newState;
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.brandHolder}>
        <Link href={localizedPath("/")}>
          <Logo className={styles.logo} />
        </Link>
        <h2 className={`${styles.brandHolderName}`}>
          KYIV ANIMAL RESCUE GROUP
        </h2>
      </div>
      <nav className={`${styles.navMenu}`}>
        <ul>
          <li>
            <Link href={localizedPath("/")}>{t('common:linkMain')}</Link>
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
                    <Link href={localizedPath("/about/history_of_origin")}>
                      {t('common:linkHistory')}
                    </Link>
                  </li>
                  <li>
                    <Link href={localizedPath("/about/rules_of_appeal")}>{t('common:linkRules')}</Link>
                  </li>
                  <li>
                    <Link href={localizedPath("/about/our_team")}>{t('common:linkTeam')}</Link>
                  </li>
                  <li>
                    <Link href={localizedPath("/about/contacts")}>{t('common:linkContacts')}</Link>
                  </li>
                </ul>
              </>
            ) : null}
          </li>
          <li>
            <Link href={localizedPath("/animals")}>{t('common:linkAnimals')}</Link>
          </li>
          <li>
            <Link href={localizedPath("/help")}>{t('common:linkHelpUs')}</Link>
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
                  <Link href={localizedPath("/useful/advices")}>{t('common:linkAdvices')}</Link>
                </li>
                <li>
                  <Link href={localizedPath("/useful/faq")}>FAQ</Link>
                </li>
                <li>
                  <Link href={localizedPath("/useful/results")}>{t('common:linkSummaries')}</Link>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
      </nav>
      <div className={styles.buttonAndIconsHolder}>
        <ButtonAsLink
          route={localizedPath("/help")}
          buttonCaption={t('common:buttonSupportText')}
          buttonStyle="primary-lite-W-288"
        />
        <div className={styles.socialIconsHolderDesktop}>
          <SocialIcons className={styles.socIcons} />
        </div>
      </div>
      <div className={`${styles.contactsContainer}`}>

        <div className={styles.contactsContainerHolder}>
          <PhoneIcon className={styles.contactsContainerIcons} />
          <div className={styles.contactsContainerTelephones}>
            <a href={`tel: ${phone1}`}>{phone1}</a>
            <a href={`tel: ${phone2}`}>{phone2}</a>
          </div>
        </div>

        <div className={styles.contactsContainerEmail}>
          <EmailIcon className={styles.contactsContainerIcons} />
          <a href={`mailto: ${email}`}>{email}</a>
        </div>

        <div className={styles.contactsContainerLocation}>
          <LocationIcon className={styles.contactsContainerIcons} />
          <a>{currentLocale === 'uk' ? address[0] : address[1] || t('common:address')}</a>
        </div>

      </div>

      <div className={styles.socialIconsHolderMobile}>
        <SocialIcons className={styles.socIcons} />
      </div>

      <div className={styles.documentsLinksHolder}>
        <ul className={styles.navMenuRules}>
          <li>
            <Link href={localizedPath("/documents/statut")}>{t('common:statut')}</Link>
          </li>
          <li>
            <Link href={localizedPath("/documents/privacy_policy")}>{t('common:privacy_policy')}</Link>
          </li>
          <li>
            <Link href={localizedPath("/documents/terms_of_use")}>{t('common:website_rules')}</Link>
          </li>
        </ul>
      </div>

      <p className={styles.signature}>
        {t('common:copyright')}
      </p>
    </footer>
  );
}

export default Footer;
