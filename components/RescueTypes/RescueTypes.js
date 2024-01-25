import React from 'react';
import Link from 'next/link';
import { CardItem } from '../CardItem/CardItem';
import styles from './styles/rescueTypes.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const titleRescueTypes = 'Види рятувальних робіт'; 
const allActivities = 'Дивитись усі';

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
            <p className={styles.titleBlock}>
                <span className={`${variables.rescueSubtitle1}`}>{titleRescueTypes}</span>
            </p>

            <div className={styles.cardBlock}>
                {rescueTypes.map((r)=>{
                    return (
                        <div key={r.innerMessage}>
                            <CardItem 
                                cardMessage = {r.cardMessage}
                                cardContainer = {styles.cardItem}
                                cardMessageStyle = {`${styles.message} ${variables.rescueText1}`}
                            />
                        </div>
                    )
                })}
            </div>    

            <Link className={`${styles.donate} ${styles.dark} ${variables.rescueButton1}`} href='/help'>
                <span>{allActivities}</span>
            </Link>   
        </div>
    </div>
  )
}
