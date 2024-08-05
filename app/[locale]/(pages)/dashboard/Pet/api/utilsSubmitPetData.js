import { addAnimal, updateAnimal } from "./api";
import { checkFormValidity } from '../PetForm/checkFormValidity';
import SuccessDialog from "../../SuccessDialog/SuccessDialog";

export const submitPetData = async (type, formData, originalData, showModal, hideModal, setHasUnsavedChanges, successDialogActions) => {
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

    const handleCreateAnimal = async () => {
        if (!checkFormValidity(formData)) {
            setIsFormValid(false);
            return;
        }
        const animalData = {
            name_ua: formData.name_ua,
            category: formData.category,
            description_ua: formData.description_ua,
            story_ua: formData.story_ua,
            images: formData.images,
            name_en: formData.name_en,
            story_en: formData.story_en,
            description_en: formData.description_en,
        };
        try {
            await addAnimal(animalData);
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

    const handleUpdateAnimal = async () => {
        const updates = getUpdatedFields(formData, originalData);
        if (!updates.length) {
            hideModal('generic');
            return;
        }
        try {
            await updateAnimal(formData.id, updates);
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
        await handleCreateAnimal();
    } else {
        await handleUpdateAnimal();
    }
}
