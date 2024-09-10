import FormHeaderPartner from "../PartnerForm/FormHeader/FormHeaderPartner";
import FormButtons from "../../components/FormButtons/FormButtons";
import FormFieldsPartner from "./FormFields/FormFieldsPartner";
import Spinner from "@/components/Spinner/Spinner";
import styles from "./styles/partnerForm.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import { initializeFormData, fetchPartnerData } from "../api/utilsFetchPartnerData";
import { submitPartnerData } from "../api/utilsSubmitPartnerData";
import { useState, useEffect, useContext } from "react";
import { PartnerContext } from "../PartnerContext";
import { useUnsavedChanges } from "@/app/UnsavedChangesContext";
import { checkFormValidity } from "./checkFormValidity";
import ModalContext from "@/app/ModalContext";

const labels = {
    nameTitle: "Назва компанії",
    linkTitle: "Посилання",
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
    successAddMessage: 'Нового партнера успішно додано!',
    successChangeMessage: 'Внесені зміни збережено!',
    buttonText: 'Закрити'
}

function PartnerForm({ type = 'create', partnerData = {} }) {
    const [isLoading, setIsLoading] = useState(false);
    const title = type === 'create' ? "Додати партнера" : "Редагувати партнера";
    const { nameTitle, linkTitle, placeholder } = labels;
    const [formData, setFormData] = useState(initializeFormData(partnerData));
    const [originalData, setOriginalData] = useState(initializeFormData(partnerData));
    const [isFormValid, setIsFormValid] = useState(false);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = confirmationDialogActions;
    const { btnReject, btnSubmit, btnSaveChanges } = btnLabels;
    const { setHasUnsavedChanges } = useUnsavedChanges();
    const { showModal, hideModal } = useContext(ModalContext);
    const { loadPartners } = useContext(PartnerContext);
    const maxImages = 1;

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPartnerData(partnerData.id, type, setIsLoading);
                setFormData(data);
                setOriginalData(data);
                setIsFormValid(checkFormValidity(data));
            } catch (error) {
                console.error('Error loading partner data:', error.message);
            }
            setIsLoading(false);
        };
        if (type === 'edit' && partnerData.id) {
            fetchInitialData();
        } else {
            setIsFormValid(checkFormValidity(formData));
        }
    }, [partnerData.id, type]);

    useEffect(() => {
        setIsFormValid(checkFormValidity(formData));
    }, [formData]);

    const handleImageUploaded = (newImageUrl) => {
        setFormData(prev => {
            const updatedImages = [...prev.images, newImageUrl].slice(0, maxImages);
            return { ...prev, images: updatedImages };
        });
        setHasUnsavedChanges(true);
    };

    const handleDeleteImage = (index) => {
        setFormData(prev => {
            const updatedImages = prev.images.filter((_, i) => i !== index);
            return { ...prev, images: updatedImages };
        });
        setHasUnsavedChanges(true);
    }

    const handleChange = (e) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await submitPartnerData(
            type,
            formData,
            originalData,
            showModal,
            hideModal,
            setHasUnsavedChanges,
            successDialogActions,
        );
        await loadPartners();
        setIsLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className={styles.container}>
                        <FormHeaderPartner
                            title={title}
                        />
                        <FormFieldsPartner
                            formData={formData}
                            type={type}
                            handleChange={handleChange}
                            handleImageUploaded={handleImageUploaded}
                            handleDeleteImage={handleDeleteImage}
                            placeholder={placeholder}
                            nameTitle={nameTitle}
                            linkTitle={linkTitle}
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
export default PartnerForm;