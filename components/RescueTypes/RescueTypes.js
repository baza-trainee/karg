import React from 'react';
import { CardItem } from '../Achievements/CardItem/CardItem';
import styles from './styles/rescueTypes.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const rescueTypesData = [
  {'innerMessage': 'Зняття котів з дерев'},
  {'innerMessage': 'Зняття котів з конструкцій будинків'},
  {'innerMessage': 'Підняття тварррин з колодязя, колектора, зливи'},
  {'innerMessage': 'Порятунок котів з вентиляції'},
];

export default function RescueTypes() { 
  return (
    <section className={styles.rescueTypesBlock}>
      {rescueTypesData.map((d) => {
        return (
          <div key = {d.innerMessage}>
            <CardItem 
              title = {d.title}
              innerMessage = {d.innerMessage}
              cardStyle = {styles.cardItem}
              cardTextBlock = {styles.achievementText}
              cardTitleStyle = {`${styles.title} ${variables.Subtitle2}`}
              cardMessageStyle = {`${styles.message} ${variables.Text3}`}      
            />
          </div>
        )
      })}
    </section>
  )
}