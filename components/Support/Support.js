import React from 'react';
import { CardItem } from '../CardItem/CardItem';
import ButtonAsLink from '../ButtonAsLink/buttonAsLink';
import styles from './styles/support.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const supportTitle = 'Як підтримати нас';

const supportData = [
    {'cardTitle':'Фінансово','cardMessage': 'Кожний донат має значення', 'buttonText': 'Зробити внесок'},
    {'cardTitle': 'Взяти тварину','cardMessage': 'Кожний улюбленець чекає на свій дім','buttonText': 'Взяти тварину'},
]

export default function Support() {
  return (
    <div>
        <div className={styles.container}>
            <p className={styles.titleBlock}>
                <span className={variables.supportSubtitle1}>{supportTitle}</span>
            </p>

            <div className={styles.cardBlock}>
                {supportData.map((r)=>{
                    return (
                        <div key={r.innerMessage}>
                            <CardItem 
                                cardTitle={r.cardTitle}
                                cardTitleStyle={variables.supportSubtitle2}
                                cardMessage = {r.cardMessage}
                                cardContainer = {styles.cardItem}
                                cardMessageStyle = {`${styles.message} ${variables.supportText4}`}
                            />
                        <ButtonAsLink 
                            buttonCaption={r.buttonText} 
                            buttonStyle='' 
                            buttonRoute='#'
                        />
                        </div>
                    )
                })}
            </div>   

{/*             
            <Link className={`${styles.allActivities} ${styles.dark} ${variables.rescueButton1}`} href='/about/applying_rules'>
                <span>{allActivities}</span>
            </Link>    */}
        </div>
    </div>
  )
}
