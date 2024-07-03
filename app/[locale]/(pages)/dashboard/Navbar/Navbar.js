import React, { useContext } from 'react';
import Button from '@/components/Button/button';
import styles from "./styles/navbar.module.scss";
import stylesBtn from "../../../../../components/Button/styles/button.module.scss"
import { AdminContext } from '@/app/adminProvider';
import PetForm from '../Pet/PetForm/PetForm';
import AdviceForm from '../Advice/AdviceForm/AdviceForm';
import ModalContext from '@/app/ModalContext';

export default function Navbar() {
  const { activeSection } = useContext(AdminContext);
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
      genericModalContent: ""
    },
    'Поради': {
      caption: "Додати статтю",
      genericModalContent: <AdviceForm type="create" />
    },
    'FAQ': {
      caption: "Додати питання",
      genericModalContent: ""
    },
    'Підсумки': {
      caption: "Додати статтю",
      genericModalContent: ""
    },
  }

  const { caption, genericModalContent } = buttonData[activeSection] || buttonData['Тварини'];

  const handleButtonClick = () => {
    showModal('generic', genericModalContent);
  };

  return (
    <div className={styles.container}>
      <p className={styles.active_section}>{activeSection}</p>
      <Button
        className={stylesBtn.buttonAddNewItem}
        onClick={handleButtonClick}
      >
        {caption}
      </Button>
    </div>
  )
}
