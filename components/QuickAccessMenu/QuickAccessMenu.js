//TODO: add id={title} to specific component and add smooth
'use client';
import React from 'react';
import Link from "next/link";
import Button from '../Button/button';
import { DonateIcon, HandshakeIcon, PawprintIcon, ReportIcon, ArrowRightIcon } from "@/public/assets/icons";
import variables from '../../app/[locale]/variables.module.scss';
import stylesBtn from '../Button/styles/button.module.scss';
import styles from './styles/quickAccessPanel.module.scss';

const quickMenuData = [
  { 'title': 'Донат', 'href': '/help', 'iconSrc': <DonateIcon className={styles.iconSrc} />, 'innerMessage': 'Як ви можете допомогти нам?' },
  { 'title': 'Послуги', 'href': '/about/#rescue-types', 'iconSrc': <HandshakeIcon className={styles.iconSrc} />, 'innerMessage': 'Як ми можемо допомогти вам?' },
  { 'title': 'Тварини', 'href': '/animals', 'iconSrc': <PawprintIcon className={styles.iconSrc} />, 'innerMessage': 'Всиновлення та опікунство' },
  { 'title': 'Звіти', 'href': '/useful/#statistics', 'iconSrc': <ReportIcon className={styles.iconSrc} />, 'innerMessage': 'Чим ми займались протягом року?' },
];
const details = "Детальніше";

export function MenuItem({ title, href, iconSrc, innerMessage }) {
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
      {iconSrc}
      <div className={styles.accessMenuText}>
        <p className={`${styles.title} ${variables.quickSubtitle1}`}>
          {title}
        </p>
        <p className={`${styles.message} ${variables.quickText3}`}>
          {innerMessage}
        </p>
        <Link className={variables.quickButton2} href={href}>
          <span>{details}</span>
          <ArrowRightIcon className={variables.quickButton2} />
        </Link>
      </div>
    </div>
  );
}

export default function QuickAccessMenu() {
  return (
    <section className={styles.accessMenuBlock}>
      {quickMenuData.map((d) => {
        return (
          <div key={d.innerMessage}>
            <MenuItem
              title={d.title}
              href={d.href}
              iconSrc={d.iconSrc}
              innerMessage={d.innerMessage}
            />
          </div>
        );
      })}

      <div className={variables.buttonStatusMenu}>
              <Button
                type="click"
                className={`${stylesBtn.btnSupport} ${variables.quickButton2} `}
              >
                <a href='/help'>Підтримати</a>
              </Button>
            </div>
    </section>
  );
}

