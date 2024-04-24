import React from 'react';
import Portal from './Portal';
import styles from "./confirmationModal.module.scss";

const ConfirmationModal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <Portal>
            <div className={styles.confirmationModalOverlay} onClick={onClose}>
                <div className={styles.confirmationModalContent} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default ConfirmationModal;