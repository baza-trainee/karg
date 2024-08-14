import { useRouter } from "next/navigation";
import Button from '@/components/Button/button';
import stylesBtn from '@/components/Button/styles/button.module.scss';
import styles from "./styles/formButtons.module.scss";
import { useContext } from "react";
import ModalContext from "@/app/ModalContext";
import ConfirmationDialogTrigger from '../../ConfirmationDialogTrigger';

function FormButtons({
    customButtonGroup,
    confirmationTitle,
    message,
    cancelTitle,
    confirmTitle,
    handleSubmit,
    actionOnConfirm,
    rejectButtonStyle,
    customVariables,
    submitButtonStyle,
    rejectButtonTitle,
    submitButtonTitle,
    changePasswordButtonTitle,
    restoreButtonStyle,
    isFormValid = true }) {
    const { showModal } = useContext(ModalContext);

    const router = useRouter();

    return (
        <div className={`${styles.buttonGroup} ${customButtonGroup}`}>
            <Button
                type="button"
                className={`${rejectButtonStyle} ${customVariables}`}
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
            {changePasswordButtonTitle &&
                <Button
                    className={restoreButtonStyle}
                    disabled={!isFormValid}
                    onClick={() => router.push("/auth/restore")}
                >
                    {changePasswordButtonTitle}
                </Button>}
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