import styles from "./styles/successDialog.module.scss";
import Button from "@/components/Button/button";
import variables from "../../../../variables.module.scss";

function SuccessDialog({ title, message, buttonText, buttonStyle, onCancel }) {
    return (
        <div className={styles.container}>
            <div className={styles.messageBlock}>
                <p className={`${styles.title} ${variables.font24w700}`}>{title}</p>
                <p className={`${styles.message} ${variables.font20w400}`}>{message}</p>
            </div>
            <Button type="button" className={`${buttonStyle} ${variables.font20w700}`} onClick={onCancel}>
                {buttonText}
            </Button >
        </div>
    );
}
export default SuccessDialog;