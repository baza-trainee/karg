'use client';

import styles from './styles/footer.module.scss';
import variables from "@/app/[locale]/variables.module.scss";

import { Logo, ArrowDown } from "@/public/assets/icons";
import useToggle from '@/utils/useToggle/useToggle';
import SocialIcons from '../SocialIcons/socialIcons';
//import Button from '../Button/button';
//import stylesBtn from '../Button/styles/button.module.scss';

function Footer() {

    const [openFirst, setFirstOpen] = useToggle(false);
    const [openSecond, setSecondOpen] = useToggle(false);

    return (
        <footer className={styles.footer}>
            <div className={styles.brandHolder}>
                <Logo className={styles.brandHolderLogo} />
                <h2 className={`${styles.brandHolderName} ${variables.button2}`}>KYIV ANIMAL RESCUE GROUP</h2>
            </div>
            <nav className={`${styles.navMenu} ${variables.button2}`}>
                <ul>
                    <li><a href="#">Головна</a></li>
                    <li><p className={styles.navMenuInnerMenu} onClick={setFirstOpen}><span>Про нас</span><ArrowDown /></p>
                        {openFirst ? <ul className={styles.navMenuInnerList}>
                            <li><a href="#">Історія виникнення</a></li>
                            <li><a href="#">Правила звернення</a></li>
                            <li><a href="#">Наша команда</a></li>
                            <li><a href="#">Контакти</a></li>
                        </ul> : null}
                    </li>
                    <li><a href="#">Наші тварини</a></li>
                    <li><a href="#">Допомогти нам</a></li>
                    <li><p className={styles.navMenuInnerMenu} onClick={setSecondOpen}><span>Корисне</span><ArrowDown /></p>
                        {openSecond ? <ul className={styles.navMenuInnerList}>
                            <li><a href="#">Поради</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Підсумки</a></li>
                        </ul> : null}
                    </li>
                </ul>
            </nav>
              {/* <Button
                type="click"
                className={stylesBtn.btnSupport}
              >
                <a href='/help'>Підтримати</a>
              </Button> */}

            <div className={`${styles.contactsContainer} ${variables.button2}`}>
                <a href="tel: +380939862262">+38 (093) 986-2262</a>
                <a href="tel: +380988447937">+38 (098) 844-7937</a>
                <a href="mailto: karg.inform@gmail.com">karg.inform@gmail.com</a>
                <a href="https://maps.app.goo.gl/4Ra4rk12B7hkwKmM6" target="_blank">м. Київ</a>
            </div>
            <SocialIcons iconsColor='#A1A1A1' />
            <p className={styles.signature}>Розробка Baza Trainee Ukraine © 2023 Всі права захищені</p>
        </footer>
    );
}

export default Footer;