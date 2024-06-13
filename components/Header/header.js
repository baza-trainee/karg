"use client";

import { usePathname } from "next/navigation";
import Link from "next/link"
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

const Header = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useToggle(false);
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const currentPathname = usePathname();

  console.log(currentLocale);
  console.log(currentPathname);

  const labelFirst = t('common:linkAboutUs');

  const listLableFirst = [
    { label: t('common:linkHistory'), link: currentLocale === "uk" ? "/about/history_of_origin" : `/${currentLocale}/about/history_of_origin` },
    { label: t('common:linkRules'), link: currentLocale === "uk" ? "/about/rules_of_appeal" : `/${currentLocale}/about/rules_of_appeal` },
    { label: t('common:linkTeam'), link: currentLocale === "uk" ? "/about/our_team" : `/${currentLocale}/about/our_team` },
    { label: t('common:linkContacts'), link: currentLocale === "uk" ? "/about/contacts" : `/${currentLocale}/about/contacts` }
  ];

  const labelSecond = t('common:linkUseful');
  const listLableSecond = [
    { label: t('common:linkAdvices'), link: currentLocale === "uk" ? "/useful/advices" : `/${currentLocale}/useful/advices` },
    { label: 'FAQ', link: currentLocale === "uk" ? "/useful/faq" : `/${currentLocale}/useful/faq` },
    { label: t('common:linkSummaries'), link: currentLocale === "uk" ? "/useful/results" : `/${currentLocale}/useful/results` },
  ];

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
              <Link className={(currentPathname === '/' || currentPathname === '/en') ? styles.active : ""} href={currentLocale === "uk" ? "/" : "/en"}>{t('common:linkMain')}</Link>
            </li>
            <li>
              <DropdownList label={labelFirst} list={listLableFirst} subst="/about" />
            </li>
            <li>
              <Link className={(currentPathname === '/animals' || currentPathname === '/en/animals') ? styles.active : ""} href={currentLocale === "uk" ? "/animals" : "/en/animals"}>{t('common:linkAnimals')}</Link>
            </li>
            <li>
              <Link className={(currentPathname === '/help' || currentPathname === '/en/help') ? styles.active : ""} href="/help">{t('common:linkHelpUs')}</Link>
            </li>
            <li>
              <DropdownList label={labelSecond} list={listLableSecond} subst="/useful" />
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
                  <DropdownList label={labelFirst} list={listLableFirst} openBurgerMenu={openBurgerMenu} />
                </li>
                <li>
                  <Link href="/animals">{t('common:linkAnimals')}</Link>
                </li>
                <li>
                  <Link href="/help">{t('common:linkHelpUs')}</Link>
                </li>
                <li>
                  <DropdownList label={labelSecond} list={listLableSecond} openBurgerMenu={openBurgerMenu} />
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
    </header >
  );
};

export default Header;
