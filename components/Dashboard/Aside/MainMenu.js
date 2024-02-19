import React from 'react';
import AsideItem from './AsideItem';
import { ContactsIcon, PetsIcon, SwitchCameraIcon, GroupIcon, SupervisedUserIcon } from '@/public/assets/icons';
import styles from "./styles/aside.module.scss";

  const dataList = [
    {'title': 'Контакти', 'icon': <ContactsIcon className={styles.icon}/>},
    {'title': 'Тварини', 'icon': <PetsIcon className={styles.icon}/>},
    {'title': 'Партнери', 'icon': <SwitchCameraIcon className={styles.icon}/>},
    {'title': 'Поради', 'icon': <GroupIcon className={styles.icon}/>},
    {'title': 'Команда', 'icon': <SupervisedUserIcon className={styles.icon}/>},
  ];

export default function MainMenu() {
  return (
    <div className={styles.main_menu}>
        <AsideItem
            itemStyle = {styles.item_header}
            titleStyle = {styles.header}
            title = "Головне меню"
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
