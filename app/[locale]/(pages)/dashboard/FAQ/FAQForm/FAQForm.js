'use client'

import styles from "./styles/faqForm.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import { useContext, useState, useEffect } from "react";
import ModalContext from "@/app/ModalContext";
import Spinner from "@/components/Spinner/Spinner";
import { useUnsavedChanges } from "@/app/UnsavedChangesContext";
import { submitFAQData } from "../utilsSubmitFAQData";
import FormHeader from "../../components/FormHeader/FormHeader";
import FormFields from "./FormFields/FormFields";
import FormButtons from "../../components/FormButtons/FormButtons";
import { memo } from 'react';
import { checkFormValidity } from './checkFormValidity';
import { initializeFormData, fetchFAQItemData } from "../utilsFetchFAQData";
import { FAQContext } from "../FAQContext";
import SuccessDialog from "../../SuccessDialog/SuccessDialog";

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

function FAQForm({ type = 'create', faqData = {} }) {
    const { ukrLng, engLng, questionTitle, answerTitle } = labels;
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { hideModal, showModal } = useContext(ModalContext);
    const [language, setLanguage] = useState('ua');
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState(initializeFormData(faqData));
    const [originalData, setOriginalData] = useState(initializeFormData(faqData));
    const [isLoading, setIsLoading] = useState(false);
    const { loadAllFaq } = useContext(FAQContext);
    const title = type === 'create' ? "Додати питання" : "Редагувати питання";
    const { btnReject, btnSubmit, btnSaveChanges } = btnLabels;

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchFAQItemData(faqData.id, type, setIsLoading);
                if (data?.error) {
                    setFormData(initializeFormData({}));
                    setOriginalData(initializeFormData({}));
                    setIsFormValid(false);
                    hideModal('generic');
                    const errorMessage = data.error === 'not_found'
                        ? 'Запис не знайдено, або було видалено.'
                        : data.error;
                    showModal(
                        'confirmation',
                        <SuccessDialog
                            title={"Помилка"}
                            message={errorMessage}
                            buttonText={"Закрити"}
                        />
                    );
                    setIsLoading(false);
                    return;
                }
                setFormData(data);
                setOriginalData(data);
                setIsFormValid(checkFormValidity(data));
            } catch (error) {
                console.error('Error loading FAQ data:', error.message);
            }
            setIsLoading(false);
        };
        if (type === 'edit' && faqData.id) {
            fetchInitialData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [faqData.id, type]);

    useEffect(() => {
        setIsFormValid(checkFormValidity(formData));
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await submitFAQData(
            type,
            formData,
            originalData,
            showModal,
            setHasUnsavedChanges,
            successDialogActions,
        );
        await loadAllFaq();
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

    const handleOnBlur = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;
        setHasUnsavedChanges(true);
        setFormData(prev => {
            if (name === 'question_ua' || name === 'question_en') {
                updatedValue = value.replace(/\?/g, "").trim() + "?";
            }
            const updatedFormData = { ...prev, [name]: updatedValue };
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
                            handleOnBlur={handleOnBlur}
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

export default memo(FAQForm)