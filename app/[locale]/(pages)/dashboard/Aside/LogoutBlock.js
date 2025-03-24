'use client';

import React from 'react';
import AsideItem from './AsideItem';
import { LogoutIcon } from '@/public/assets/icons/aside';
import styles from "./styles/aside.module.scss";
import authService from '../../auth/login/authService';
import { useRouter } from 'next/navigation';
import { AdminContext } from '../../../../adminProvider';
import { useContext } from 'react';

export default function LogoutBlock() {
  const router = useRouter();
  const { setIsDirector } = useContext(AdminContext);

  const handleLogout = async () => {
    await authService.logout(setIsDirector);
    router.push('/auth/login');
  }
  
  return (
    <div
      className={styles.log_out}
      onClick={handleLogout}
    >
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
  )
}
