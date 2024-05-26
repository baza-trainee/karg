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
import { useUnsavedChanges } from "@/app/UnsavedChangesContext";

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

function PetForm({ type = 'create', petData = {}, refreshPets }) {
    const { ukrLng, engLng, nameTitle, categoryTitle, placeholder, descriptionTitle, storyTitle, btnReject, btnSubmit, btnSaveChanges } = labels;
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { successTitle, successAddMessage, successChangeMessage, buttonText } = successDialogActions;
    const { hideModal, showModal } = useContext(ModalContext);
    const [language, setLanguage] = useState('ua');
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState(petData.images || []);
    const title = type === 'create' ? "Додати тварину" : "Редагувати тварину";
    const maxImages = 4;
    const initializeFormData = (data) => {
        if (data) {
            return {
                id: data.id || '',
                name_ua: data.name_ua || data.name || '',
                category: data.category || '',
                description_ua: data.description_ua || data.description || '',
                story_ua: data.story_ua || data.story || '',
                images: data.images || [],
                name_en: data.name_en || '',
                description_en: data.description_en || '',
                story_en: data.story_en || ''
            }
        }
    }
    const [formData, setFormData] = useState(initializeFormData(petData));
    const [originalData, setOriginalData] = useState(initializeFormData(petData));
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (type === 'edit' && petData.id) {
            setIsLoading(true);
            const fetchData = async () => {
                try {
                    const uaResponse = await fetch(`https://karg-backend.onrender.com/karg/animal/getbyid?id=${petData.id}&cultureCode=ua`);
                    const enResponse = await fetch(`https://karg-backend.onrender.com/karg/animal/getbyid?id=${petData.id}&cultureCode=en`);
                    if (!uaResponse.ok || !enResponse.ok) throw new Error('Failed to fetch');
                    const uaData = await uaResponse.json();
                    const enData = await enResponse.json();
                    const updatedFormData = {
                        id: uaData.id,
                        name_ua: uaData.name || '',
                        category: uaData.category || '',
                        description_ua: uaData.description || '',
                        story_ua: uaData.story || '',
                        images: uaData.images || '',
                        name_en: enData.name || '',
                        description_en: enData.description || '',
                        story_en: enData.story || '',
                    };
                    setFormData(updatedFormData);
                    setOriginalData(updatedFormData);
                    setImages(uaData.images || []);
                    setIsFormValid(checkFormValidity(updatedFormData));
                } catch (error) {
                    console.error('Error fetching animal data:', error.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [type, petData]);

    useEffect(() => {
        setImages(formData.images)
    }, [formData.images]);

    const toggleLanguage = async (e) => {
        e.preventDefault();
        setLanguage((prev) => prev === 'ua' ? 'en' : 'ua');
    }

    const handleImageUploaded = (newImageUrl) => {
        setFormData(prev => {
            const updatedImages = [...prev.images, newImageUrl].slice(0, maxImages);
            setHasUnsavedChanges(true);
            return { ...prev, images: updatedImages };
        });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setHasUnsavedChanges(true);
        setFormData(prev => {
            const updatedFormData = { ...prev, [name]: value };
            setIsFormValid(checkFormValidity(updatedFormData));
            return updatedFormData;
        });
    }

    function getUpdatedFields(formData, originalData) {
        const patch = [];
        Object.keys(formData).forEach(key => {
            if (Array.isArray(formData[key])) {
                if (JSON.stringify(formData[key]) !== JSON.stringify(originalData[key])) {
                    patch.push({
                        operationType: 1,
                        path: `/${key}`,
                        op: "replace",
                        value: formData[key]
                    });
                }
            } else {
                if (formData[key] !== originalData[key]) {
                    patch.push({
                        operationType: 1,
                        path: `/${key}`,
                        op: "replace",
                        value: formData[key]
                    });
                }
            }
        })
        return patch;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === 'create') {
            await handleCreateAnimal();
        } else {
            await handleUpdateAnimal();
        }
    }

    const handleCreateAnimal = async () => {
        if (!checkFormValidity(formData)) {
            setIsFormValid(false);
            return;
        }
        const animalData = {
            name_ua: formData.name_ua,
            category: formData.category,
            description_ua: formData.description_ua,
            story_ua: formData.story_ua,
            images: formData.images,
            name_en: formData.name_en,
            story_en: formData.story_en,
            description_en: formData.description_en,
        };
        try {
            setIsLoading(true);
            const response = await fetch('https://karg-backend.onrender.com/karg/animal/add', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(animalData)
            });
            if (response.ok) {
                showModal('confirmation',
                    <SuccessDialog
                        title={successTitle}
                        message={type === 'create' ? successAddMessage : successChangeMessage}
                        buttonText={buttonText}
                        onClick={() => {
                            hideModal('confirmation');
                            hideModal('generic');
                        }}
                        buttonStyle={stylesBtn.congratsCloseBtn}
                    />)
                // refreshPets();
                setHasUnsavedChanges(false);
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
        if (!updates.length) {
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(`https://karg-backend.onrender.com/karg/animal/update?id=${formData.id}`, {
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
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                    onClick={() => {
                        hideModal('confirmation');
                        hideModal('generic');
                    }}
                    buttonStyle={stylesBtn.congratsCloseBtn}
                />)
            refreshPets('ua');
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating animal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const undoingChanges = () => {
        setFormData({ ...originalData });
        setIsFormValid(checkFormValidity(originalData));
        setHasUnsavedChanges(false);
        hideModal('confirmation');
    }

    const handleDeleteImage = (index) => {
        setFormData(prev => {
            const updatedImages = prev.images.filter((_, i) => i !== index);
            return { ...prev, images: updatedImages };
        });
        setHasUnsavedChanges(true);
    }

    const showConfirmation = () => {
        showModal('confirmation',
            <ConfirmationDialog
                confirmationTitle={confirmationTitle}
                message={message}
                cancelTitle={cancelTitle}
                confirmTitle={confirmTitle}
                onConfirm={() => {
                    undoingChanges();
                    hideModal('confirmation');
                    hideModal('generic');
                }}
                onCancel={() => {
                    hideModal('confirmation');
                }}
                leftButtonStyle={stylesBtn.confirmationCancelBtn}
                rightButtonStyle={stylesBtn.confirmationRevertBtn}
            />)
    }

    const checkFormValidity = (formData) => {
        const requiredFields = ['name_ua', 'name_en', 'category', 'description_ua', 'description_en', 'story_ua', 'story_en'];
        return requiredFields.every(field => formData[field].trim() !== '');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
                                name={language === 'ua' ? "name_ua" : "name_en"}
                                value={language === 'ua' ? formData.name_ua : formData.name_en}
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
                                                        handleDeleteImage(index);
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
                                    required
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
                                name={language === 'ua' ? "description_ua" : "description_en"}
                                maxLength="500"
                                value={language === 'ua' ? formData.description_ua : formData.description_en}
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
                                name={language === 'ua' ? "story_ua" : "story_en"}
                                maxLength="500"
                                value={language === 'ua' ? formData.story_ua : formData.story_en}
                                className={`${styles.textareaField} ${variables.font18w500}`}
                                onChange={(e) => handleChange(e)}
                            >
                            </textarea>
                        </div>
                        <div className={styles.buttonGroup}>
                            <Button
                                type="button"
                                className={stylesBtn.adminFormButtonReject}
                                onClick={() => showConfirmation()}
                            >
                                {btnReject}
                            </Button>
                            <Button
                                type="submit"
                                className={stylesBtn.adminFormButtonSubmit}
                                disabled={!isFormValid}
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