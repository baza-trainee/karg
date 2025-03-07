'use client'

import { useContext, useEffect, memo } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import variables from '../../../../variables.module.scss';
import styles from "./styles/statsList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import StatsItem from "./StatsItem";
import Pagination from '../../Pagination/Pagination';
import ModalContext from '@/app/ModalContext';
import StatsForm from '../StatsForm/StatsForm';
import Spinner from '@/components/Spinner/Spinner';
import { deleteStatData } from '../utilsFetchStatsData';
import { StatsContext } from "../StatsContext";
import ConfirmationDialogTrigger from "../../ConfirmationDialogTrigger";

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

function StatsList() {
    const {
        loadStats,
        currentPage,
        setIsLoading,
        isLoading,
        stats,
        setStats,
        handlePageChange,
        totalPages
    } = useContext(StatsContext);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);

    useEffect(() => {
        if (!isLoading) {
            loadStats();
        }
    }, [currentPage, loadStats]);

    const handleDeleteStat = async (id) => {
        setIsLoading(true);
        await deleteStatData(id, currentPage, stats, handlePageChange, setStats);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.statTitle}>
                <p className={`${styles.photoTitle} ${variables.font20w700}`}>Фото</p>
                <p className={`${styles.basicInfoTitle} ${variables.font20w700}`}>Заголовок</p>
                <p className={`${styles.detailsTitle} ${variables.font20w700}`}>Текст статті</p>
            </div>
            {isLoading ? <Spinner /> : (
                <>
                    {stats && stats.map((stat) => {
                        const photoUrls = stat.images.length ? [...stat.images] : [];
                        const photoAlt = 'stat photo';
                        return (
                            <StatsItem
                                key={stat.id}
                                statLineStyle={styles.statLine}
                                photoStyle={styles.photo}
                                photoSrc={photoUrls}
                                photoAlt={photoAlt}
                                photoContainerStyle={styles.photoContainer}
                                basicInfoStyle={styles.basicInfo}
                                statTitle={stat.title}
                                statDetails={stat.description}
                                detailsStyle={styles.detailsInfo}
                                iconsContainerStyle={styles.iconsContainer}
                            >
                                <CreateIcon
                                    className={styles.create_icon}
                                    onClick={() => {
                                        showModal('generic', <StatsForm type='edit' statData={stat} />)
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
                                                actionOnConfirm={handleDeleteStat}
                                                actionArgs={stat.id}
                                            />)
                                    }}
                                />
                            </StatsItem>
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

export default memo(StatsList);