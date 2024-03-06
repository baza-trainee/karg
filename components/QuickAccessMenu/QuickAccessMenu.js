//TODO: add id={title} to specific component and add smooth
'use client';
import React from 'react';
import Link from "next/link";
import ButtonAsLink from '../ButtonAsLink/buttonAsLink';
import { DonateIcon, HandshakeIcon, PawprintIcon, ReportIcon, ArrowRightIcon } from "@/public/assets/icons";
import variables from '../../app/[locale]/variables.module.scss';
import styles from './styles/quickAccessPanel.module.scss';
import { useTranslation } from 'react-i18next';

export function MenuItem({ title, href, iconSrc, innerMessage }) {
  const { t } = useTranslation();
  const details = t('quickMenuDetails');

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
          <ArrowRightIcon className={`${styles.detailsButtonIcon} ${variables.quickButton2}`} />
        </Link>
      </div>
    </div>

  );
}

export default function QuickAccessMenu() {
  const { t } = useTranslation();

  const quickMenuData = [
    { 'title': t('quickMenuDonate'), 'href': '/help', 'iconSrc': <DonateIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuDonateMessage') },
    { 'title': t('quickMenuServices'), 'href': '/about/#rescue-types', 'iconSrc': <HandshakeIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuServicesMessage') },
    { 'title': t('quickMenuAnimals'), 'href': '/animals', 'iconSrc': <PawprintIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuAnimalsMessage') },
    { 'title': t('quickMenuReports'), 'href': '/useful/#statistics', 'iconSrc': <ReportIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuReportsMessage') },
  ];

  const donate = t('common:buttonSupportText');

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

      <ButtonAsLink
        buttonStyle='button-quick-menu'
        buttonCaption={donate}
        route='/help'
      />
    </section>
  );
}

