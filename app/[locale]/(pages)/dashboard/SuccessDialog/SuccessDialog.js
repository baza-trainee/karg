'use client'
import React, { useContext, useEffect, useRef, useCallback } from 'react';
import styles from "./styles/successDialog.module.scss";
import stylesBtn from '@/components/Button/styles/button.module.scss';
import Button from "@/components/Button/button";
import variables from "../../../variables.module.scss";
import ModalContext from '@/app/ModalContext';
import { useUnsavedChanges } from '@/app/UnsavedChangesContext';

function SuccessDialog({ title, message, buttonText, onRedirect = () => { } }) {
    const { hideModal } = useContext(ModalContext);
    const { hasUnsavedChanges } = useUnsavedChanges();
    const containerRef = useRef(null);

    const handleClose = useCallback((e) => {
        if (e) {
            e.stopPropagation();
        }
        hideModal('confirmation');
        if (!hasUnsavedChanges) {
            hideModal('generic');
        }
        if (typeof onRedirect === 'function') {
            onRedirect();
        }
    }, [hasUnsavedChanges, hideModal, onRedirect]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleClose(e);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const globalKeyDownHandler = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                handleClose(e);
            }
        };

        document.addEventListener('keydown', globalKeyDownHandler);
        return () => {
            document.removeEventListener('keydown', globalKeyDownHandler);
        };
    }, [handleClose]);

    return (
        <div
            className={styles.container}
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <div className={styles.messageBlock}>
                <p className={`${styles.title} ${variables.font24w700}`}>{title}</p>
                <p className={`${styles.message} ${variables.font20w400}`}>{message}</p>
            </div>
            <Button
                type="button"
                className={`${stylesBtn.congratsCloseBtn} ${variables.font20w700}`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClose(e);
                }}
            >
                {buttonText}
            </Button>
        </div>
    );
}

export default SuccessDialog;
