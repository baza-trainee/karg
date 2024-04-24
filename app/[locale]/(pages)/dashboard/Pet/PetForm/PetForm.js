'use client'

import styles from "./styles/petForm.module.scss";
import variables from "../../../../variables.module.scss";
import Button from "@/components/Button/button";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import { PlusPlaceholderImage } from '@/public/assets/icons';
import DragDropFileUpload from "../../DragDropFileUpload/DragDropFileUpload";

const labels = {
    title: "Додати тварину",
    ukrLng: "Українська",
    engLng: "Англійська",
    name: "Ім’я",
    category: "Виберіть категорію",
    placeholder: "Категорії",
    description: "Опис",
    story: "Історія порятунку",
    btnReject: "Скасувати",
    btnSubmit: "Зберегти",
};

function PetForm() {

    const { title, ukrLng, engLng, name, category, placeholder, description, story, btnReject, btnSubmit } = labels;

    function handleUkLngBtn(e) {
        e.preventDefault();
        // if (language === 'en') console.log('ua');
        console.log('ua');
    }

    function handleEnLngBtn(e) {
        e.preventDefault();
        // if (language === 'ua') 
        console.log('en');
    }
    const handleFileSelected = (file) => {
        console.log(file);
    }

    const language = 'ua';

    return (
        <form>
            <div className={styles.container}>
                <p className={`${styles.title} ${variables.font24w700}`}>{title}</p>
                <div className={`${styles.languageSwitcher} ${language === 'ua' ? styles.ua : styles.en} ${variables.font20w700}`}>
                    <button className={`${styles.ukrLng} ${language === 'ua' ? styles.selectedLanguage : ''}`} onClick={handleUkLngBtn}>{ukrLng}</button>
                    <button className={`${styles.engLng} ${language === 'en' ? styles.selectedLanguage : ''}`} onClick={handleEnLngBtn}>{engLng}</button>
                </div>
                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.nameField} ${variables.font20w400}`}
                        htmlFor="nameField">
                        {name}
                    </label>
                    <input
                        type="text"
                        id="nameField"
                        name="nameField"
                        className={`${styles.nameFieldInput} ${variables.font18w500}`}>
                    </input>
                </div>
                <div className={styles.uploadArea}>
                    <DragDropFileUpload
                        onFileSelected={handleFileSelected}
                        placeholderImage={<PlusPlaceholderImage className={styles.placeholderImage} />}
                        className={styles.uploadArea}
                    />
                </div>
                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.categoryField} ${variables.font20w400}`}
                        htmlFor="categoryField">
                        {category}
                    </label>
                    <input
                        type="text"
                        id="categoryField"
                        name="categoryField"
                        className={`${styles.categoryFieldInput} ${variables.font18w500}`}
                        placeholder={placeholder}>
                    </input>
                </div>
                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.descriptionField} ${variables.font20w400}`}
                        htmlFor="descriptionField">
                        {description}
                    </label>
                    <input
                        type="text"
                        id="descriptionField"
                        name="descriptionField"
                        className={`${styles.descriptionFieldInput} ${variables.font18w500}`}>
                    </input>
                </div>
                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.storyField} ${variables.font20w400}`}
                        htmlFor="storyField">
                        {story}
                    </label>
                    <input
                        type="text"
                        id="storyField"
                        name="storyField"
                        className={`${styles.storyFieldInput} ${variables.font18w500}`}>
                    </input>
                </div>
                <div className={styles.buttonGroup}>
                    <Button
                        className={stylesBtn.adminFormButtonReject}>
                        {btnReject}
                    </Button>
                    <Button
                        className={stylesBtn.adminFormButtonSubmit}>
                        {btnSubmit}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default PetForm;