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

  let details;
  switch (title) {
    case t('quickMenuDonate'):
      details = t('quickMenuDetailsDonate');
      break;
    case t('quickMenuServices'):
      details = t('quickMenuDetailsServices');
      break;
    case t('quickMenuAnimals'):
      details = t('quickMenuDetailsAnimals');
      break;
    case t('quickMenuReports'):
      details = t('quickMenuDetailsReports');
      break;
    default:
      details = t('quickMenuDetailsDefault');
  }

  return (

    <div className={styles.accessMenuItem}>
      {iconSrc}
      <div className={styles.accessMenuText}>
        <p className={`${styles.title} ${variables.quickAccessMenu_subtitle_component}`}>
          {title}
        </p>
        <p className={`${styles.message} ${variables.quickText3}`}>
          {innerMessage}
        </p>
        <Link className={variables.quickAccessMenu_button_component} href={href}>
          <span>{details}</span>
          <ArrowRightIcon className={`${styles.detailsButtonIcon} ${variables.quickAccessMenu_button_component}`} />
        </Link>
      </div>
    </div>

  );
}

export default function QuickAccessMenu() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;
  const localizedPath = (path) => currentLocale === 'uk' ? path : `/${currentLocale}${path}`;

  const quickMenuData = [
    { 'title': t('quickMenuDonate'), 'href': localizedPath('/help'), 'iconSrc': <DonateIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuDonateMessage') },
    { 'title': t('quickMenuServices'), 'href': localizedPath('/about/rules_of_appeal#rescue-types'), 'iconSrc': <HandshakeIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuServicesMessage') },
    { 'title': t('quickMenuAnimals'), 'href': localizedPath('/animals'), 'iconSrc': <PawprintIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuAnimalsMessage') },
    { 'title': t('quickMenuReports'), 'href': localizedPath('/useful/stats'), 'iconSrc': <ReportIcon className={styles.iconSrc} />, 'innerMessage': t('quickMenuReportsMessage') },
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
        route={localizedPath('/help')}
      />
    </section>
  );
}

