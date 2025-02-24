"use client";
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import i18nConfig from '@/i18nConfig';
import useToggle from "@/utils/useToggle";
import styles from "./styles/header.module.scss";
import variables from "@/app/[locale]/variables.module.scss";

import {
  Logo,
  MenuBurger,
  MenuBurgerClose,
} from "@/public/assets/icons";

import LanguageMenu from "../LanguageMenu/LanguageMenu";
import ButtonAsLink from "../ButtonAsLink/buttonAsLink";
import SocialIcons from "../SocialIcons/socialIcons";
import { useTranslation } from 'react-i18next';
import DropdownList from '../DropdownList/DropdownList';
import { DropdownProvider } from "../DropdownList/DropdownContext";

const Header = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useToggle(false);
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const defaultLocale = i18nConfig.defaultLocale;
  const currentPathname = usePathname();
  const labelFirst = t('common:linkAboutUs');
  const labelSecond = t('common:linkUseful');
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollHideThreshold = 70;
  const scrollShowThreshold = 30;

  let isEn = (defaultLocale === currentLocale) ? false : true;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > scrollHideThreshold && currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } else if (currentScrollY < scrollShowThreshold && currentScrollY < lastScrollY) {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, scrollHideThreshold, scrollShowThreshold]);

  const listLabelFirst = [
    { label: t('common:linkHistory'), link: !isEn ? "/about/history_of_origin" : "/en/about/history_of_origin" },
    { label: t('common:linkRules'), link: !isEn ? "/about/rules_of_appeal" : "/en/about/rules_of_appeal" },
    { label: t('common:linkTeam'), link: !isEn ? "/about/our_team" : "/en/about/our_team" },
    { label: t('common:linkContacts'), link: !isEn ? "/about/contacts" : "/en/about/contacts" }
  ];


  const listLabelSecond = [
    { label: t('common:linkAdvices'), link: !isEn ? "/useful/advices" : "/en/useful/advices" },
    { label: 'FAQ', link: !isEn ? "/useful/faq" : "/en/useful/faq" },
    { label: t('common:linkSummaries'), link: !isEn ? "/useful/results" : "/useful/results" },
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.topBar} ${isScrolled ? styles.topBarHidden : ''}`}>
        <a className={variables.mainSubtitle_shared} href="tel: +380939862262">
          +38 (093) 986-2262
        </a>
        <SocialIcons className={styles.socIcons} />
        <a className={variables.mainSubtitle_shared} href="tel: +380988447937">
          +38 (098) 844-7937
        </a>
      </div>
      <nav className={styles.headerContainer}>
        <div className={styles.inner}>
          <Link href="/">
            <Logo className={styles.logo} />
          </Link>
          <ul className={`${styles.navMenu} ${variables.button2}`}>
            <DropdownProvider>
              <li>
                <Link className={((!isEn && currentPathname === '/') || (isEn && currentPathname === '/en')) ? styles.active : ""} href={!isEn ? "/" : "/en"}>{t('common:linkMain')}</Link>
              </li>
              <li>
                <DropdownList label={labelFirst} list={listLabelFirst} subst="/about" />
              </li>
              <li>
                <Link className={(currentPathname === '/animals' || currentPathname === '/en/animals') ? styles.active : ""} href={!isEn ? "/animals" : "/en/animals"}>{t('common:linkAnimals')}</Link>
              </li>
              <li>
                <Link className={(currentPathname === '/help' || currentPathname === '/en/help') ? styles.active : ""} href={!isEn ? "/help" : "/en/help"}>{t('common:linkHelpUs')}</Link>
              </li>
              <li>
                <DropdownList label={labelSecond} list={listLabelSecond} subst="/useful" />
              </li>
            </DropdownProvider>
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
                <DropdownProvider>
                  <li>
                    <Link className={((currentPathname === '/' && currentLocale === "uk") || currentPathname === '/en') ? styles.active : ""} href={currentLocale === "uk" ? "/" : "/en"}>{t('common:linkMain')}</Link>
                  </li>
                  <li>
                    <DropdownList label={labelFirst} list={listLabelFirst} openBurgerMenu={openBurgerMenu} />
                  </li>
                  <li>
                    <Link className={((currentPathname === '/animals' && currentLocale === "uk") || currentPathname === '/en/animals') ? styles.active : ""} href={"/animals"}>{t('common:linkAnimals')}</Link>
                  </li>
                  <li>
                    <Link className={((currentPathname === '/help' && currentLocale === "uk") || currentPathname === '/en/help') ? styles.active : ""} href={"/help"}>{t('common:linkHelpUs')}</Link>
                  </li>
                  <li>
                    <DropdownList label={labelSecond} list={listLabelSecond} openBurgerMenu={openBurgerMenu} />
                  </li>
                </DropdownProvider>
              </ul>
            </div>
            <ButtonAsLink
              route="/help"
              buttonCaption={t('common:buttonSupportText')}
              buttonStyle="primary-dark-W-288"
            />
            <div
              className={`${styles.contactsContainerMobile}`}
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
            <SocialIcons className={styles.socIconsMobile} />
          </div>
        ) : null}
      </nav>
    </header >
  );
};

export default Header;
