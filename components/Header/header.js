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

const Header = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useToggle(false);
  const [openFirst, setFirstOpen] = useToggle(false);
  const [openSecond, setSecondOpen] = useToggle(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <a className={variables.subtitle1} href="tel: +380939862262">
          +38 (093) 986-2262
        </a>
        <SocialIcons iconsColor="#A1A1A1" />
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
              <Link href="/">Головна</Link>
            </li>
            <li className={styles.dropHover}>
              <p className={`${styles.navMenuDropList} ${styles.ArrowDown}`}>
                <span>Про нас</span>
                <ArrowDown />
              </p>
              <ul
                className={`${styles.navMenu} ${variables.button2} ${styles.dropList}`}
              >
                <li>
                  <Link href="/about/history_of_origin">
                    Історія виникнення
                  </Link>
                </li>
                <li>
                  <Link href="/about/rules_of_appeal">Правила звернення</Link>
                </li>
                <li>
                  <Link href="/about/our_team">Наша команда</Link>
                </li>
                <li>
                  <Link href="/about/contacts">Контакти</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/animals">Наші тварини</Link>
            </li>
            <li>
              <Link href="/help">Допомогти нам</Link>
            </li>
            <li className={styles.dropHover}>
              <p className={styles.navMenuDropList}>
                <span>Корисне</span>
                <ArrowDown />
              </p>
              <ul
                className={`${styles.navMenu} ${variables.button2} ${styles.dropList}`}
              >
                <li>
                  <Link href="/useful">Поради</Link>
                </li>
                <li>
                  <Link href="/useful/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/useful/results">Підсумки</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className={styles.sideMenu}>
            {/* <select className={styles.langContainer}>
              <option value="UKR">UKR</option>
              <option value="ENG">ENG</option>
            </select> */}
            <LanguageMenu />
            <ButtonAsLink
              route="/help"
              buttonCaption="Підтримати"
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
                  <Link href="/">Головна</Link>
                </li>
                <li>
                  <p className={styles.navMenuInnerMenu} onClick={setFirstOpen}>
                    <span>Про нас</span>
                    <ArrowDown />
                  </p>
                  {openFirst ? (
                    <ul className={styles.navMenuInnerList}>
                      <li>
                        <Link href="/about/history_of_origin">
                          Історія виникнення
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/rules_of_appeal">
                          Правила звернення
                        </Link>
                      </li>
                      <li>
                        <Link href="/about/our_team">Наша команда</Link>
                      </li>
                      <li>
                        <Link href="/about/contacts">Контакти</Link>
                      </li>
                    </ul>
                  ) : null}
                </li>
                <li>
                  <Link href="/animals">Наші тварини</Link>
                </li>
                <li>
                  <Link href="/help">Допомогти нам</Link>
                </li>
                <li>
                  <p
                    className={styles.navMenuInnerMenu}
                    onClick={setSecondOpen}
                  >
                    <span>Корисне</span>
                    <ArrowDown />
                  </p>
                  {openSecond ? (
                    <ul className={styles.navMenuInnerList}>
                      <li>
                        <Link href="/useful">Поради</Link>
                      </li>
                      <li>
                        <Link href="/useful/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link href="/useful/results">Підсумки</Link>
                      </li>
                    </ul>
                  ) : null}
                </li>
              </ul>
            </div>
            <ButtonAsLink
              route="/help"
              buttonCaption="Підтримати"
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
                м. Київ
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
