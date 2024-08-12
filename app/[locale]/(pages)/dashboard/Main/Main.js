'use client'

import React, { useContext } from 'react';
import styles from "./styles/main.module.scss";
import Aside from '../Aside/Aside';
import Navbar from '../Navbar/Navbar';
import PetList from '../Pet/PetList/PetList';
import AdviceList from '../Advice/AdviceList/AdviceList';
import { AdminContext } from '@/app/adminProvider';
import PartnerList from '../Partner/PartnerList/PartnerList';
import MyAccount from '../MyAccount/AccountForm/AccountForm';

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
      case 'Мій акаунт':
        return <MyAccount />
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
