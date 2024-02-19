import React from 'react';
import AsideItem from './AsideItem';
import { LogoutIcon } from '@/public/assets/icons';
import styles from "./styles/aside.module.scss";

export default function Logout() {
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
