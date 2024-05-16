import Button from "@/components/Button/button";
import styles from "./confirmationDialog.module.scss";
import variables from "../../../../variables.module.scss";

function ConfirmationDialog({ leftButtonStyle, rightButtonStyle, confirmationTitle, message, cancelTitle, confirmTitle, onConfirm, onCancel }) {

    return (
        <div className={styles.container}>
            <div className={styles.messageBlock}>
                <p className={`${styles.title} ${variables.font24w700}`}>{confirmationTitle}</p>
                <p className={`${styles.message} ${variables.font20w400}`}>{message}</p>
            </div>
            <div className={styles.buttonBlock}>
                <Button type="button" className={`${leftButtonStyle} ${variables.font20w700}`} onClick={onCancel}>{cancelTitle}</Button>
                <Button type="button" className={`${rightButtonStyle} ${variables.font20w700}`} onClick={onConfirm}>{confirmTitle}</Button>
            </div>
        </div>
    );
}

export default ConfirmationDialog;