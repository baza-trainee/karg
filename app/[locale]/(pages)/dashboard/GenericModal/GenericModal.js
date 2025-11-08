import { useContext, useEffect, useRef } from 'react';
import Portal from "../Portal";
import ModalContext from '@/app/ModalContext';
import { useUnsavedChanges } from '@/app/UnsavedChangesContext';
import styles from "./genericModal.module.scss";

const GenericModal = () => {
    const { modals, hideModal } = useContext(ModalContext);
    const { content, isVisible } = modals.generic;
    const { hasUnsavedChanges } = useUnsavedChanges();

    const confirmationVisible = modals.confirmation?.isVisible;
    const prevConfirmationRef = useRef(confirmationVisible);

    useEffect(() => {
        if (prevConfirmationRef.current && !confirmationVisible && !hasUnsavedChanges) {
            hideModal('generic');
        }
        prevConfirmationRef.current = confirmationVisible;
    }, [confirmationVisible, hasUnsavedChanges, hideModal]);

    const handleOverlayClick = () => {
        if (!hasUnsavedChanges && !confirmationVisible) {
            hideModal('generic');
        }
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    if (!isVisible) return null;

    return (
        <Portal>
            <div className={styles.genericModalOverlay} onClick={handleOverlayClick}>
                <div className={styles.genericModalContent} onClick={handleContentClick}>
                    {content}
                </div>
            </div>
        </Portal>
    );
};

export default GenericModal;
