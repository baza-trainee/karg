import React from 'react';
import AsideItem from './AsideItem';
import { LogoIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";

export default function LogoBlock() {
  return (
    <div className={styles.logo_name}>
            <AsideItem 
              itemStyle = {styles.item_logo}
              titleStyle = {styles.logo_title}
              title = "Kyiv animal rescue group"
          >
             <LogoIcon className={styles.logo}/>
          </AsideItem>             
    </div>
  )
}
