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
    cancelText: 'Скасувати',
    confirmText: 'Видалити'
};

const handleConfirmDelete = (pet) => {
    console.log(`request for deleting id: ` + pet.id);
}

export default function PetList() {
    const initialCategory = 'Найновіші';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(1);
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { confirmationTitle, message, cancelText, confirmText } = deleteDialogActions;
    const { showModal } = useContext(ModalContext);
    const categories = [
        { label: 'Коти', value: 'Cat' },
        { label: 'Собаки', value: 'Dog' },
        { label: 'Інші тварини', value: 'Other' },
    ];

    async function fetchPets() {
        setIsLoading(true);
        const categoryQuery = selectedCategory === initialCategory ? '' : `&CategoryFilter=${selectedCategory}`;
        const url = `http://karg.us-east-1.elasticbeanstalk.com/karg/animal/getall?page=${currentPage}&pageSize=10${categoryQuery}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setPets(data.pets);
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

    // async function deletePets(id) {
    //     setIsLoading(true);

    // }

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
                    onSelectedCategory={(category) => setSelectedCategory(category ? category.value : null)}
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
                                    onClick={() => showModal('generic', <PetForm type='edit' petData={pet} />)}
                                />
                                <TrashIcon
                                    className={styles.trash_icon}
                                    onClick={() => showModal('confirmation',
                                        <ConfirmationDialog
                                            confirmationTitle={confirmationTitle}
                                            message={message}
                                            cancelText={cancelText}
                                            confirmText={confirmText}
                                            onConfirm={() => handleConfirmDelete(pet)}
                                            onCancel={() => console.log('cancellation delete')}
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

// async function onPageChange(currentPage) {
//     setIsloading(true);
//     try {
//         let response = await fetch(`http://karg.us-east-1.elasticbeanstalk.com/karg/animal/getall?Page=${currentPage}&PageSize=${pageSize}`);
//         if (response.ok) {
//             let data = await response.json();
//             setPets(data.animals);
//             setTotalPages(data.totalPages);
//         } else {
//             console.error('Failed to fetch animals:', response.status);
//             setPets([]);
//         }
//     } catch (error) {
//         console.error('Server error or network issue:', error);
//     } finally {
//         setIsloading(false);
//     }
// }

// async function onCategoryChange() {
//     if (selectedCategory === null) {
//         getAllPets();
//     } else {
//         setIsloading(true);
//         try {
//             let response = await fetch(`http://karg.us-east-1.elasticbeanstalk.com/karg/animal/getall?Page=1&PageSize=10&CategoryFilter=${selectedCategory}`);
//             if (response.ok) {
//                 let data = await response.json();
//                 setPets(data.animals);
//             } else if (response.status === 404) {
//                 console.log('Animals not found in this category');
//                 setPets([]);
//             } else {
//                 console.error('Failed to fetch animals:', response.status);
//                 setPets([]);
//             }
//         } catch (error) {
//             console.error('Server error or network issue:', error);
//         } finally {
//             setIsloading(false);
//         }
//     }
// }

// async function getAllPets() {
//     setIsloading(true);
//     try {
//         let response = await fetch(`http://karg.us-east-1.elasticbeanstalk.com/karg/animal/getall?Page=1&PageSize=${pageSize}`);
//         if (response.ok) {
//             let data = await response.json();
//             setPets(data.animals);
//         } else {
//             console.error('Failed to fetch animals:', response.status);
//             setPets([]);
//         }
//     } catch (error) {
//         console.error('Server error or network issue:', error);
//     } finally {
//         setIsloading(false);
//     }
// }

// useEffect(() => {
//     onPageChange(currentPage)
// }, [currentPage]);

// useEffect(() => {
//     if (selectedCategory === 'Найновіші') {
//         getAllPets();
//     } else {
//         onCategoryChange(selectedCategory)
//     }
// }, [selectedCategory]);

