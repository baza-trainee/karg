import { updateRescuerInfo } from "./api";
import SuccessDialog from "./SuccessDialog/SuccessDialog";
import stylesBtn from '@/components/Button/styles/button.module.scss';

export const submitTeamMemberData = async (distructuredFormData, distructuredOriginalData, hideModal, showModal, setHasUnsavedChanges, successDialogActions) => {
    const { successTitle, successChangeMessage, buttonText } = successDialogActions;

    const getUpdatedFields = (distructuredFormData, distructuredOriginalData) => {
        const patch = [];
        Object.keys(distructuredFormData).forEach(key => {
            if (Array.isArray(distructuredFormData[key])) {
                if (JSON.stringify(distructuredFormData[key]) !== JSON.stringify(distructuredOriginalData[key])) {
                    patch.push({
                        operationType: 1,
                        path: `/${key}`,
                        op: "replace",
                        value: distructuredFormData[key]
                    });
                }
            } else {
                if (distructuredFormData[key] !== distructuredOriginalData[key]) {
                    patch.push({
                        operationType: 1,
                        path: `/${key}`,
                        op: "replace",
                        value: distructuredFormData[key]
                    });
                }
            }
        })
        return patch;
    }

    const handleUpdateAccount = async () => {
        const updates = getUpdatedFields(distructuredFormData, distructuredOriginalData);
        if (!updates.length) {
            return;
        }
        try {
            await updateRescuerInfo(distructuredFormData.id, updates);
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
