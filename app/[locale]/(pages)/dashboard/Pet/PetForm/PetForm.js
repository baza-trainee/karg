'use client'

import styles from "./styles/petForm.module.scss";
import variables from "../../../../variables.module.scss";
import Button from "@/components/Button/button";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import { PlusPlaceholderImage, PlusPlaceholderMinImage } from '@/public/assets/icons';
import DragDropFileUpload from "../../DragDropFileUpload/DragDropFileUpload";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { useContext, useEffect, useState } from "react";
import ModalContext from "@/app/ModalContext";
import SuccessDialog from "../SuccessDialog/SuccessDialog";
import { ArrowDown } from "@/public/assets/icons";
import Spinner from "@/components/Spinner/Spinner";
import { TrashIcon } from "@/public/assets/icons";

const labels = {
    ukrLng: "Українська",
    engLng: "Англійська",
    nameTitle: "Ім’я",
    categoryTitle: "Виберіть категорію",
    placeholder: "Категорії",
    descriptionTitle: "Опис",
    storyTitle: "Історія порятунку",
    btnReject: "Скасувати",
    btnSubmit: "Зберегти",
    btnSaveChanges: "Зберегти зміни"
};

const confirmationDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете скасувати цю дію?',
    message: 'Внесені дані не будуть збережені.',
    cancelTitle: 'Відмінити',
    confirmTitle: 'Скасувати'
};

