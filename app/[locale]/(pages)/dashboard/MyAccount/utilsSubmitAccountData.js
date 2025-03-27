import { updateRescuerInfo } from "./api";
import SuccessDialog from "../SuccessDialog/SuccessDialog";

export const submitTeamMemberData = async (destructuredFormData, destructuredOriginalData, showModal, setHasUnsavedChanges, successDialogActions, accountId) => {
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
            const result = await updateRescuerInfo(destructuredFormData.id, updates);
            if (result.token && Number(destructuredFormData.id) === Number(accountId)) {
                localStorage.setItem('auth-token', result.token);
            }
            if (result.emailConflict) {
                showModal('confirmation',
                    <SuccessDialog
                        title={"Помилка"}
                        message={result.emailConflict}
                        buttonText={buttonText}
                    />)
                return;
            }
            if (result.error) {
                showModal('confirmation',
                    <SuccessDialog
                        title={"Помилка"}
                        message={result.error}
                        buttonText={buttonText}
                    />);
                return;
            }
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
