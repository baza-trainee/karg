import { addPartner, updatePartner } from "./api";
import { checkFormValidity } from '../PartnerForm/checkFormValidity';
import SuccessDialog from "../../SuccessDialog/SuccessDialog";

export const submitPartnerData = async (type, formData, originalData, showModal, hideModal, setHasUnsavedChanges, successDialogActions) => {
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

    const handleCreatePartner = async () => {
        if (!checkFormValidity(formData)) {
            setIsFormValid(false);
            return;
        }
        const partnerData = {
            name: formData.name,
            image: formData.image,
            uri: formData.uri,
        };
        try {
            await addPartner(partnerData);
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

    const handleUpdatePartner = async () => {
        const updates = getUpdatedFields(formData, originalData);
        if (!updates.length) {
            hideModal('generic');
            return;
        }
        try {
            await updatePartner(formData.id, updates);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={type === 'create' ? successAddMessage : successChangeMessage}
                    buttonText={buttonText}
                />)
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating partner:', error);
        }
    };
    if (type === 'create') {
        await handleCreatePartner();
    } else {
        await handleUpdatePartner();
    }
}
