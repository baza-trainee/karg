import { updateRescuerInfo } from "./api";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

export const submitTeamMemberData = async (destructuredFormData, destructuredOriginalData, showModal, setHasUnsavedChanges, successDialogActions) => {
    const { successTitle, successChangeMessage, buttonText } = successDialogActions;

    const getUpdatedFields = (destructuredFormData, destructuredOriginalData) => {
        const patch = [];
        Object.keys(destructuredFormData).forEach(key => {
            if (Array.isArray(destructuredFormData[key])) {
                if (JSON.stringify(destructuredFormData[key]) !== JSON.stringify(destructuredOriginalData[key])) {
                    patch.push({
                        operationType: 1,
                        path: `/${key}`,
                        op: "replace",
                        value: destructuredFormData[key]
                    });
                }
            } else {
                if (destructuredFormData[key] !== destructuredOriginalData[key]) {
                    patch.push({
                        operationType: 1,
                        path: `/${key}`,
                        op: "replace",
                        value: destructuredFormData[key]
                    });
                }
            }
        })
        return patch;
    }

    const handleUpdateAccount = async () => {
        const updates = getUpdatedFields(destructuredFormData, destructuredOriginalData);
        if (!updates.length) {
            return;
        }
        try {
            await updateRescuerInfo(destructuredFormData.id, updates);
            showModal('confirmation',
                <SuccessDialog
                    title={successTitle}
                    message={successChangeMessage}
                    buttonText={buttonText}
                />)
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error updating rescuer account:', error);
        }
    };
    await handleUpdateAccount();
}
