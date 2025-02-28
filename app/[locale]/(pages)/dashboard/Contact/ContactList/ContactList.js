'use client'

import { useContext, useEffect, memo } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import variables from '../../../../variables.module.scss';
import styles from "./styles/contactList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import ContactItem from "./ContactItem";
import Pagination from '../../Pagination/Pagination';
import ModalContext from '@/app/ModalContext';
import ContactForm from '../ContactForm/ContactForm';
import Spinner from '@/components/Spinner/Spinner';
import { deleteContactItemData } from '../utilsFetchContactData';
import { ContactContext } from "../ContactContext";
import ConfirmationDialogTrigger from "../../ConfirmationDialogTrigger";

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

function ContactList() {
    const {
        loadAllContacts,
        currentPage,
        setIsLoading,
        isLoading,
        contact,
        setContact,
        handlePageChange,
        totalPages
    } = useContext(ContactContext);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);

    useEffect(() => {
        if (!isLoading) {
            loadAllContacts();
        }
    }, [currentPage, loadAllContacts]);

    const handleDeleteContact = async (id) => {
        setIsLoading(true);
        await deleteContactItemData(id, currentPage, contact, handlePageChange, setContact);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.contactTitle}>
                <p className={styles.basicInfoTitle}>Питання</p>
                <p className={styles.answerInfoTitle}>Відповідь</p>
            </div>
            {isLoading ? <Spinner /> : (
                <>
                    {contact && contact.map((contactItem) => {
                        return (
                            <ContactItem
                                key={contactItem.id}
                                contactLineStyle={styles.contactLine}
                                basicInfoStyle={styles.basicInfo}
                                contactQuestion={contactItem.question}
                                contactAnswer={contactItem.answer}
                                contactAnswerStyle={styles.answerInfo}
                                iconsContainerStyle={styles.iconsContainer}
                            >
                                <CreateIcon
                                    className={styles.create_icon}
                                    onClick={() => {
                                        showModal('generic', <ContactForm type='edit' contactData={contactItem} />)
                                    }}
                                />
                                <TrashIcon
                                    className={styles.trash_icon}
                                    onClick={() => {
                                        showModal('confirmation',
                                            <ConfirmationDialogTrigger
                                                confirmationTitle={confirmationTitle}
                                                message={message}
                                                cancelTitle={cancelTitle}
                                                confirmTitle={confirmTitle}
                                                leftButtonStyle={stylesBtn.confirmationCancelBtn}
                                                rightButtonStyle={stylesBtn.confirmationDeleteBtn}
                                                actionOnConfirm={handleDeleteContact}
                                                actionArgs={contactItem.id}
                                            />)
                                    }}
                                />
                            </ContactItem>
                        )
                    })}

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    )
}

export default memo(ContactList);