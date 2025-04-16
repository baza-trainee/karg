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
import { fetchContactItemData } from "../utilsFetchContactData";
import { ContactContext } from "../ContactContext";
import { validateAndFormatPhoneNumber } from "./checkFormValidity";
import SuccessDialog from "../../SuccessDialog/SuccessDialog";

const categoryTitle = "Вид даних";

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
    successAddMessage: 'Нові дані успішно додано!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function ContactForm({ type = 'edit', contactData = {}, categoryLabel }) {
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { hideModal, showModal } = useContext(ModalContext);
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState(contactData);
    const [originalData, setOriginalData] = useState(contactData);
    const [isLoading, setIsLoading] = useState(false);
    const { loadAllContacts } = useContext(ContactContext);
    const title = type === 'create' ? "Додати питання" : "Редагувати дані";
    const { btnReject, btnSubmit, btnSaveChanges } = btnLabels;

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                let data;
                if (type === 'edit' &&
                    contactData.category === "Location" &&
                    contactData.idUa &&
                    contactData.idEn
                ) {
                    const [dataUa, dataEn] = await Promise.all([
                        fetchContactItemData(contactData.idUa),
                        fetchContactItemData(contactData.idEn)
                    ]);
                    data = {
                        category: "Location",
                        idUa: contactData.idUa,
                        idEn: contactData.idEn,
                        valueUa: dataUa.value || '',
                        valueEn: dataEn.value || ''
                    };
                } else {
                    data = await fetchContactItemData(contactData.id);
                }
                if (data?.error) {
                    setFormData({});
                    setOriginalData({});
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
                console.error('Error loading Contact data:', error.message);
            }
            setIsLoading(false);
        };
        if (type === 'edit' && (contactData.id
            || (contactData.category === 'Location'
                && contactData.idUa && contactData.idEn))) {
            fetchInitialData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [contactData.id, contactData.idUa, contactData.idEn, type]);

    useEffect(() => {
        setIsFormValid(checkFormValidity(formData));
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const updatedData = formData.category === "Location"
            ? [
                { id: formData.idUa, category: "LocationUa", value: formData.valueUa || '' },
                { id: formData.idEn, category: "LocationEn", value: formData.valueEn || '' }
            ]
            : [{
                ...formData,
                value: formData.category === "Statistics" && formData.id === 12
                    ? `${formData.value}`
                    : formData.value
            }];

        await submitContactData(
            type,
            updatedData,
            originalData,
            hideModal,
            showModal,
            setHasUnsavedChanges,
            successDialogActions,
        );
        await loadAllContacts();
        setIsLoading(false);
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setHasUnsavedChanges(true);
        setFormData(prev => {
            let updatedValue = value;
            if (name === 'value' && formData.category === 'PhoneNumber') {
                updatedValue = value.replace(/(?!^\+)[^\d]/g, '');

                const formattedNumber = validateAndFormatPhoneNumber(value);
                if (formattedNumber !== 'Некоректний номер') {
                    updatedValue = formattedNumber;
                }
            }
            if (name === 'value' && formData.category === 'Statistics') {
                updatedValue = value.replace(/\D/g, "");
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
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                            categoryTitle={categoryTitle}
                            categoryLabel={categoryLabel}
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