const successDialogActions = {
    successTitle: 'Вітаємо!',
    successAddMessage: 'Нову тварину успішно додано!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function PetForm({ type = 'create', petData = {} }) {
    const { ukrLng, engLng, nameTitle, categoryTitle, placeholder, descriptionTitle, storyTitle, btnReject, btnSubmit, btnSaveChanges } = labels;
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { successTitle, successAddMessage, successChangeMessage, buttonText } = successDialogActions;
    const { showModal } = useContext(ModalContext);
    const [nameEn, setNameEn] = useState('');
    const [descriptionEn, setDescriptionEn] = useState('');
    const [storyEn, setStoryEn] = useState('');
    const [language, setLanguage] = useState('ua');
    const [isLoading, setIsLoading] = useState(false);
    const [originalData] = useState(() => {
        return { ...petData };
    });
    const [images, setImages] = useState([]);
    const title = type === 'create' ? "Додати тварину" : "Редагувати тварину";
    const maxImages = 4;

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        category: '',
        description: '',
        story: '',
        images: []
    });

    useEffect(() => {
        if (type === 'edit' && petData) {
            setFormData({
                id: petData.id || '',
                name: petData.name || '',
                category: petData.category || '',
                description: petData.description || '',
                story: petData.story || '',
                images: petData.images || []
            });
        }
    }, [type, petData]);

    useEffect(() => {
        setImages(formData.images);
    }, [formData.images]);

    const toggleLanguage = (e) => {
        e.preventDefault();
        setLanguage(prevLanguage => prevLanguage === 'ua' ? 'en' : 'ua');
    };

    const handleImageUploaded = (newImageUrl) => {
        setImages(prevImages => [...prevImages, newImageUrl].slice(0, maxImages));
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function getUpdatedFields(formData, originalData) {
        const patch = [];
        Object.keys(formData).forEach(key => {
            if (formData[key] !== originalData[key]) {
                patch.push({
                    operationType: 0,
                    path: `/${key}`,
                    op: "replace",
                    from: originalData[key],
                    value: formData[key]
                });
            }
        })
        return patch;
    }

    const handleCreateAnimal = async () => {
        const animalData = {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            story: formData.story,
            images: images
        };
        try {
            setIsLoading(true);
            const response = await fetch('http://karg.us-east-1.elasticbeanstalk.com/karg/animal/add', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animalData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Animal added successfully:', data);
                showModal('confirmation',
                    <SuccessDialog
                        title={successTitle}
                        message={type === 'create' ? successAddMessage : successChangeMessage}
                        buttonText={buttonText}
                        onCancel={() => console.log('closing modal window')}
                        buttonStyle={stylesBtn.congratsCloseBtn}
                    />)
                console.log('sending data to DB');
            } else {
                throw new Error(`Failed to submit form with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {

            setIsLoading(false);
        }
    };

    const handleUpdateAnimal = async () => {
        const updates = getUpdatedFields(formData, originalData);
        if (Object.keys(updates).length === 0) {
            console.log('No changes to update');
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(`http://karg.us-east-1.elasticbeanstalk.com/karg/animal/update?id=${formData.id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });
            if (!response.ok) {
                throw new Error('Failed to update animal');
            }
            const data = await response.json();
            console.log('Update successful:', data);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                    onCancel={() => console.log('closing modal window')}
                    buttonStyle={stylesBtn.congratsCloseBtn}
                />)
        } catch (error) {
            console.error('Error updating animal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    }

    return (
        <form className={styles.form}>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className={`${styles.container} ${type === 'edit' ? styles.editMode : ''}`}>
                        <p className={`${styles.title} ${variables.font24w700}`}>{title}</p>
                        <div className={`${styles.languageSwitcher} ${language === 'ua' ? styles.ua : styles.en} ${variables.font20w700}`}>
                            <button className={`${styles.ukrLng} ${language === 'ua' ? styles.selectedLanguage : ''}`} onClick={toggleLanguage}>{ukrLng}</button>
                            <button className={`${styles.engLng} ${language === 'en' ? styles.selectedLanguage : ''}`} onClick={toggleLanguage}>{engLng}</button>
                        </div>
                        <div className={styles.inputBlock}>
                            <label
                                className={`${styles.nameField} ${variables.font20w400}`}
                                htmlFor="nameField">
                                {nameTitle}
                            </label>
                            <input
                                type="text"
                                id="nameField"
                                name="name"
                                value={language === 'ua' ? formData.name : nameEn}
                                className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                                onChange={(e) => handleChange(e)}
                            >
                            </input>
                        </div>
                        {!images.length ? (
                            <DragDropFileUpload
                                placeholderImage={<PlusPlaceholderImage className={styles.placeholderImage} />}
                                className={styles.uploadArea}
                                onFileUploaded={handleImageUploaded}
                            />
                        ) : (
                            <div className={styles.imagesGrid}>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className={styles.imageContainer}>
                                        {images[index] ? (
                                            <div>
                                                <div className={styles.deleteIconContainer}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteImage(index)
                                                    }}>
                                                    <TrashIcon
                                                        className={styles.deleteIcon}
                                                    />
                                                </div>
                                                <img src={images[index]} alt={`Pet image ${index + 1}`} className={styles.imageMin} />
                                            </div>
                                        ) : (
                                            <DragDropFileUpload
                                                placeholderImage={<PlusPlaceholderMinImage className={styles.placeholderImageMin} />}
                                                className={styles.uploadArea}
                                                onFileUploaded={handleImageUploaded}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles.inputBlock}>
                            <label
                                className={`${styles.categoryField} ${variables.font20w400}`}
                                htmlFor="categoryField">
                                {categoryTitle}
                            </label>
                            <div className={styles.selectWrapper}>
                                <select
                                    id="categoryField"
                                    name="category"
                                    className={`${styles.categoryFieldInput} ${styles.field} ${variables.font18w500}`}
                                    value={formData.category}
                                    onChange={(e) => handleChange(e)}
                                    style={{ color: formData.category === "" ? '#A1A1A1' : '#141414' }}
                                >
                                    {type === 'create' && !formData.category && <option value="" disabled hidden>{placeholder}</option>}
                                    <option value='Dog' style={{ color: '#141414' }}>Собаки</option>
                                    <option value='Cat' style={{ color: '#141414' }}>Коти</option>
                                    <option value='Other' style={{ color: '#141414' }}>Інші тварини</option>
                                </select>
                                <ArrowDown className={styles.selectArrow} />
                            </div>
                        </div>
                        <div className={styles.inputBlock}>
                            <label
                                className={`${styles.descriptionField} ${variables.font20w400}`}
                                htmlFor="descriptionField">
                                {descriptionTitle}
                            </label>
                            <textarea
                                id="descriptionField"
                                name="description"
                                maxLength="500"
                                value={language === 'ua' ? formData.description : descriptionEn}
                                className={`${styles.textareaField} ${variables.font18w500}`}
                                onChange={(e) => handleChange(e)}
                            >
                            </textarea>
                        </div>
                        <div className={styles.inputBlock}>
                            <label
                                className={`${styles.storyField} ${variables.font20w400}`}
                                htmlFor="storyField">
                                {storyTitle}
                            </label>
                            <textarea
                                id="storyField"
                                name="story"
                                maxLength="500"
                                value={language === 'ua' ? formData.story : storyEn}
                                className={`${styles.textareaField} ${variables.font18w500}`}
                                onChange={(e) => handleChange(e)}
                            >
                            </textarea>
                        </div>
                        <div className={styles.buttonGroup}>
                            <Button
                                type="button"
                                className={stylesBtn.adminFormButtonReject}
                                onClick={() => showModal('confirmation',
                                    <ConfirmationDialog
                                        confirmationTitle={confirmationTitle}
                                        message={message}
                                        cancelTitle={cancelTitle}
                                        confirmTitle={confirmTitle}
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
                                onClick={() => type === 'create' ? handleCreateAnimal() : handleUpdateAnimal()}
                            >
                                {type === 'create' ? btnSubmit : btnSaveChanges}
                            </Button>
                        </div>
                    </div>
                </>
            )}

        </form >
    );
}

export default PetForm;