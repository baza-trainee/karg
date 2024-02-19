import React from 'react';
import styles from "./styles/aside.module.scss";
import MainMenu from './MainMenu';
import LogoBlock from './LogoBlock';
import SettingsBlock from './SettingsBlock';
import Logout from './Logout';


export default function Aside() {
  return (
    <div className={styles.container}>
      <LogoBlock/>
      <MainMenu/>
      <SettingsBlock/>
      <Logout/>
    </div>
  )
}
