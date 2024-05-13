import React from 'react';
import Header from '../Header/Header';
import styles from "./styles/main.module.scss";
import Aside from '../Aside/Aside';
import Navbar from '../Navbar/Navbar';
import Search from '@/components/common/Search/Search';
import Filter from '../Filter/Filter';

export default function Main() {
  return (
    <div className={styles.container}>
        <Aside/>
        <div className={styles.column}>
            <Header name="Євгенія" surname="Соколенко"/>
            <Navbar active_section="Тварини"/>
            <Search/>
            <Filter/>
        </div>

    </div>
  )
}
