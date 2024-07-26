'use client'

import { useContext, useEffect, memo } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import variables from '../../../../variables.module.scss';
import styles from "./styles/petList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import PetItem from "./PetItem";
import Pagination from '../../Pagination/Pagination';
import CategorySelector from "../CategorySelector/CategorySelector";
import ModalContext from '@/app/ModalContext';
import PetForm from '../PetForm/PetForm';
import Spinner from '@/components/Spinner/Spinner';
import { deletePet } from '../api/utilsFetchPetData';
import { PetContext } from "../PetContext";
import ConfirmationDialogTrigger from "../../ConfirmationDialogTrigger";
import ScrollToTop from '@/components/common/ScrollToTop/scrollToTop';

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

function PetList() {
    const {
        loadPets,
        currentPage,
        selectedCategory,
        setSelectedCategory,
        initialCategory,
        setIsLoading,
        isLoading,
        pets,
        setPets,
        handlePageChange,
        totalPages
    } = useContext(PetContext);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);
    const categories = [
        { label: 'Коти', value: 'Cat' },
        { label: 'Собаки', value: 'Dog' },
        { label: 'Інші тварини', value: 'Other' },
    ];

    useEffect(() => {
        if (!isLoading) {
            loadPets();
        }
    }, [currentPage, selectedCategory, loadPets]);

    const handleDeletePet = async (id) => {
        setIsLoading(true);
        await deletePet(id, currentPage, pets, handlePageChange, setPets);
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.petTitle}>
                <p className={`${styles.photoTitle} ${variables.font20w700}`}>Фото</p>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Імʼя</p>
                <p className={`${styles.basicInfo} ${variables.font20w700}`}>Категорія</p>
                <p className={`${styles.detailsInfo} ${variables.font20w700}`}>Опис</p>
                <p className={`${styles.detailsTitle} ${variables.font20w700}`}>Історія порятунку</p>
                <CategorySelector
                    categories={categories}
                    onSelectedCategory={(category) => {
                        const newCategory = category && category.value !== null ? category.value : initialCategory;
                        if (newCategory !== selectedCategory || currentPage !== 1) {
                            handlePageChange(1);
                            setSelectedCategory(newCategory);
                        }
                    }}
                />
            </div>
            {isLoading ? <Spinner /> : (
                <>
                    {pets.map((pet) => {
                        const photoUrls = pet.images.length ? [...pet.images] : [];
                        const photoAlt = 'Pet photo';
                        const categoryLabel = categories.find((category) => category.value === pet.category)?.label || 'Найновіші';
                        return (
                            <PetItem
                                key={pet.id}
                                petLineStyle={styles.petLine}
                                photoStyle={styles.photo}
                                photoSrc={photoUrls}
                                photoAlt={photoAlt}
                                photoContainerStyle={styles.photoContainer}
                                basicInfoStyle={styles.basicInfo}
                                petName={pet.name}
                                petCategory={categoryLabel}
                                petDetails={pet.description}
                                detailsStyle={styles.detailsInfo}
                                detailsBlockStyle={styles.detailsInfoBlock}
                                rescueStory={pet.story}
                                iconsContainerStyle={styles.iconsContainer}
                            >
                                <CreateIcon
                                    className={styles.create_icon}
                                    onClick={() => {
                                        showModal('generic', <PetForm type='edit' petData={pet} />)
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
                                                actionOnConfirm={handleDeletePet}
                                                actionArgs={pet.id}
                                            />)
                                    }}
                                />
                            </PetItem>
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

export default memo(PetList);