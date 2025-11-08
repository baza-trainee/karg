export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['title_ua', 'title_en', 'description_ua', 'description_en', 'images'];

    return requiredFields.every(field => {
        if (field === 'images') {
            return Array.isArray(formData[field]) && formData[field].length > 0;
        }
        if (field === 'title_ua' || field === 'title_en') {
            return formData[field]?.trim().length >= 3;
        }
        if (field === 'description_ua' || field === 'description_en') {
            return formData[field]?.trim().length >= 35;
        }
        return typeof formData[field] === 'string' && formData[field].trim() !== '';
    });
};