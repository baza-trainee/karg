import { useEffect, useContext } from 'react';
import { PartnerContext } from "../PartnerContext";
import Spinner from "@/components/Spinner/Spinner";
import PartnerItem from "./PartnerItem";
import PartnerForm from '../PartnerForm/PartnerForm';
import styles from "./styles/partnerList.module.scss";
import stylesBtn from "@/components/Button/styles/button.module.scss";
import { CreateIcon, TrashIcon } from '@/public/assets/icons';
import ModalContext from '@/app/ModalContext';
import ConfirmationDialogTrigger from "../../ConfirmationDialogTrigger";
import { deletePartner } from "../api/utilsFetchPartnerData";
import Pagination from '../../Pagination/Pagination';

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

export default function PartnerList() {
    const {
        loadPartners,
        isLoading,
        setIsLoading,
        partners,
        setPartners,
        currentPage,
        handlePageChange,
        totalPages
    } = useContext(PartnerContext);

    const { showModal } = useContext(ModalContext);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;

    useEffect(() => {
        if (!isLoading) {
            loadPartners();
        }
    }, [currentPage, loadPartners]);

    const handleDeletePartner = async (id) => {
        setIsLoading(true);
        await deletePartner(id, currentPage, partners, handlePageChange, setPartners, showModal);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.partnerTitle}>
                <p className={styles.photoTitle}>Фото</p>
                <p className={styles.nameTitle}>Назва</p>
                <p className={styles.uriTitle}>Посилання</p>
            </div>
            {
                isLoading ? < Spinner /> : (
                    <>
                        {partners.map((partner) => {
                            const photoUrls = partner.images.length ? [...partner.images] : [];
                            const photoAlt = "Partner's logo";
                            return (
                                <PartnerItem
                                    key={partner.id}
                                    partnerLineStyle={styles.partnerLine}
                                    photoStyle={styles.photo}
                                    photoSrc={photoUrls}
                                    photoAlt={photoAlt}
                                    photoContainerStyle={styles.photoContainer}
                                    partnerNameStyle={styles.partnerName}
                                    partnerName={partner.name}
                                    partnerUri={partner.uri}
                                    partnerUriStyle={styles.partnerUri}
                                    iconsContainerStyle={styles.iconsContainer}
                                >
                                    <CreateIcon
                                        className={styles.create_icon}
                                        onClick={() => {
                                            showModal('generic', <PartnerForm type='edit' partnerData={partner} />)
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
                                                    actionOnConfirm={handleDeletePartner}
                                                    actionArgs={partner.id}
                                                />)
                                        }}
                                    />
                                </PartnerItem>
                            );
                        })}
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </>
                )
            }
        </div>
    );
}