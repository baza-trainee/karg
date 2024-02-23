import React from 'react';
import AsideItem from './AsideItem';
import { IdentityIcon, SettingsIcon, HelpIcon, LogoutIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";

const dataList = [
    {'title': 'Мій аккаунт', 'icon': <IdentityIcon className={styles.icon}/>},
    {'title': 'Налаштування', 'icon': <SettingsIcon className={styles.icon}/>},
    {'title': 'Допомога', 'icon': <HelpIcon className={styles.icon}/>},
  ];

export default function SettingsBlock() {
  return (
    <div className={styles.settings}>
        <AsideItem
            itemStyle = {styles.item_header}
            titleStyle = {styles.header}
            title = "Налаштування"
        />

        {dataList.map((a) => {
            return (
                <div key = {a.icon}>
                    <AsideItem 
                        itemStyle = {styles.item}
                        titleStyle = {styles.title}
                        title = {a.title}
                        wrapperStyle={styles.wrapper}
                    >
                        {a.icon}
                 </AsideItem>
                </div>
            )
        })}
    </div>
  )
}
