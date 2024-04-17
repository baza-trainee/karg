import React, { useContext } from 'react';
import ButtonAsLink from '@/components/ButtonAsLink/buttonAsLink';
import styles from "./styles/navbar.module.scss";
import { AdminContext } from '@/app/adminProvider';

export default function Navbar() {
  const { activeSection } = useContext(AdminContext);
  const buttonData = {
    'Контакти': {
      caption: "Додати контакт",
      style: "button-add-new-item",
      route: "/add_new_contact"
    },
    'Тварини': {
      caption: "Додати тварину",
      style: "button-add-new-item",
      route: "/add_new_pet"
    },
    'Партнери': {
      caption: "Додати партнера",
      style: "button-add-new-item",
      route: "/add_new_partner"
    },
    'Поради': {
      caption: "Додати статтю",
      style: "button-add-new-item",
      route: "/add_new_article"
    },
    'FAQ': {
      caption: "Додати питання",
      style: "button-add-new-item",
      route: "/add_new_question"
    },
    'Підсумки': {
      caption: "Додати статтю",
      style: "button-add-new-item",
      route: "/add_new_result"
    },
  }

  const { caption, style, route } = buttonData[activeSection] || buttonData['Тварини'];

  return (
    <div className={styles.container}>
      <p className={styles.active_section}>{activeSection}</p>
      <ButtonAsLink
        buttonCaption={caption}
        buttonStyle={style}
        route={route}
      />
    </div>
  )
}
