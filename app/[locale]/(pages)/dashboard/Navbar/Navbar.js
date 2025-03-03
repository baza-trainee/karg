import React, { useContext } from 'react';
import Button from '@/components/Button/button';
import styles from "./styles/navbar.module.scss";
import stylesBtn from "../../../../../components/Button/styles/button.module.scss"
import { AdminContext } from '@/app/adminProvider';
import PetForm from '../Pet/PetForm/PetForm';
import PartnerForm from '../Partner/PartnerForm/PartnerForm';
import AdviceForm from '../Advice/AdviceForm/AdviceForm';
import RescuerForm from '../OurTeam/TeamForm/RescuerForm';
import ModalContext from '@/app/ModalContext';
import FAQForm from '../FAQ/FAQForm/FAQForm';
import StatsForm from '../Stats/StatsForm/StatsForm';

export default function Navbar() {
  const { activeSection, isDirector } = useContext(AdminContext);
  const { showModal } = useContext(ModalContext);
  const buttonData = {
    'Контакти': {
      caption: "Додати контакт",
      genericModalContent: ""
    },
    'Тварини': {
      caption: "Додати тварину",
      genericModalContent: <PetForm type="create" />
    },
    'Партнери': {
      caption: "Додати партнера",
      genericModalContent: <PartnerForm type="create" />
    },
    'Поради': {
      caption: "Створити статтю",
      genericModalContent: <AdviceForm type="create" />
    },
    'FAQ': {
      caption: "Додати питання",
      genericModalContent: <FAQForm type="create" />
    },
    'Підсумки': {
      caption: "Створити статтю",
      genericModalContent: <StatsForm type="create" />
    },
    'Команда': {
      caption: "Додати користувача",
      genericModalContent: <RescuerForm type="create" />
    },
  }

  const { caption, genericModalContent } = buttonData[activeSection] || '';

  const handleButtonClick = () => {
    showModal('generic', genericModalContent);
  };

  return (
    <div className={styles.container}>
      <p className={styles.active_section}>{activeSection}</p>
      {activeSection !== "Мій акаунт" && activeSection !== "Допомога" &&
        <Button
          className={`${stylesBtn.buttonAddNewItem} ${activeSection === "Команда" && !Boolean(isDirector) ? styles.buttonDisabled : ''}`}
          onClick={handleButtonClick}
          disabled={activeSection === "Команда" && !Boolean(isDirector)}
        >
          {caption}
        </Button>
      }
    </div>
  )
}
