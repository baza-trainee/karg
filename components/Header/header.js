"use client";
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  const currentPathname = usePathname();
  const labelFirst = t('common:linkAboutUs');
  const labelSecond = t('common:linkUseful');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {

  })

  const listLabelFirst = [
    { label: t('common:linkHistory'), link: "/about/history_of_origin" },
    { label: t('common:linkRules'), link: "/about/rules_of_appeal" },
    { label: t('common:linkTeam'), link: "/about/our_team" },
    { label: t('common:linkContacts'), link: "/about/contacts" }
  ];


  const listLabelSecond = [
    { label: t('common:linkAdvices'), link: "/useful/advices" },
    { label: 'FAQ', link: "/useful/faq" },
    { label: t('common:linkSummaries'), link: "/useful/results" },
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.topBar} ${isScrolled ? styles.topBarHidden : ''}`}>
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
            <DropdownProvider>
              <li>
                <Link className={(currentPathname === '/' || currentPathname === '/en') ? styles.active : ""} href={currentLocale === "uk" ? "/" : "/en"}>{t('common:linkMain')}</Link>
              </li>
              <li>
                <DropdownList label={labelFirst} list={listLabelFirst} subst="/about" />
              </li>
              <li>
                <Link className={(currentPathname === '/animals' || currentPathname === '/en/animals') ? styles.active : ""} href="/animals">{t('common:linkAnimals')}</Link>
              </li>
              <li>
                <Link className={(currentPathname === '/help' || currentPathname === '/en/help') ? styles.active : ""} href="/help">{t('common:linkHelpUs')}</Link>
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
    </header >
  );
};

export default Header;
