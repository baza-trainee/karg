'use client'

import React, { useContext } from 'react';
import styles from "./styles/main.module.scss";
import Aside from '../Aside/Aside';
import Navbar from '../Navbar/Navbar';
import PetList from '../Pet/PetList/PetList';
import { AdminContext } from '@/app/adminProvider';
import PartnerList from '../Partner/PartnerList';

export default function Main() {
  const { activeSection } = useContext(AdminContext);

  function renderSection() {
    switch (activeSection) {
      case 'Контакти':
        return <ContactList />;
      case 'Тварини':
        return <PetList />;
      case 'Партнери':
        return <PartnerList />;
      case 'Поради':
        return <AdviceList />;
      case 'FAQ':
        return <FAQList />;
      case 'Підсумки':
        return <SummariesList />;
      case 'Команда':
        return <CommandList />;
      default:
        return <PetList />;
    }
  }

  return (
    <div className={styles.container}>
      <Aside />
      <div className={styles.column}>
        <Navbar />
        {renderSection()}
      </div>
    </div>
  )
}
