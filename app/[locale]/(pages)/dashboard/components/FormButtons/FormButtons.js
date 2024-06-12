import Button from '@/components/Button/button';
import stylesBtn from '@/components/Button/styles/button.module.scss';
import styles from "./styles/formButtons.module.scss";
import { useContext } from "react";
import ModalContext from "@/app/ModalContext";
import ConfirmationDialogTrigger from '../../ConfirmationDialogTrigger';

function FormButtons({
    confirmationTitle,
    message,
    cancelTitle,
    confirmTitle,
    handleSubmit,
    actionOnConfirm,
    rejectButtonStyle,
    submitButtonStyle,
    rejectButtonTitle,
    submitButtonTitle,
    isFormValid = true }) {
    const { showModal } = useContext(ModalContext);

    return (
        <div className={styles.buttonGroup}>
            <Button
                type="button"
                className={rejectButtonStyle}
                onClick={() => {
                    showModal('confirmation',
                        <ConfirmationDialogTrigger
                            confirmationTitle={confirmationTitle}
                            message={message}
                            cancelTitle={cancelTitle}
                            confirmTitle={confirmTitle}
                            leftButtonStyle={stylesBtn.confirmationCancelBtn}
                            rightButtonStyle={stylesBtn.confirmationRevertBtn}
                            actionOnConfirm={actionOnConfirm}
                        />)
                }}
            >
                {rejectButtonTitle}
            </Button>
            <Button
                type="submit"
                className={submitButtonStyle}
                disabled={!isFormValid}
                onClick={handleSubmit}
            >
                {submitButtonTitle}
            </Button>
        </div>
    );
}
export default FormButtons;