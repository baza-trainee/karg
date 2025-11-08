import ModalContext from '@/app/ModalContext';
import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog";
import { useContext } from 'react';

function ConfirmationDialogTrigger({ confirmationTitle, message, cancelTitle, confirmTitle, leftButtonStyle, rightButtonStyle, actionOnConfirm, actionArgs = null }) {
    const { hideModal } = useContext(ModalContext);

    const handleConfirm = () => {
        if (actionArgs) {
            actionOnConfirm(actionArgs);
        } else {
            actionOnConfirm();
        }
        hideModal('confirmation');
        hideModal('generic');
    };

    const handleCancel = () => {
        hideModal('confirmation');
    }

    return (
        <ConfirmationDialog
            confirmationTitle={confirmationTitle}
            message={message}
            cancelTitle={cancelTitle}
            confirmTitle={confirmTitle}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            leftButtonStyle={leftButtonStyle}
            rightButtonStyle={rightButtonStyle}
        />
    );
}

export default ConfirmationDialogTrigger;
