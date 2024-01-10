import React from 'react';
import Image from 'next/image';
import donateIcon from '../../public/assets/images/main/donate.png';
import handshakeIcon from '../../public/assets/images/main/handshake.png';
import pawprintIcon from '../../public/assets/images/main/pawprint.png';
import reportIcon from '../../public/assets/images/main/report.png';

import styles from './styles/QuickAccessPanel.module.scss';

const QuickMenuData = [
  {'title': 'Пожертва', 'iconSrc': donateIcon, 'innerMessage': 'Як ви можете допомогти нам?'},
  {'title': 'Послуги', 'iconSrc': handshakeIcon, 'innerMessage': 'Як ми можемо допомогти вам'},
  {'title': 'Тварини' ,'iconSrc': pawprintIcon, 'innerMessage': 'Всиновлення та опікунство'},
  {'title': 'Звіти', 'iconSrc': reportIcon, 'innerMessage': 'Чим ми займались протягом року?'},
]

export function MenuItem({title, iconSrc, innerMessage }) {
  return (
    <div className={styles.accessMenuItem}>
      <Image
        className={styles.iconSrc}
        src={iconSrc}
        alt="Donate icon"
        //width={50} automatically provided
        //height={61} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
      <p className={styles.title}>
         {title}
      </p>
      <p className={styles.message}>
        {innerMessage}
      </p>
      <button className={styles.details}> 
        Детальніше 
      </button>
    </div>
  )
} 

export default function QuickAccessMenu() { 
  {/* needs data parameter */}
  return (
    <section className={styles.accessMenuBlock}>
      {QuickMenuData.map((d) => {
        return (
          <div key = {d.innerMessage}>
            <MenuItem 
              title = {d.title} 
              iconSrc = {d.iconSrc} 
              innerMessage = {d.innerMessage}
            />
          </div>
        )
      })}
    </section>
  )
}
