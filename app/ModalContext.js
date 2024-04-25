'use client'

import { createContext, useCallback, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({
        generic: { isVisible: false, content: null },
        confirmation: { isVisible: false, content: null }
    })
    
    const showModal = useCallback((type, modalContent) => {
        const contentToSet = typeof modalContent === 'function' ? React.createElement(modalContent) : modalContent;
        console.log('contentToSet: ')
        setModals(prevModals => ({
            ...prevModals,
            [type]: { isVisible: true, content: contentToSet }
        }));
    }, []);

    const hideModal = useCallback((type) => {
        setModals(prevModals => ({
            ...prevModals,
            [type]: { isVisible: false, content: null }
        }));
    }, []);

    return (
        <ModalContext.Provider value={{ modals, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContext;
