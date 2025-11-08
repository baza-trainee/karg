'use client'

import React, { createContext, useCallback, useState, useEffect } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({
        generic: { isVisible: false, content: null },
        confirmation: { isVisible: false, content: null }
    })

    const showModal = useCallback((type, modalContent) => {
        const contentToSet = typeof modalContent === 'function' ? React.createElement(modalContent) : modalContent;
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

    useEffect(() => {
        const anyModalVisible = Object.values(modals).some(modal => modal.isVisible);
        if (anyModalVisible) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modals]);

    return (
        <ModalContext.Provider value={{ modals, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContext;
