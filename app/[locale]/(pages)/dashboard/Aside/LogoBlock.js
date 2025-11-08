'use client'

import React from 'react';
import AsideItem from './AsideItem';
import styles from "./styles/aside.module.scss";
import Link from "next/link";
import { Logo } from "@/public/assets/icons";


export default function LogoBlock() {
  return (
    <div className={styles.logo_name}>
      <Link href="/">
        <AsideItem
          itemStyle={styles.item_logo}
          titleStyle={styles.logo_title}
          wrapperStyle={styles.wrapper_logo}
          title="Kyiv animal rescue group"
        >
          <Logo className={styles.logo} />
        </AsideItem>
      </Link>
    </div>
  )
}
