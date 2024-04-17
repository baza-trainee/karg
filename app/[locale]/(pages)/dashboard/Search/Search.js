import React, { useState, useRef } from 'react';
import { SearchIcon } from '@/public/assets/icons';
import styles from "./styles/search.module.scss";

export default function Search({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState('');
  let searchTimeout = useRef(null);

  function handleInputChange(e) {
    const searchQuery = e.target.value;
    setInputValue(searchQuery);
    if (searchQuery.length >= 3) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(() => onSearch(searchQuery), 1000);
    } else if (!searchQuery.length) {
      clearTimeout(searchTimeout.current);
      onSearch('');
    }
  }

  function onSearch(searchQuery) {
    setSearchTerm(searchQuery);
    console.log('setSearchTerm: ' + searchQuery);
  }

  return (
    <div className={styles.container}>
      <input
        type='text'
        placeholder='Пошук'
        value={inputValue}
        className={styles.search}
        onChange={handleInputChange}
      />
      <SearchIcon className={styles.icon} />
    </div>
  )
}
