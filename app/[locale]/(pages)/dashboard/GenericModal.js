import { useContext } from 'react';
import Portal from './Portal';
import ModalContext from '@/app/ModalContext';
import styles from "./genericModal.module.scss"

const GenericModal = () => {
    const { modals, hideModal } = useContext(ModalContext);
    const { content, isVisible } = modals.generic;
    if (!isVisible) return null;

    return (
        <Portal>
            <div className={styles.genericModalOverlay} onClick={() => hideModal('generic')}>
                <div className={styles.genericModalContent} onClick={e => e.stopPropagation()}>
                    {content}
                </div>
            </div>
        </Portal>
    );
};

export default GenericModal;