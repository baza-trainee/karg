import React from 'react';
import { SearchIcon } from '@/public/assets/icons';
import styles from "./styles/search.module.scss";

export default function Search() {
  return (
    <div className={styles.container}>
        <input 
            type='text'
            placeholder='Пошук'
            className={styles.search}
        />
        <SearchIcon className={styles.icon}/>
    </div>
  )
}
