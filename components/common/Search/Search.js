"use client";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '@/public/assets/icons';
import styles from "./styles/search.module.scss";
 
const Search = () => {

  const { t } = useTranslation();
  
  return (
    <main>
      <div className={styles.container}>
         <input 
             type='text'
             placeholder={t('advices:inputPlaceholder')}
             className={styles.input}
         />
         <SearchIcon className={styles.icon}/>
     </div>
    </main>
  )
}

export default Search;
