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
import { useContactLinks } from '@/app/contactLinksProvider';

const Header = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useToggle(false);
  const {
    phone1,
    phone2,
    email,
    address
  } = useContactLinks();

  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const defaultLocale = i18nConfig.defaultLocale;
  const currentPathname = usePathname();
  const localizedPath = (path) => currentLocale === 'uk' ? path : `/${currentLocale}${path}`;

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
    { label: t('common:linkHistory'), link: localizedPath("/about/history_of_origin") },
    { label: t('common:linkRules'), link: localizedPath("/about/rules_of_appeal") },
    { label: t('common:linkTeam'), link: localizedPath("/about/our_team") },
    { label: t('common:linkContacts'), link: localizedPath("/about/contacts") }
  ];


  const listLabelSecond = [
    { label: t('common:linkAdvices'), link: localizedPath("/useful/advices") },
    { label: 'FAQ', link: localizedPath("/useful/faq") },
    { label: t('common:linkSummaries'), link: localizedPath("/useful/results") },
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.topBar} ${isScrolled ? styles.topBarHidden : ''}`}>
        <a className={variables.mainSubtitle_shared} href={`tel: ${phone1}`}>
          {phone1}
        </a>
        <SocialIcons className={styles.socIcons} />
        <a className={variables.mainSubtitle_shared} href={`tel: ${phone2}`}>
          {phone2}
        </a>
      </div>
      <nav className={styles.headerContainer}>
        <div className={styles.inner}>
          <Link href={localizedPath("/")}>
            <Logo className={styles.logo} />
          </Link>
          <ul className={`${styles.navMenu} ${variables.button2}`}>
            <DropdownProvider>
              <li>
                <Link className={((!isEn && currentPathname === '/') || (isEn && currentPathname === '/en')) ? styles.active : ""} href={localizedPath("/")}>{t('common:linkMain')}</Link>
              </li>
              <li>
                <DropdownList label={labelFirst} list={listLabelFirst} subst="/about" />
              </li>
              <li>
                <Link className={(currentPathname === '/animals' || currentPathname === '/en/animals') ? styles.active : ""} href={localizedPath("/animals")}>{t('common:linkAnimals')}</Link>
              </li>
              <li>
                <Link className={(currentPathname === '/help' || currentPathname === '/en/help') ? styles.active : ""} href={localizedPath("/help")}>{t('common:linkHelpUs')}</Link>
              </li>
              <li>
                <DropdownList label={labelSecond} list={listLabelSecond} subst="/useful" />
              </li>
            </DropdownProvider>
          </ul>
          <div className={styles.sideMenu}>
            <LanguageMenu />
            <ButtonAsLink
              route={localizedPath("/help")}
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
                    <Link className={((currentPathname === '/' && currentLocale === "uk") || currentPathname === '/en') ? styles.active : ""} href={localizedPath("/")}>{t('common:linkMain')}</Link>
                  </li>
                  <li>
                    <DropdownList label={labelFirst} list={listLabelFirst} openBurgerMenu={openBurgerMenu} />
                  </li>
                  <li>
                    <Link className={((currentPathname === '/animals' && currentLocale === "uk") || currentPathname === '/en/animals') ? styles.active : ""} href={localizedPath("/animals")}>{t('common:linkAnimals')}</Link>
                  </li>
                  <li>
                    <Link className={((currentPathname === '/help' && currentLocale === "uk") || currentPathname === '/en/help') ? styles.active : ""} href={localizedPath("/help")}>{t('common:linkHelpUs')}</Link>
                  </li>
                  <li>
                    <DropdownList label={labelSecond} list={listLabelSecond} openBurgerMenu={openBurgerMenu} />
                  </li>
                </DropdownProvider>
              </ul>
            </div>
            <ButtonAsLink
              route={localizedPath("/help")}
              buttonCaption={t('common:buttonSupportText')}
              buttonStyle="primary-dark-W-288"
            />
            <div
              className={`${styles.contactsContainerMobile}`}
            >
              <a href={`tel: ${phone1}`}>{phone1}</a>
              <a href={`tel: ${phone2}`}>{phone2}</a>
              <a href={`mailto: ${email}`}>{email}</a>
              <a>
                {currentLocale === 'uk' ? address[0] : address[1] || t('common:address')}
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
