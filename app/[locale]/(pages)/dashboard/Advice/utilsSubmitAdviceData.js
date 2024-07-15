import { addAdvice, updateAdvice } from "./api";
import { checkFormValidity } from './AdviceForm/checkFormValidity';
import SuccessDialog from "./SuccessDialog/SuccessDialog";
import stylesBtn from '@/components/Button/styles/button.module.scss';

export const submitAdviceData = async (type, formData, originalData, hideModal, showModal, setHasUnsavedChanges, successDialogActions) => {
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

    const handleCreateAdvice = async () => {
        console.log(checkFormValidity(formData));
        if (!checkFormValidity(formData)) {
            setIsFormValid(false);
            return;
        }
        const adviceData = {
            title_en: formData.title_en,
            description_en: formData.description_en,
            title_ua: formData.title_ua,
            description_ua: formData.description_ua,
            created_at: formData.created_at,
            image: formData.image,
        };
        try {
            await addAdvice(adviceData);
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

    const handleUpdateAdvice = async () => {
        const updates = getUpdatedFields(formData, originalData);
        console.log(updates);
        if (!updates.length) {
            return;
        }
        try {
            await updateAdvice(formData.id, updates);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                />)
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating animal:', error);
        }
    };
    if (type === 'create') {
        await handleCreateAdvice();
    } else {
        await handleUpdateAdvice();
    }
}
