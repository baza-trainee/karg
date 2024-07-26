import { getAnimalById, deleteAnimal, getAllAnimals } from "./api";

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
            const updatedFormData = {
                id: uaData.id,
                name_ua: uaData.name || '',
                category: uaData.category || '',
                description_ua: uaData.description || '',
                story_ua: uaData.story || '',
                images: uaData.images || '',
                name_en: enData.name || '',
                description_en: enData.description || '',
                story_en: enData.story || '',
            };
            return updatedFormData;
        } catch (error) {
            console.error('Error fetching animal data:', error.message);
        }
    } else {
        console.log(initializeFormData({}));
        return initializeFormData({});
    }
}

export const deletePet = async (id, currentPage, pets, handlePageChange, setPets) => {
    try {
        await deleteAnimal(id);
        setPets(prevPets => prevPets.filter((pet) => pet.id !== id));
    } catch (error) {
        console.error('Error deleting the animal:', error.message);
    } finally {
        const newPage = currentPage > 1 && pets.length === 1 ? currentPage - 1 : currentPage;
        handlePageChange(newPage);
    }
}

export const fetchPets = async (currentPage, selectedCategory, initialCategory, currentLanguage = 'ua', setPets, setTotalPages) => {
    const categoryQuery = selectedCategory === initialCategory ? '' : `&CategoryFilter=${selectedCategory}`;
    try {
        const data = await getAllAnimals(currentPage, categoryQuery, currentLanguage);
        setPets(data.animals);
        setTotalPages(data.totalPages);
    } catch (error) {
        console.error('Error fetching pets:', error.message);
        setPets([]);
    }
};

