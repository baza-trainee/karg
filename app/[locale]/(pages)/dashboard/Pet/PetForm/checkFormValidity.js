export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['name_ua', 'name_en', 'category', 'description_ua', 'description_en', 'story_ua', 'story_en', 'images'];

    return requiredFields.every(field => {
        if (field === 'images') {
            return Array.isArray(formData[field]) && formData[field].length > 0;
        }
        if (field === 'name_ua' || field === 'name_en') {
            return formData[field]?.trim().length >= 3;
        }
        if (field === 'description_ua' || field === 'description_en' || field === 'story_ua' || field === 'story_en') {
            return formData[field]?.trim().length >= 35;
        }
        return typeof formData[field] === 'string' && formData[field].trim() !== '';
    });
};