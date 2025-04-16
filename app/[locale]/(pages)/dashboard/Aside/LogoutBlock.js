'use client';

import React, { useContext } from 'react';
import AsideItem from './AsideItem';
import { LogoutIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";
import { logoutUser } from '../../auth/login/api';
import { useRouter } from 'next/navigation';
import { AdminContext } from '../../../../adminProvider';

export default function LogoutBlock() {
  const router = useRouter();
  const { setIsDirector, setAccountId, setActiveSection, setActiveHelpSection } = useContext(AdminContext);

  const handleLogout = async () => {
    await logoutUser(setIsDirector, setAccountId, setActiveSection, setActiveHelpSection);
    router.push('/auth/login');
  }

  return (
    <div
      className={styles.log_out}
    >
      <div className={styles.wrapper} onClick={handleLogout}>
        <AsideItem
          itemStyle={styles.item}
          titleStyle={styles.title}
          title="Вийти"
          wrapperStyle={styles.wrapper}
        >
          <LogoutIcon
            className={styles.icon}
          />
        </AsideItem>
      </div>
    </div>
  )
}
