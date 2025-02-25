export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['year', 'description_ua', 'description_en', 'images'];

    return requiredFields.every(field => {
        if (field === 'images') {
            return formData[field].length > 0;
        }
        return formData[field].trim() !== '';
    });
};