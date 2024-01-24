import React from 'react';
import { CardItem } from '../CardItem/CardItem';
import styles from './styles/rescueTypes.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const titleRescueTypes = 'Види рятувальних робіт'; 

const rescueTypes = [
    {'cardMessage': 'Зняття котів з дерев'},
    {'cardMessage': 'Зняття котів з конструкцій будинків'},
    {'cardMessage': 'Підняття тварин з колодязя, колектора, зливи'},
    {'cardMessage': 'Порятунок котів з вентиляції'} 
]

export default function RescueTypes() {
  return (
    <div>
        <div className={styles.container}>
            <p className={styles.titleWidth}>
                <span className={`${variables.rescueSubtitle1}`}>{titleRescueTypes}</span>
            </p>
                        
            {rescueTypes.map((r)=>{
                return (
                    <div key={r.innerMessage}>
                        {/* {styles.cardInner} */}
                    <CardItem 
                        innerMessage = {r.cardMessage}
                        cardStyle = {styles.cardItem}
                        cardMessageStyle = {`${styles.message} ${variables.Text3}`}      
                    />
                    </div>
                )
            })}
        </div>
    </div>
  )
}
