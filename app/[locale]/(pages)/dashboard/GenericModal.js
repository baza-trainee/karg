import { useContext } from 'react';
import Portal from './Portal';
import ModalContext from '@/app/ModalContext';
import { useUnsavedChanges } from '@/app/UnsavedChangesContext';
import styles from "./genericModal.module.scss"

const GenericModal = () => {
    const { modals, hideModal } = useContext(ModalContext);
    const { content, isVisible } = modals.generic;
    const { hasUnsavedChanges } = useUnsavedChanges();
    if (!isVisible) return null;

    const handleOverlayClick = () => {
        if (!hasUnsavedChanges) hideModal('generic');
    }

    const handleContentClick = e => { 
        e.stopPropagation();

    }

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