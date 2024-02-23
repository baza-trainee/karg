import React from 'react';
import AsideItem from './AsideItem';
import { LogoutIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";

export default function LogoutBlock() {
  return (
    <div className={styles.log_out}>
          <AsideItem 
              itemStyle = {styles.item}
              titleStyle = {styles.title}
              title = "Вийти"
              wrapperStyle={styles.wrapper}
          >
             <LogoutIcon className={styles.icon}/>
          </AsideItem>        
    </div>
  )
}
