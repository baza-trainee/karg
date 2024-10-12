'use client'

import styles from "./styles/adviceForm.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import { useContext, useState, useEffect } from "react";
import ModalContext from "@/app/ModalContext";
import Spinner from "@/components/Spinner/Spinner";
import { useUnsavedChanges } from "@/app/UnsavedChangesContext";
import { submitTeamMemberData } from "../utilsSubmitTeamData";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFields from "./FormFields/FormFields";
import FormButtons from "../../components/FormButtons/FormButtons";
import { memo } from 'react';
import { checkFormValidity } from './checkFormValidity';
import { initializeFormData, deleteTeamUserData, fetchTeamUserData } from "../utilsFetchTeamData";
import { TeamContext } from "../TeamContext";

const labels = {
    fullNameTitle: "Імʼя та прізвище",
    phoneNumberTitle: "Телефон",
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
    successAddMessage: 'Нового користувача успішно додано!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function RescuerForm({ type = 'create', rescuerData = {} }) {
    const { fullNameTitle, phoneNumberTitle } = labels;
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { hideModal, showModal } = useContext(ModalContext);
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState(initializeFormData(rescuerData));
    const [originalData, setOriginalData] = useState(initializeFormData(rescuerData));
    const [isLoading, setIsLoading] = useState(false);
    const { loadRescuers } = useContext(TeamContext);
    const title = type === 'create' ? "Додати користувача" : "Редагувати користувача";
    const { btnReject, btnSubmit, btnSaveChanges } = btnLabels;
    const maxImages = 2;

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchTeamUserData(rescuerData.id, type, setIsLoading);
                setFormData(data);
                setOriginalData(data);
                setIsFormValid(checkFormValidity(data));
            } catch (error) {
                console.error('Error loading rescuers data:', error.message);
            }
            setIsLoading(false);
        };
        if (type === 'edit' && rescuerData.id) {
            fetchInitialData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [rescuerData.id, type]);

    useEffect(() => {
        setIsFormValid(checkFormValidity(formData));
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await submitTeamMemberData(
            type,
            formData,
            originalData,
            hideModal,
            showModal,
            setHasUnsavedChanges,
            successDialogActions,
        );
        await loadRescuers();
        setIsLoading(false);
    };

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
                        />
                        <FormFields
                            formData={formData}
                            type={type}
                            handleChange={handleChange}
                            handleImageUploaded={handleImageUploaded}
                            handleDeleteImage={handleDeleteImage}
                            maxImages={maxImages}
                            phoneNumberTitle={phoneNumberTitle}
                            fullNameTitle={fullNameTitle}
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

export default memo(RescuerForm)