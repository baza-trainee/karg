import React from 'react';
import styles from "./styles/aside.module.scss";
import MainBlock from './MenuBlock';
import LogoBlock from './LogoBlock';
import SettingsBlock from './SettingsBlock';
import LogoutBlock from './LogoutBlock';


export default function Aside() {
  return (
    <div className={styles.container}>
      <LogoBlock/>
      <MainBlock/>
      <SettingsBlock/>
      <LogoutBlock/>
    </div>
  )
}
