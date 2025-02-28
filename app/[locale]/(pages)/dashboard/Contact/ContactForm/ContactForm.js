'use client'

import styles from "./styles/contactForm.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import { useContext, useState, useEffect } from "react";
import ModalContext from "@/app/ModalContext";
import Spinner from "@/components/Spinner/Spinner";
import { useUnsavedChanges } from "@/app/UnsavedChangesContext";
import { submitContactData } from "../utilsSubmitContactData";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFields from "./FormFields/FormFields";
import FormButtons from "../../components/FormButtons/FormButtons";
import { memo } from 'react';
import { checkFormValidity } from './checkFormValidity';
import { initializeFormData, fetchContactItemData } from "../utilsFetchContactData";
import { ContactContext } from "../ContactContext";

const labels = {
    ukrLng: "Українська",
    engLng: "Англійська",
    questionTitle: "Питання",
    answerTitle: "Відповідь",
};

const btnLabels = {
    btnReject: "Скасувати",
    btnSubmit: "Зберегти",
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
    successAddMessage: 'Нове питання успішно додано!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function ContactForm({ type = 'create', contactData = {} }) {
    const { ukrLng, engLng, questionTitle, answerTitle } = labels;
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { hideModal, showModal } = useContext(ModalContext);
    const [language, setLanguage] = useState('ua');
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState(initializeFormData(contactData));
    const [originalData, setOriginalData] = useState(initializeFormData(contactData));
    const [isLoading, setIsLoading] = useState(false);
    const { loadAllContacts } = useContext(ContactContext);
    const title = type === 'create' ? "Додати питання" : "Редагувати питання";
    const { btnReject, btnSubmit, btnSaveChanges } = btnLabels;

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchContactItemData(contactData.id, type, setIsLoading);
                setFormData(data);
                setOriginalData(data);
                setIsFormValid(checkFormValidity(data));
            } catch (error) {
                console.error('Error loading Contact data:', error.message);
            }
            setIsLoading(false);
        };
        if (type === 'edit' && contactData.id) {
            fetchInitialData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [contactData.id, type]);

    useEffect(() => {
        setIsFormValid(checkFormValidity(formData));
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await submitContactData(
            type,
            formData,
            originalData,
            hideModal,
            showModal,
            setHasUnsavedChanges,
            successDialogActions,
        );
        await loadAllContacts();
        setIsLoading(false);
    };

    const toggleLanguage = async (e) => {
        e.preventDefault();
        setLanguage((prev) => prev === 'ua' ? 'en' : 'ua');
    }

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
                            questionTitle={questionTitle}
                            answerTitle={answerTitle}
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

export default memo(ContactForm)