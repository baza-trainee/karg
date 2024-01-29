//TODO: add id={title} to specific component and add smooth
'use client';
import React from 'react';
import Link from "next/link";
import { DonateIcon, HandshakeIcon, PawprintIcon, ReportIcon, ArrowRightIcon } from "@/public/assets/icons";
import variables from '../../app/[locale]/variables.module.scss';
import styles from './styles/quickAccessPanel.module.scss';

const quickMenuData = [
  { 'title': 'Донат', 'href': '/help', 'iconSrc': <DonateIcon className={styles.iconSrc} />, 'innerMessage': 'Як ви можете підтримати нас?' },
  { 'title': 'Послуги', 'href': '/about/#rescue-types', 'iconSrc': <HandshakeIcon className={styles.iconSrc} />, 'innerMessage': 'Як ми можемо допомогти вам?' },
  { 'title': 'Тварини', 'href': '/animals', 'iconSrc': <PawprintIcon className={styles.iconSrc} />, 'innerMessage': 'Всиновлення та опікунство' },
  { 'title': 'Звіти', 'href': '/useful/#statistics', 'iconSrc': <ReportIcon className={styles.iconSrc} />, 'innerMessage': 'Чим ми займались протягом року?' },
];
const details = "Детальніше";
const donate = "Підтримати";

export function MenuItem({ title, href, iconSrc, innerMessage }) {

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
      <div className={styles.innerBlock}>
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
      </div>
      {/* id='Пожертва' || href='Пожертва' */}
      <Link className={`${styles.donate} ${variables.quickButton2}`} href='/help'>
        <span>{donate}</span>
      </Link>
    </section>
  );
}

