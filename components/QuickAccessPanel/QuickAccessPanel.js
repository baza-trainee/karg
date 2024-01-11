//TODO: add id={title} to specific component and add smooth
import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import donateIcon from '../../public/assets/images/main/donate.png';
import handshakeIcon from '../../public/assets/images/main/handshake.png';
import pawprintIcon from '../../public/assets/images/main/pawprint.png';
import reportIcon from '../../public/assets/images/main/report.png';
import iconShevron from '../../public/assets/images/main/btn-shevron.png';

import styles from './styles/quickAccessPanel.module.scss';

const quickMenuData = [
  {'title': 'Пожертва', 'iconSrc': donateIcon, 'innerMessage': 'Як ви можете допомогти нам?'},
  {'title': 'Послуги', 'iconSrc': handshakeIcon, 'innerMessage': 'Як ми можемо допомогти вам'},
  {'title': 'Тварини' ,'iconSrc': pawprintIcon, 'innerMessage': 'Всиновлення та опікунство'},
  {'title': 'Звіти', 'iconSrc': reportIcon, 'innerMessage': 'Чим ми займались протягом року?'},
];
const details = 'Детальніше';
const donate = 'Підтримати';

export function MenuItem({title, iconSrc, innerMessage }) {

  // const handleScroll = (e) => {
  //   e.preventDefault();

  //   const href = e.currentTarget.href;
  //   const targetId = href.replace(/.*\#/, "");

  //   const elem = document.getElementById(targetId);
  //   elem?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }
  return (
    <div className={styles.accessMenuItem}>
      <Image
        className={styles.iconSrc}
        src={iconSrc}
        alt="Donate icon"
      />
      <div className={styles.accessMenuText}>
        <p className={styles.title}>
          {title}
        </p>
        <p className={styles.message}>
          {innerMessage}
        </p>
        <Link href = {title === 'Звіти' ? '/useful' : (title === 'Тварини' ? '/animals' : `#${title}`)}>
          <span>{details}</span>
          <Image
            className={styles.iconShevron}
            src={iconShevron}
            alt="Button icon"
        />
        </Link>
      </div>
    </div>
  )
} 

export default function QuickAccessMenu() { 
  {/* needs data parameter */}
  return (
    <section className={styles.accessMenuBlock}>
      {quickMenuData.map((d) => {
        return (
          <div key = {d.innerMessage}>
            <MenuItem 
              title = {d.title} 
              iconSrc = {d.iconSrc} 
              innerMessage = {d.innerMessage}
            />
          </div>
        )
      })}
      <Link className={styles.donate} href='Пожертва'>
        <span>{donate}</span>
      </Link>
    </section>
  )
}