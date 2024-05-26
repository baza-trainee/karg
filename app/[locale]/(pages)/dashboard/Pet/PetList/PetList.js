'use client'

import { useState, useContext, useEffect } from 'react';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import variables from '../../../../variables.module.scss';
import styles from "./styles/petList.module.scss";
import stylesBtn from "../../../../../../components/Button/styles/button.module.scss";
import PetItem from "./PetItem";
import Pagination from '../../Pagination/Pagination';
import CategorySelector from "../CategorySelector/CategorySelector";
import ModalContext from '@/app/ModalContext';
import PetForm from '../PetForm/PetForm';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import Spinner from '@/components/Spinner/Spinner';

const deleteDialogActions = {
    confirmationTitle: 'Ви впевнені, що хочете видалити цей елемент?',
    message: "Цю дію буде неможливо скасувати, і всі пов'язані дані також будуть видалені",
    cancelTitle: 'Скасувати',
    confirmTitle: 'Видалити'
};

export default function PetList() {
    const initialCategory = 'Найновіші';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { confirmationTitle, message, cancelTitle, confirmTitle } = deleteDialogActions;
    const { hideModal, showModal } = useContext(ModalContext);
    const categories = [
        { label: 'Коти', value: 'Cat' },
        { label: 'Собаки', value: 'Dog' },
        { label: 'Інші тварини', value: 'Other' },
    ];

    async function fetchPets(currentLanguage = 'ua', page = currentPage) {
        setIsLoading(true);
        const categoryQuery = selectedCategory === initialCategory ? '' : `&CategoryFilter=${selectedCategory}`;
        const url = `https://karg-backend.onrender.com/karg/animal/getall?Page=${page}&PageSize=10${categoryQuery}&cultureCode=${currentLanguage}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setPets(data.animals);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching pets:', error.message);
            setPets([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPets();
    }, [currentPage, selectedCategory]);

    async function deletePets(id) {
        setIsLoading(true);
        hideModal('confirmation');
        try {
            const response = await fetch(`https://karg-backend.onrender.com/karg/animal/delete?id=${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error('Failed to fetch');
        } catch (error) {
            console.error('Error delete the animal:', error.message);
        } finally {
            setIsLoading(false);
            const newPage = currentPage > 1 && pets.length === 1 ? currentPage - 1 : currentPage;
            setCurrentPage(newPage);
        }
    }

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
                    selectedCategory={selectedCategory}
                    onSelectedCategory={(category) => {
                        setCurrentPage(1);
                        setSelectedCategory(category ? category.value : initialCategory)
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
                                    onClick={() => showModal('generic', <PetForm type='edit' petData={pet} refreshPets={fetchPets} />)}
                                />
                                <TrashIcon
                                    className={styles.trash_icon}
                                    onClick={() => showModal('confirmation',
                                        <ConfirmationDialog
                                            confirmationTitle={confirmationTitle}
                                            message={message}
                                            cancelTitle={cancelTitle}
                                            confirmTitle={confirmTitle}
                                            onConfirm={() => deletePets(pet.id)}
                                            onCancel={() => {
                                                hideModal('confirmation');
                                            }}
                                            leftButtonStyle={stylesBtn.confirmationCancelBtn}
                                            rightButtonStyle={stylesBtn.confirmationDeleteBtn}
                                        />)}
                                />
                            </PetItem>
                        )
                    })}
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </>
            )}
        </div>
    )
}