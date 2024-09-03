'use client'

import { useContext, useEffect, memo } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import variables from '../../../../variables.module.scss';
import styles from "./styles/teamtList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import RescuerItem from "./RescuerItem";
import ModalContext from '@/app/ModalContext';
import RescuerForm from '../TeamForm/RescuerForm';
import Spinner from '@/components/Spinner/Spinner';
import { deleteTeamUserData } from '../utilsFetchTeamData';
import { TeamContext } from "../TeamContext";
import { AdminContext } from '@/app/adminProvider';
import ConfirmationDialogTrigger from "../../ConfirmationDialogTrigger";


const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

function TeamList() {
    const {
        loadRescuers,
        setIsLoading,
        isLoading,
        rescuers,
        setRescuers,
    } = useContext(TeamContext);
    const { isDirector } = useContext(AdminContext);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);

    const currentRole = (isDirector === 'true') ? true : false;
    console.log(currentRole);

    useEffect(() => {
        if (!isLoading) {
            loadRescuers();
        }
    }, [loadRescuers, loadRescuers]);

    const handleDeleteRescuer = async (id) => {
        setIsLoading(true);
        await deleteTeamUserData(id, setRescuers);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.teamTitle}>
                <p className={`${styles.photoTitle} ${variables.font20w700}`}>Фото</p>
                <p className={`${styles.fullname} ${variables.font20w700}`}>Імʼя та прізвище</p>
                <p className={`${styles.phoneTitle} ${variables.font20w700}`}>Телефон</p>
            </div>
            {isLoading ? <Spinner /> : (
                <>
                    {rescuers && rescuers.map((rescuer) => {
                        const photoUrls = rescuer.images.length ? [...rescuer.images] : [];
                        const photoAlt = 'Rescuer photo';
                        return (
                            <RescuerItem
                                key={rescuer.id}
                                rescuerLineStyle={styles.teamLine}
                                photoStyle={styles.photo}
                                photoSrc={photoUrls}
                                photoAlt={photoAlt}
                                photoContainerStyle={styles.photoContainer}
                                rescuerFullname={rescuer.fullName}
                                rescuerPhone={rescuer.phoneNumber}
                                phoneStyle={styles.phone}
                                fullnameStyle={styles.fullname}
                                iconsContainerStyle={styles.iconsContainer}
                            >
                                <CreateIcon
                                    className={styles.create_icon}
                                    onClick={currentRole ? () => {
                                        showModal('generic', <RescuerForm type='edit' rescuerData={rescuer} />)
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
                                                actionOnConfirm={handleDeleteRescuer}
                                                actionArgs={rescuer.id}
                                            />)
                                    } : null}
                                />
                            </RescuerItem>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default memo(TeamList);