export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['name_ua', 'name_en', 'category', 'description_ua', 'description_en', 'story_ua', 'story_en', 'images'];
    
    return requiredFields.every(field => {
        if (field === 'images') {
            return formData[field].length > 0;
        }
        return formData[field].trim() !== '';
    });
};