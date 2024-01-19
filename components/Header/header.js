"use client";

import styles from "./styles/header.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import stylesBtn from "./../Button/styles/button.module.scss";

import {
  Facebook,
  Instagram,
  Telegram,
  Logo,
  MenuBurger,
  MenuBurgerClose,
  ArrowDown,
} from "@/public/assets/icons";

import Button from "../Button/button";
import Modal from "../Modal/modal";

import { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const iconsContainer = () => {
    return (
      <div className={styles.iconsContainer}>
        <a href="https://www.facebook.com/">
          <Facebook className={styles.icons} />
        </a>
        <a href="https://www.instagram.com/">
          <Instagram className={styles.icons} />
        </a>
        <a href="https://www.telegram.com/">
          <Telegram className={styles.icons} />
        </a>
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <a className={variables.subtitle1} href="tel: +380939862262">
          +38 (093) 986-2262
        </a>
        {iconsContainer()}
        <a className={variables.subtitle1} href="tel: +380988447937">
          +38 (098) 844-7937
        </a>
      </div>
      <nav className={styles.headerContainer}>
        <div className={styles.inner}>
          <Logo className={styles.logo} />
          <ul className={`${styles.navMenu} ${variables.button2}`}>
            <li>
              <a href="#">Головна</a>
            </li>
            <li className={styles.dropHover}>
              <a className={styles.navMenuDropList} href="#">
                <span>Про нас</span>
                <ArrowDown />
              </a>
              <ul
                className={`${styles.navMenu} ${variables.button2} ${styles.dropList}`}
              >
                <li>
                  <a href="#">Історія виникнення</a>
                </li>
                <li>
                  <a href="#">Правила звернення</a>
                </li>
                <li>
                  <a href="#">Наша команда</a>
                </li>
                <li>
                  <a href="#">Контакти</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Допомогти нам</a>
            </li>
            <li className={styles.dropHover}>
              <a className={styles.navMenuDropList} href="#">
                {" "}
                <span>Корисне</span>
                <ArrowDown />
              </a>
              {/* <ul className={`${styles.navMenu} ${variables.button2} ${styles.dropList}`}>
                                <li><a href="#">Щось</a></li>
                                <li><a href="#">Під контактами</a></li>
                                <li><a href="#">Повинно бути</a></li>
                                <li><a href="#">Але не зрозуміло що тому поки залишу це тут</a></li>
                            </ul> */}
            </li>
          </ul>
          <div className={styles.sideMenu}>
            <select className={styles.langContainer}>
              <option value="UKR">UKR</option>
              <option value="ENG">ENG</option>
            </select>
            {isDesktop && (
              <Button
                type="click"
                className={stylesBtn.btnSupport}
                onClick={onOpen}
              >
                Підтримати
              </Button>
            )}
            <Modal
              isOpen={isModalOpen}
              onClose={onClose}
              title="Модальне вікно для донатів"
            >
              <p>
                Сюди будуть додані варіанти платіжних систем для донацій і
                стилізація цього модального вікна
              </p>
            </Modal>

            <div onClick={() => setOpen(!open)}>
              {open == false ? (
                <MenuBurger className={styles.burgerIcon} />
              ) : (
                <MenuBurgerClose className={styles.burgerIcon} />
              )}
            </div>
          </div>
        </div>
        {open == true ? (
          <div className={styles.dropDownMenuWrapper}>
            <ul className={`${styles.dropDownMenu} ${variables.button2}`}>
              <li>
                <a href="#">Головна</a>
              </li>
              <li>
                <a href="#">Про нас</a>
              </li>
              <li>
                <a href="#">Допомогти нам</a>
              </li>
              <li>
                <a href="#">Корисне</a>
              </li>
            </ul>
            <button className={styles.donateButton}>
              <span className={variables.button1}>Зробити внесок</span>
            </button>
            <div className={styles.contactsContainer}>
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
            {iconsContainer()}
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
