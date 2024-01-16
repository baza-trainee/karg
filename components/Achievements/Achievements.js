import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { BrowserView } from "react-device-detect";
import styles from './styles/achievements.module.scss';

const desktop = () => <BrowserView/>

const statisticsData = [
  {'title': '2427', 'innerMessage': 'тварин врятовано'},
  {'title': '2300', 'innerMessage': !desktop ? 'тварин евакуйовано': 'тварин евакуйовано із зони бойових дій'},
  {'title': '720', 'innerMessage': !desktop ? 'тварин знайшли новий дім' : 'тварин знайшли свій новий дім'},
  {'title': '115+', 'innerMessage': 'тонн корму передано'},
];

export function CardItem({
    title, 
    href, 
    iconSrc, 
    iconShevron,
    innerMessage,
    cardStyle,
    cardImageStyle,
    cardTextBlock,
    cardTitleStyle,
    cardMessageStyle,
    buttonIconStyle
 }) {

  return (
    <div className={cardStyle}>
      {iconSrc ? 
      <Image
        className={cardImageStyle}
        src={iconSrc}
        alt="Donate icon"
      /> : null}
      <div className={cardTextBlock}>
        <p className={cardTitleStyle}>
          {title}
        </p>
        <p className={cardMessageStyle}>
          {innerMessage}
        </p>
        {href ?
            <Link href = {href}>
            <span>{details}</span>
            {iconShevron ? 
            <Image
            className={buttonIconStyle}
            src={iconShevron}
            alt="Button icon"
        /> : null}
        </Link> : null
        }
      </div>
    </div>
  )
} 

export default function Achievements() { 
  return (
    <section className={styles.achievementBlock}>
      {statisticsData.map((d) => {
        return (
          <div key = {d.innerMessage}>
            <CardItem 
              title = {d.title}
              href = {d.href}
              iconSrc = {d.iconSrc ? d.iconSrc : null} 
              innerMessage = {d.innerMessage}
              cardStyle = {styles.cardItem}
              cardImageStyle = {styles.iconSrc}
              cardTextBlock = {styles.achievementText}
              cardTitleStyle = {styles.title}
              cardMessageStyle = {styles.message}
              buttonIconStyle = {styles.iconShevron}
          
            />
          </div>
        )
      })}
    </section>
  )
}