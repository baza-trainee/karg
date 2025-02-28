import { addContactItem, updateContactItem } from "./api";
import { checkFormValidity } from './ContactForm/checkFormValidity';
import SuccessDialog from "./SuccessDialog/SuccessDialog";
import stylesBtn from '@/components/Button/styles/button.module.scss';

export const submitContactData = async (type, formData, originalData, hideModal, showModal, setHasUnsavedChanges, successDialogActions) => {
    const { successTitle, successAddMessage, successChangeMessage, buttonText } = successDialogActions;

    const getUpdatedFields = (formData, originalData) => {
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

    const handleCreateContact = async () => {
        if (!checkFormValidity(formData)) {
            setIsFormValid(false);
            return;
        }
        const contactData = {
            question_en: formData.question_en,
            answer_en: formData.answer_en,
            question_ua: formData.question_ua,
            answer_ua: formData.answer_ua,
        };
        try {
            await addContactItem(contactData);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                />)
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleUpdateContact = async () => {
        const updates = getUpdatedFields(formData, originalData);
        if (!updates.length) {
            return;
        }
        try {
            await updateContactItem(formData.id, updates);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                />)
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };
    if (type === 'create') {
        await handleCreateContact();
    } else {
        await handleUpdateContact();
    }
}
