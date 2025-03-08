import { addStat, updateStat } from "./api";
import { checkFormValidity } from './StatsForm/checkFormValidity';
import SuccessDialog from "../SuccessDialog/SuccessDialog";

export const submitStatsData = async (type, formData, originalData, showModal, setHasUnsavedChanges, successDialogActions) => {
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

    const handleCreateStat = async () => {
        if (!checkFormValidity(formData)) {
            setIsFormValid(false);
            return;
        }
        const statData = {
            title_en: formData.title_en,
            title_ua: formData.title_ua,
            description_en: formData.description_en,
            description_ua: formData.description_ua,
            created_at: formData.created_at || '',
            images: formData.images,
        };
        try {
            await addStat(statData);
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

    const handleUpdateStat = async () => {
        const updates = getUpdatedFields(formData, originalData);
        if (!updates.length) {
            return;
        }
        try {
            await updateStat(formData.id, updates);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                />)
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating:', error);
        }
    };
    if (type === 'create') {
        await handleCreateStat();
    } else {
        await handleUpdateStat();
    }
}
