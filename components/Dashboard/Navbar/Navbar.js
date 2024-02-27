import React from 'react';
import ButtonAsLink from '@/components/ButtonAsLink/buttonAsLink';
import styles from "./styles/navbar.module.scss";

export default function Navbar({active_section}) {
  return (
    <div className={styles.container}>
        <p className={styles.active_section}>{active_section}</p>
        <ButtonAsLink 
            buttonCaption="Додати тварину"
            buttonStyle="button-add-new-pet"
            route="/add_new_pet"
        /> 
    </div>
  )
}
