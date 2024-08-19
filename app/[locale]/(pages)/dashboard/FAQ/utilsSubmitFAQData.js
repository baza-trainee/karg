import { addFAQItem, updateFAQItem } from "./api";
import { checkFormValidity } from './FAQForm/checkFormValidity';
import SuccessDialog from "./SuccessDialog/SuccessDialog";
import stylesBtn from '@/components/Button/styles/button.module.scss';

export const submitFAQData = async (type, formData, originalData, hideModal, showModal, setHasUnsavedChanges, successDialogActions) => {
    const { successTitle, successAddMessage, successChangeMessage, buttonText } = successDialogActions;

    const getUpdatedFields = (formData, originalData) => {
        console.log(formData, 'formData');
        console.log(originalData, 'originalData');
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

    const handleCreateFAQ = async () => {
        console.log(checkFormValidity(formData));
        if (!checkFormValidity(formData)) {
            setIsFormValid(false);
            return;
        }
        const faqData = {
            id: formData.id,
            question_en: formData.question_en,
            answer_en: formData.answer_en,
            question_ua: formData.question_ua,
            answer_ua: formData.answer_ua,
        };
        try {
            await addFAQItem(faqData);
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

    const handleUpdateFAQ = async () => {
        const updates = getUpdatedFields(formData, originalData);
        console.log(updates);
        if (!updates.length) {
            return;
        }
        try {
            await updateFAQItem(formData.id, updates);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                />)
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating faq:', error);
        }
    };
    if (type === 'create') {
        await handleCreateFAQ();
    } else {
        await handleUpdateFAQ();
    }
}
