import React from 'react';
import { CardItem } from './CardItem/CardItem';
import styles from './styles/achievements.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const statisticsData = [
  {'title': '2427', 'innerMessage': 'тварин врятовано'},
  {'title': '2300', 'innerMessage': 'тварин евакуйовано'},
  {'title': '720', 'innerMessage': 'тварин знайшли новий дім'},
  {'title': '115+', 'innerMessage': 'тонн корму передано'},
];

export default function Achievements() { 
  return (
    <section className={styles.achievementBlock}>

      <div className={styles.innerBlock}>
      {statisticsData.map((d) => {
        return (
          <div key = {d.innerMessage}>
            <CardItem 
                title = {d.title}
                innerMessage = {d.innerMessage}
                cardStyle = {styles.cardItem}
                cardTextBlock = {styles.achievementText}
                cardTitleStyle = {`${styles.title} ${variables.achievSubtitle2}`}
                cardMessageStyle = {`${styles.message} ${variables.achievText3}`}      
            />
          </div>
        )
      })}    
      </div>


      
    </section>
  )
}