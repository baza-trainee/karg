'use client'

import { useContext, useEffect, memo } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import variables from '../../../../variables.module.scss';
import styles from "./styles/adviceList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import AdviceItem from "./AdviceItem";
import Pagination from '../../Pagination/Pagination';
import ModalContext from '@/app/ModalContext';
import AdviceForm from '../AdviceForm/AdviceForm';
import Spinner from '@/components/Spinner/Spinner';
import { deleteAdviceData } from '../utilsFetchAdviceData';
import { AdviceContext } from "../AdviceContext";
import ConfirmationDialogTrigger from "../../ConfirmationDialogTrigger";
import ScrollToTop from '@/components/common/ScrollToTop/scrollToTop';
import { AdminContext } from '@/app/adminProvider';

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

function AdviceList() {
    const {
        loadAdvices,
        currentPage,
        setIsLoading,
        isLoading,
        advices,
        setAdvices,
        handlePageChange,
        totalPages
    } = useContext(AdviceContext);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);
    const { isDirector } = useContext(AdminContext);

    const currentRole = (isDirector === 'true') ? true : false;

    useEffect(() => {
        if (!isLoading) {
            loadAdvices();
        }
    }, [currentPage, loadAdvices]);

    const handleDeleteAdvice = async (id) => {
        setIsLoading(true);
        await deleteAdviceData(id, currentPage, advices, handlePageChange, setAdvices);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.adviceTitle}>
                <p className={`${styles.photoTitle} ${variables.font20w700}`}>Фото</p>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Заголовок</p>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Текст статті</p>
            </div>
            {isLoading ? <Spinner /> : (
                <>
                    {advices && advices.map((advice) => {
                        const photoUrls = advice.images.length ? [...advice.images] : [];
                        const photoAlt = 'Advice photo';
                        return (
                            <AdviceItem
                                key={advice.id}
                                adviceLineStyle={styles.adviceLine}
                                photoStyle={styles.photo}
                                photoSrc={photoUrls}
                                photoAlt={photoAlt}
                                photoContainerStyle={styles.photoContainer}
                                basicInfoStyle={styles.basicInfo}
                                adviceTitle={advice.title}
                                adviceDetails={advice.description}
                                detailsStyle={styles.detailsInfo}
                                iconsContainerStyle={styles.iconsContainer}
                            >
                                <CreateIcon
                                    className={styles.create_icon}
                                    onClick={currentRole ? () => {
                                        showModal('generic', <AdviceForm type='edit' adviceData={advice} />)
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
                                                actionOnConfirm={handleDeleteAdvice}
                                                actionArgs={advice.id}
                                            />)
                                    } : null}
                                />
                            </AdviceItem>
                        )
                    })}
                    <ScrollToTop />
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

export default memo(AdviceList);