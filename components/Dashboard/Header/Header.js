import React from 'react';
import styles from "./styles/header.module.scss";
import { UserIcon } from '@/public/assets/icons';

export default function Header({name, surname}) {
  return (
    <div className={styles.container}>
      <p className={styles.greeting}>{`Вітаємо, ${name}!`}</p>
      <div className={styles.info}>
          <p className={styles.user}>{`${name} ${surname}` }</p>
          <UserIcon className={styles.icon}/>
      </div>
    </div>
  )
}
