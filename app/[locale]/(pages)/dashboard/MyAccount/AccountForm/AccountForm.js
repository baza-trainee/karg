'use client'

import styles from "./styles/accountForm.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import { useContext, useState, useEffect } from "react";
import ModalContext from "@/app/ModalContext";
import { AdminContext } from '@/app/adminProvider';
import Spinner from "@/components/Spinner/Spinner";
import { useUnsavedChanges } from "@/app/UnsavedChangesContext";
import { submitTeamMemberData } from "../utilsSubmitAccountData";
import FormHeader from "../../components/FormHeader/FormHeader";
import ImageUploader from './ImageUploader/ImageUploader';
import FormFields from "./FormFields/FormFields";
import FormButtons from "../../components/FormButtons/FormButtons";
import { memo } from 'react';
import { checkFormValidity } from './checkFormValidity';
import { initializeFormData, fetchTeamUserData } from "../utilsFetchAccountData";
import variables from '../../../../variables.module.scss';

const labels = {
    firstNameTitle: "Імʼя",
    lastNameTitle: "Прізвище",
    phoneNumberTitle: "Контактний номер телефону",
    emailTitle: "E-mail",
};

const btnLabels = {
    changePasswordButton: "Змінити пароль",
    btnSaveChanges: "Зберегти зміни"
}

const successDialogActions = {
    successTitle: 'Вітаємо!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function AccountForm({ type = 'edit', accountData = {} }) {
    const { firstNameTitle, lastNameTitle, phoneNumberTitle, emailTitle } = labels;
    const { hideModal, showModal } = useContext(ModalContext);
    const { accountId } = useContext(AdminContext);
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState(initializeFormData(accountData));
    const [originalData, setOriginalData] = useState(initializeFormData(accountData));
    const [isLoading, setIsLoading] = useState(false);
    const title = "Персональна інформація";
    const { changePasswordButton, btnSaveChanges } = btnLabels;
    const maxImages = 1;

    useEffect(() => {

        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                localStorage.setItem('accountId', accountId);
                const data = await fetchTeamUserData(accountId, type);
                setFormData(data);
                setOriginalData(data);
                setIsFormValid(checkFormValidity(data));

            } catch (error) {
                console.error('Error loading account data:', error.message);
            }
            setIsLoading(false);
        };
        if (accountId) {
            fetchInitialData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [accountId]);

    useEffect(() => {
        setIsFormValid(checkFormValidity(formData));
    }, [formData]);


    const handleSubmit = async (e) => {


        const distructuredFormData = {
            id: formData.id ? formData.id : accountId,
            fullName: formData.fullName_name + " " + formData.fullName_lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            images: formData.images,
        };

        const distructuredOriginalData = {
            id: originalData.id ? originalData.id : accountId,
            fullName: originalData.fullName_name + " " + originalData.fullName_lastName,
            email: originalData.email,
            phoneNumber: originalData.phoneNumber,
            images: originalData.images,
        };

        e.preventDefault();
        setIsLoading(true);
        await submitTeamMemberData(
            //type,
            distructuredFormData,
            distructuredOriginalData,
            hideModal,
            showModal,
            setHasUnsavedChanges,
            successDialogActions,
        );
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
            console.log(checkFormValidity(updatedFormData));
            return updatedFormData;
        });
    }

    const handleDeleteImage = (index) => {
        setFormData(prev => {
            const updatedImages = prev.images.filter((_, i) => i !== index);
            return { ...prev, images: updatedImages };
        });
        setHasUnsavedChanges(true);
    }

    return (
        <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {formData &&
                            <div className={styles.container}>
                                <ImageUploader
                                    images={formData.images}
                                    imageId={formData.id}
                                    maxImages={maxImages}
                                    handleImageUploaded={handleImageUploaded}
                                    handleDeleteImage={handleDeleteImage}
                                />
                                <FormHeader
                                    title={title}
                                    customHeader={styles.customHeader}
                                    customTitle={styles.customTitle}
                                />
                                <FormFields
                                    formData={formData}
                                    type={type}
                                    handleChange={handleChange}
                                    maxImages={maxImages}
                                    firstNameTitle={firstNameTitle}
                                    lastNameTitle={lastNameTitle}
                                    phoneNumberTitle={phoneNumberTitle}
                                    emailTitle={emailTitle}
                                />
                                <FormButtons
                                    isFormValid={isFormValid}
                                    handleSubmit={handleSubmit}
                                    restoreButtonStyle={stylesBtn.adminMyAccountFormBtnRejct}
                                    submitButtonStyle={stylesBtn.adminMyAccountFormBtnSubmit}
                                    submitButtonTitle={btnSaveChanges}
                                    changePasswordButtonTitle={changePasswordButton}
                                    customButtonGroup={styles.customButtonGroup}
                                    customVariables={variables.font20w700}
                                />
                            </div>
                        }
                    </>
                )}
            </form >
        </div>
    );
}

export default memo(AccountForm)