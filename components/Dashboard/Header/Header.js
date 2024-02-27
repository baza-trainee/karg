import React from 'react';
import Link from 'next/link';
import styles from "./styles/header.module.scss";
import { UserIcon } from '@/public/assets/icons';

export default function Header({name, surname}) {
  return (
    <div className={styles.container}>
      <p className={styles.greeting}>{`Вітаємо, ${name}!`}</p>
      <Link href="/dashboard/my_account" className={styles.info}>
          <p className={styles.user}>{`${name} ${surname}` }</p>
          <UserIcon className={styles.icon}/>
      </Link>
    </div>
  )
}
