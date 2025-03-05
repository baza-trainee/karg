import { updateContactItem } from "./api";
import SuccessDialog from "./SuccessDialog/SuccessDialog";

export const submitContactData = async (type, formData, originalData, hideModal, showModal, setHasUnsavedChanges, successDialogActions) => {
    const { successTitle, successAddMessage, successChangeMessage, buttonText } = successDialogActions;

    const getUpdatedFields = (formData, originalData) => {
        const patch = [];
        Object.keys(formData).forEach(key => {
            if (key === "id" || key === "category") {
                return;
            }
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
        });
        return patch;
    };

    const handleUpdateContact = async () => {
        for (const item of formData) {
            if (!item.id) continue;

            const updates = getUpdatedFields(item, originalData);
            if (!updates.length) {
                hideModal('generic');
                continue;
            }
            try {
                await updateContactItem(item.id, updates);
            } catch (error) {
                console.error('Error updating contact:', error);
            }
        }

        showModal('confirmation',
            <SuccessDialog
                title={successTitle}
                message={type === 'create' ? successAddMessage : successChangeMessage}
                buttonText={buttonText}
            />
        );
        setHasUnsavedChanges(false);
    };
    await handleUpdateContact();
}
