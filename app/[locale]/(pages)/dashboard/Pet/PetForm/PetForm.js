'use client'

import styles from "./styles/petForm.module.scss";
import variables from "../../../../variables.module.scss";
import Button from "@/components/Button/button";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import { PlusPlaceholderImage } from '@/public/assets/icons';
import DragDropFileUpload from "../../DragDropFileUpload/DragDropFileUpload";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { useContext, useState } from "react";
import ModalContext from "@/app/ModalContext";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

const labels = {
    ukrLng: "Українська",
    engLng: "Англійська",
    name: "Ім’я",
    category: "Виберіть категорію",
    placeholder: "Категорії",
    description: "Опис",
    story: "Історія порятунку",
    btnReject: "Скасувати",
    btnSubmit: "Зберегти",
    btnSaveChanges: "Зберегти зміни"
};

const confirmationDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете скасувати цю дію?',
    message: 'Внесені дані не будуть збережені.',
    cancelText: 'Відмінити',
    confirmText: 'Скасувати'
};

const successDialogActions = {
    successTitle: 'Вітаємо!',
    successAddMessage: 'Нову тварину успішно додано!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function PetForm({ type = 'create', petData = {} }) {
    const { ukrLng, engLng, name, category, placeholder, description, story, btnReject, btnSubmit, btnSaveChanges } = labels;
    const { confirmationTitle, message, cancelText, confirmText } = confirmationDialogActions;
    const { successTitle, successAddMessage, successChangeMessage, buttonText } = successDialogActions;
    const { showModal } = useContext(ModalContext);
    const [petNameUa, setPetNameUa] = useState(petData.petNameUa || '');
    const [petNameEn, setPetNameEn] = useState(petData.petNameEn || '');
    const [petCategory, setPetCategory] = useState(petData.petCategory || '');
    const [petDetailsUa, setPetDetailsUa] = useState(petData.petDetailsUa || '');
    const [petDetailsEn, setPetDetailsEn] = useState(petData.petDetailsEn || '');
    const [petStoryUa, setPetStoryUa] = useState(petData.rescueStoryUa || '');
    const [petStoryEn, setPetStoryEn] = useState(petData.rescueStoryEn || '');
    const [language, setLanguage] = useState('ua');
    const title = type === 'create' ? "Додати тварину" : "Редагувати тварину";

    function handleUkLngBtn(e) {
        e.preventDefault();
        if (language === 'en') setLanguage('ua');
    }

    function handleEnLngBtn(e) {
        e.preventDefault();
        if (language === 'ua') setLanguage('en');
    }
    const handleFileSelected = (file) => {
        console.log(file);
    }

    function inputHandler(e) {
        const { id, value } = e.target;
        if (language === 'ua') {
            switch (id) {
                case 'nameField':
                    setPetNameUa(value);
                    break;
                case 'categoryField':
                    setPetCategory(value);
                    break;
                case 'descriptionField':
                    setPetDetailsUa(value);
                    break;
                case 'storyField':
                    setPetStoryUa(value);
                    break;
                default:
                    console.log('unknown field');
            }
        } else {
            switch (id) {
                case 'nameField':
                    setPetNameEn(value);
                    break;
                case 'categoryField':
                    setPetCategory(value);
                    break;
                case 'descriptionField':
                    setPetDetailsEn(value);
                    break;
                case 'storyField':
                    setPetStoryEn(value);
                    break;
                default:
                    console.log('unknown field');
            }
        }
    }

    function handleSubmit() {
        const id = petData.id;
        const formData = {
            id,
            petNameUa,
            petNameEn,
            petDetailsUa,
            petDetailsEn,
            petStoryUa,
            petStoryEn
        };
        showModal('confirmation',
            <SuccessDialog
                title={successTitle}
                message={type === 'create' ? successAddMessage : successChangeMessage}
                buttonText={buttonText}
                onCancel={() => console.log('closing modal window')}
                buttonStyle={stylesBtn.congratsCloseBtn}
            />)
        console.log('sending data to DB: ' + id);
    }

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
                        value={language === 'ua' ? petNameUa : petNameEn}
                        className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                        onChange={(e) => inputHandler(e)}
                    >
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
                    <select
                        id="categoryField"
                        name="categoryField"
                        className={`${styles.categoryFieldInput} ${styles.field} ${variables.font18w500}`}
                        value={petCategory}
                        onChange={(e) => inputHandler(e)}
                    >
                        {type === 'create' && !petCategory && <option value="" disabled>{placeholder}</option>}
                        <option value='Собаки'>Собаки</option>
                        <option value='Коти'>Коти</option>
                        <option value='Інші тварини'>Інші тварини</option>
                    </select>
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
                        value={language === 'ua' ? petDetailsUa : petDetailsEn}
                        className={`${styles.descriptionFieldInput} ${styles.field} ${variables.font18w500}`}
                        onChange={(e) => inputHandler(e)}
                    >
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
                        value={language === 'ua' ? petStoryUa : petStoryEn}
                        className={`${styles.storyFieldInput} ${styles.field} ${variables.font18w500}`}
                        onChange={(e) => inputHandler(e)}
                    >
                    </input>
                </div>
                <div className={styles.buttonGroup}>
                    <Button
                        type="button"
                        className={stylesBtn.adminFormButtonReject}
                        onClick={() => showModal('confirmation',
                            <ConfirmationDialog
                                confirmationTitle={confirmationTitle}
                                message={message}
                                cancelText={cancelText}
                                confirmText={confirmText}
                                onConfirm={() => console.log('undoing changes')}
                                onCancel={() => console.log('cancellation')}
                                leftButtonStyle={stylesBtn.confirmationCancelBtn}
                                rightButtonStyle={stylesBtn.confirmationRevertBtn}
                            />)}
                    >
                        {btnReject}
                    </Button>
                    <Button
                        type="button"
                        className={stylesBtn.adminFormButtonSubmit}
                        onClick={() => handleSubmit()}
                    >
                        {type === 'create' ? btnSubmit : btnSaveChanges}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default PetForm;