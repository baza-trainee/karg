import React from 'react';
import { CardItem } from './CardItem/CardItem';
import styles from './styles/achievements.module.scss';
import variables from '../../app/[locale]/variables.module.scss';
import initTranslations from "../../app/i18n";

export default async function Achievements({ locale, namespaces }) {
  const { t } = await initTranslations(locale, namespaces);

  const statisticsData = [
    { 'title': '2427', 'innerMessage': t('achievements1') },
    { 'title': '2300', 'innerMessage': t('achievements2') },
    { 'title': '720', 'innerMessage': t('achievements3') },
    { 'title': '115+', 'innerMessage': t('achievements4') },
  ];

  return (
    <section className={styles.achievementBlock}>

      <div className={styles.innerBlock}>
        {statisticsData.map((d) => {
          return (
            <div key={d.innerMessage}>
              <CardItem
                title={d.title}
                innerMessage={d.innerMessage}
                cardStyle={styles.cardItem}
                cardTextBlock={styles.achievementText}
                cardTitleStyle={`${styles.title} ${variables.achievSubtitle2}`}
                cardMessageStyle={`${styles.message} ${variables.achievText3}`}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}