import React, { useContext } from 'react';
import Link from 'next/link';
import styles from "./styles/header.module.scss";
import { UserIcon } from '@/public/assets/icons';
import { AdminContext } from '@/app/adminProvider';

export default function Header() {
  const adminUser = useContext(AdminContext);
  const name = adminUser.name || '';
  const surname = adminUser.surname || '';

  return (
    <div className={styles.container}>
      <p className={styles.greeting}>{`Вітаємо, ${name}!`}</p>
      <Link href="/dashboard/my_account" className={styles.info}>
        <p className={styles.user}>{`${name} ${surname}`}</p>
        <UserIcon className={styles.icon} />
      </Link>
    </div>
  )
}
