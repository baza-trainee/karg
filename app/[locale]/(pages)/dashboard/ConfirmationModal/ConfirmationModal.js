import Portal from '../Portal';
import styles from "./confirmationModal.module.scss";
import ModalContext from '@/app/ModalContext';
import { useContext } from 'react';

const ConfirmationModal = () => {
    const { modals, hideModal } = useContext(ModalContext);
    const { content, isVisible } = modals.confirmation;
    if (!isVisible) return null;

    return (
        <Portal>
            <div className={styles.confirmationModalOverlay} onClick={() => hideModal('confirmation')}>
                <div className={styles.confirmationModalContent} onClick={e => e.stopPropagation()}>
                    {content}
                </div>
            </div>
        </Portal>
    );
};

export default ConfirmationModal;