import styles from "./styles/successDialog.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import Button from "@/components/Button/button";
import variables from "../../../variables.module.scss";
import { useContext } from 'react';
import ModalContext from '@/app/ModalContext';

function SuccessDialog({ title, message, buttonText }) {
    const { hideModal } = useContext(ModalContext);
    const handleClick = () => {
        hideModal('confirmation');
        hideModal('generic');
    }
    return (
        <div className={styles.container}>
            <div className={styles.messageBlock}>
                <p className={`${styles.title} ${variables.font24w700}`}>{title}</p>
                <p className={`${styles.message} ${variables.font20w400}`}>{message}</p>
            </div>
            <Button type="button" className={`${stylesBtn.congratsCloseBtn} ${variables.font20w700}`} onClick={handleClick}>
                {buttonText}
            </Button >
        </div>
    );
}
export default SuccessDialog;