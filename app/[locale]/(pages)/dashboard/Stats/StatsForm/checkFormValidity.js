export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['title_ua', 'title_en', 'description_ua', 'description_en', 'images'];

    return requiredFields.every(field => {
        if (field === 'images') {
            return formData[field].length > 0;
        }
        return typeof formData[field] === 'string' && formData[field].trim() !== '';
    });
};