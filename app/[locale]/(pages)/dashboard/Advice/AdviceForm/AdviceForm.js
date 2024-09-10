'use client'

import styles from "./styles/adviceForm.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import { useContext, useState, useEffect } from "react";
import ModalContext from "@/app/ModalContext";
import Spinner from "@/components/Spinner/Spinner";
import { useUnsavedChanges } from "@/app/UnsavedChangesContext";
import { submitAdviceData } from "../utilsSubmitAdviceData";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFields from "./FormFields/FormFields";
import FormButtons from "../../components/FormButtons/FormButtons";
import { memo } from 'react';
import { checkFormValidity } from './checkFormValidity';
import { initializeFormData, fetchAdviceData } from "../utilsFetchAdviceData";
import { AdviceContext } from "../AdviceContext";
const maxImages = 4;

const labels = {
    ukrLng: "Українська",
    engLng: "Англійська",
    nameTitle: "Заголовок",
    descriptionTitle: "Текст статті",
};

const btnLabels = {
    btnReject: "Скасувати",
    btnSubmit: "Опублікувати",
    btnSaveChanges: "Зберегти зміни"
}

const confirmationDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете скасувати цю дію?',
    message: 'Внесені дані не будуть збережені.',
    cancelTitle: 'Відмінити',
    confirmTitle: 'Скасувати'
};

const successDialogActions = {
    successTitle: 'Вітаємо!',
    successAddMessage: 'Нову пораду успішно додано!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function AdviceForm({ type = 'create', adviceData = {} }) {
    const { ukrLng, engLng, nameTitle, descriptionTitle } = labels;
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { hideModal, showModal } = useContext(ModalContext);
    const [language, setLanguage] = useState('ua');
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState(initializeFormData(adviceData));
    const [originalData, setOriginalData] = useState(initializeFormData(adviceData));
    const [isLoading, setIsLoading] = useState(false);
    const { loadAdvices } = useContext(AdviceContext);
    const title = type === 'create' ? "Додати пораду" : "Редагувати пораду";
    const { btnReject, btnSubmit, btnSaveChanges } = btnLabels;

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchAdviceData(adviceData.id, type, setIsLoading);
                setFormData(data);
                setOriginalData(data);
                setIsFormValid(checkFormValidity(data));
            } catch (error) {
                console.error('Error loading addvice data:', error.message);
            }
            setIsLoading(false);
        };
        if (type === 'edit' && adviceData.id) {
            fetchInitialData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [adviceData.id, type]);

    useEffect(() => {
        setIsFormValid(checkFormValidity(formData));
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await submitAdviceData(
            type,
            formData,
            originalData,
            hideModal,
            showModal,
            setHasUnsavedChanges,
            successDialogActions,
        );
        await loadAdvices();
        setIsLoading(false);
    };

    const toggleLanguage = async (e) => {
        e.preventDefault();
        setLanguage((prev) => prev === 'ua' ? 'en' : 'ua');
    }

    const handleImageUploaded = (newImageUrl) => {
        setFormData(prev => {
            const updatedImages = [...prev.images, newImageUrl].slice(0, maxImages);
            return { ...prev, images: updatedImages };
        });
        setHasUnsavedChanges(true);
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

    const undoingChanges = () => {
        setFormData({ ...originalData });
        setIsFormValid(checkFormValidity(originalData));
        setHasUnsavedChanges(false);
    }

    const handleDeleteImage = (index) => {
        setFormData(prev => {
            const updatedImages = prev.images.filter((_, i) => i !== index);
            return { ...prev, images: updatedImages };
        });
        setHasUnsavedChanges(true);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className={styles.container}>
                        <FormHeader
                            title={title}
                            language={language}
                            toggleLanguage={toggleLanguage}
                            ukrLng={ukrLng}
                            engLng={engLng}
                        />
                        <FormFields
                            formData={formData}
                            type={type}
                            language={language}
                            handleChange={handleChange}
                            handleImageUploaded={handleImageUploaded}
                            handleDeleteImage={handleDeleteImage}
                            maxImages={maxImages}
                            descriptionTitle={descriptionTitle}
                            nameTitle={nameTitle}
                        />
                        <FormButtons
                            isFormValid={isFormValid}
                            handleSubmit={handleSubmit}
                            actionOnConfirm={undoingChanges}
                            confirmationTitle={confirmationTitle}
                            message={message}
                            cancelTitle={cancelTitle}
                            confirmTitle={confirmTitle}
                            rejectButtonStyle={stylesBtn.adminFormButtonReject}
                            submitButtonStyle={stylesBtn.adminFormButtonSubmit}
                            rejectButtonTitle={btnReject}
                            submitButtonTitle={type === 'create' ? btnSubmit : btnSaveChanges}
                        />
                    </div>
                </>
            )}
        </form >
    );
}

export default memo(AdviceForm)