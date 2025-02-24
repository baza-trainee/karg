export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['year', 'description_ua', 'description_en'];

    return requiredFields.every(field => formData[field].trim() !== '');
};