'use client'

import { useContext, useEffect, memo } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import variables from '../../../../variables.module.scss';
import styles from "./styles/faqList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import FAQItem from "./FAQItem";
import Pagination from '../../Pagination/Pagination';
import ModalContext from '@/app/ModalContext';
import FAQForm from '../FAQForm/FAQForm';
import Spinner from '@/components/Spinner/Spinner';
import { deleteFAQItemData } from '../utilsFetchFAQData';
import { FAQContext } from "../FAQContext";
import ConfirmationDialogTrigger from "../../ConfirmationDialogTrigger";
import { AdminContext } from '@/app/adminProvider';

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

function FAQList() {
    const {
        loadAllFaq,
        currentPage,
        setIsLoading,
        isLoading,
        faq,
        setFAQ,
        handlePageChange,
        totalPages
    } = useContext(FAQContext);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);
    const { isDirector } = useContext(AdminContext);

    const currentRole = (isDirector === 'true') ? true : false;

    useEffect(() => {
        if (!isLoading) {
            loadAllFaq();
        }
    }, [currentPage, loadAllFaq]);

    const handleDeleteFAQ = async (id) => {
        setIsLoading(true);
        await deleteFAQItemData(id, currentPage, faq, handlePageChange, setFAQ);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.faqTitle}>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Питання</p>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Відповідь</p>
            </div>
            {isLoading ? <Spinner /> : (
                <>
                    {faq && faq.map((faqItem) => {
                        return (
                            <FAQItem
                                key={faqItem.id}
                                faqLineStyle={styles.faqLine}
                                basicInfoStyle={styles.basicInfo}
                                faqQuestion={faqItem.question}
                                faqAnswer={faqItem.answer}
                                faqAnswerStyle={styles.anserInfo}
                                iconsContainerStyle={styles.iconsContainer}
                            >
                                <CreateIcon
                                    className={styles.create_icon}
                                    onClick={currentRole ? () => {
                                        showModal('generic', <FAQForm type='edit' faqData={faqItem} />)
                                    } : null}
                                />
                                <TrashIcon
                                    className={styles.trash_icon}
                                    onClick={currentRole ? () => {
                                        showModal('confirmation',
                                            <ConfirmationDialogTrigger
                                                confirmationTitle={confirmationTitle}
                                                message={message}
                                                cancelTitle={cancelTitle}
                                                confirmTitle={confirmTitle}
                                                leftButtonStyle={stylesBtn.confirmationCancelBtn}
                                                rightButtonStyle={stylesBtn.confirmationDeleteBtn}
                                                actionOnConfirm={handleDeleteFAQ}
                                                actionArgs={faqItem.id}
                                            />)
                                    } : null}
                                />
                            </FAQItem>
                        )
                    })}

                    {/* <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    /> */}
                </>
            )}
        </div>
    )
}

export default memo(FAQList);