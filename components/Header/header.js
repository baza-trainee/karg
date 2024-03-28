"use client";

import Link from "next/link";
import useToggle from "@/utils/useToggle";

import styles from "./styles/header.module.scss";
import variables from "@/app/[locale]/variables.module.scss";

import {
  Logo,
  MenuBurger,
  MenuBurgerClose,
  ArrowDown,
} from "@/public/assets/icons";

import LanguageMenu from "../LanguageMenu/LanguageMenu";
import ButtonAsLink from "../ButtonAsLink/buttonAsLink";
import SocialIcons from "../SocialIcons/socialIcons";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useToggle(false);
  const [openFirst, setFirstOpen] = useToggle(false);
  const [openSecond, setSecondOpen] = useToggle(false);
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <a className={variables.subtitle1} href="tel: +380939862262">
          +38 (093) 986-2262
        </a>
        <SocialIcons className={styles.socIcons} />
        <a className={variables.subtitle1} href="tel: +380988447937">
          +38 (098) 844-7937
        </a>
      </div>
      <nav className={styles.headerContainer}>
        <div className={styles.inner}>
          <Link href="/">
            <Logo className={styles.logo} />
          </Link>
          <ul className={`${styles.navMenu} ${variables.button2}`}>
            <li>
              <Link href="/">{t('common:linkMain')}</Link>
            </li>
            <li className={styles.dropHover}>
              <p className={`${styles.navMenuDropList} ${styles.ArrowDown}`}>
                <span>{t('common:linkAboutUs')}</span>
                <ArrowDown />
              </p>
              <ul
                className={`${styles.navMenu} ${variables.button2} ${styles.dropList}`}
              >
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
            </li>
            <li>
              <Link href="/animals">{t('common:linkAnimals')}</Link>
            </li>
            <li>
              <Link href="/help">{t('common:linkHelpUs')}</Link>
            </li>
            <li className={styles.dropHover}>
              <p className={styles.navMenuDropList}>
                <span>{t('common:linkUseful')}</span>
                <ArrowDown />
              </p>
              <ul
                className={`${styles.navMenu} ${variables.button2} ${styles.dropList}`}
              >
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
            </li>
          </ul>
          <div className={styles.sideMenu}>
            <LanguageMenu />
            <ButtonAsLink
              route="/help"
              buttonCaption={t('common:buttonSupportText')}
              buttonStyle="header-primary-button-default"
            />
            <div onClick={setOpenBurgerMenu}>
              {openBurgerMenu == false ? (
                <MenuBurger className={styles.burgerIcon} />
              ) : (
                <MenuBurgerClose className={styles.burgerIcon} />
              )}
            </div>
          </div>
        </div>
        {openBurgerMenu == true ? (
          <div className={styles.dropDownMenuWrapper}>
            <div className={`${styles.navMenuMobile} ${variables.button2}`}>
              <ul>
                <li>
                  <Link href="/">{t('common:linkMain')}</Link>
                </li>
                <li>
                  <p className={styles.navMenuInnerMenu} onClick={setFirstOpen}>
                    <span>{t('common:linkAboutUs')}</span>
                    <ArrowDown />
                  </p>
                  {openFirst ? (
                    <ul className={styles.navMenuInnerList}>
                      <li>
                        <Link href="/about/history_of_origin">
                          {t('common:linkHistory')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/rules_of_appeal">
                          {t('common:linkRules')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/our_team">{t('common:linkTeam')}</Link>
                      </li>
                      <li>
                        <Link href="/about/contacts">{t('common:linkContacts')}</Link>
                      </li>
                    </ul>
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
                    onClick={setSecondOpen}
                  >
                    <span>{t('common:linkUseful')}</span>
                    <ArrowDown />
                  </p>
                  {openSecond ? (
                    <ul className={styles.navMenuInnerList}>
                      <li>
                        <Link href="/useful">{t('common:linkAdvices')}</Link>
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
            </div>
            <ButtonAsLink
              route="/help"
              buttonCaption={t('common:buttonSupportText')}
              buttonStyle="primary-dark-W-288"
            />
            <div
              className={`${styles.contactsContainerMobile} ${variables.button2}`}
            >
              <a href="tel: +380939862262">+38 (093) 986-2262</a>
              <a href="tel: +380988447937">+38 (098) 844-7937</a>
              <a href="mailto: karg.inform@gmail.com">karg.inform@gmail.com</a>
              <a
                href="https://maps.app.goo.gl/4Ra4rk12B7hkwKmM6"
                target="_blank"
              >
                {t('common:address')}
              </a>
            </div>
            <SocialIcons iconsColor="#3a3345" />
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
