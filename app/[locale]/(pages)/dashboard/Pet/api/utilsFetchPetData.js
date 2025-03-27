import { getAnimalById, deleteAnimal, getAllAnimals } from "./api";
import SuccessDialog from "../../SuccessDialog/SuccessDialog";

export const initializeFormData = (data) => {
    return {
        id: data.id || '',
        name_ua: data.name_ua || data.name || '',
        category: data.category || '',
        description_ua: data.description_ua || data.description || '',
        story_ua: data.story_ua || data.story || '',
        images: data.images || [],
        name_en: data.name_en || '',
        description_en: data.description_en || '',
        story_en: data.story_en || ''
    }
}

export const fetchPetData = async (petId, type) => {
    if (type === 'edit' && petId) {
        try {
            const uaData = await getAnimalById(petId, 'ua');
            const enData = await getAnimalById(petId, 'en');
            if (uaData.error || enData.error) {
                const errorMessage = uaData.error || enData.error;
                console.error('Error fetching advice data:', errorMessage);
                return { error: errorMessage };
            }
            const updatedFormData = {
                id: uaData.id,
                name_ua: uaData.name || '',
                category: uaData.category || '',
                description_ua: uaData.description || '',
                story_ua: uaData.story || '',
                images: uaData.images || [],
                name_en: enData.name || '',
                description_en: enData.description || '',
                story_en: enData.story || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching animal data:', error.message);
            return { error: "Failed to fetch" };
        }
    } else {
        return initializeFormData({});
    }
}

export const deletePet = async (id, currentPage, pets, handlePageChange, setPets, showModal) => {
    try {
        const result = await deleteAnimal(id);
        if (result.success) {
            setPets(prevPets => prevPets.filter((pet) => pet.id !== id));
            const newPage = currentPage > 1 && pets.length === 1 ? currentPage - 1 : currentPage;
            handlePageChange(newPage);
        } else {
            console.error(`Видалення не виконано. Сервер повернув: ${result.error}`);
            showModal('confirmation',
                <SuccessDialog
                    title={"Помилка"}
                    message={result.error || "Не вдалося видалити запис."}
                    buttonText={"Закрити"}
                />);
        }
    } catch (error) {
        console.error(`Error deleting ID ${id} :`, error);
        return { error: "Failed to delete" };
    }
}

export const fetchPets = async (currentPage, selectedCategory, initialCategory, currentLanguage = 'ua', setPets, setTotalPages, showModal) => {
    const categoryQuery = selectedCategory === initialCategory ? '' : `&CategoryFilter=${selectedCategory}`;
    try {
        const data = await getAllAnimals(currentPage, categoryQuery, currentLanguage);
        if (data?.error) {
            const errorMessage = data.error === 'not_found'
                ? 'Записи не знайдено, або було видалено.'
                : data.error;
            console.error('Помилка при отриманні даних:', data.error);
            if (showModal) {
                showModal(
                    'confirmation',
                    <SuccessDialog
                        title="Помилка"
                        message={errorMessage}
                        buttonText="Закрити"
                    />
                );
            }
            setPets([]);
            setTotalPages(1);
            return;
        }
        setPets(data.items);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching pets:', error.message);
        setPets([]);
        return { error: "Failed to fetch pets list" };
    }
};

