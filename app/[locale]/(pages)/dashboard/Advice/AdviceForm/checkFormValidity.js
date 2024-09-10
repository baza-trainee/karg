export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['title_ua', 'title_en', 'description_ua', 'description_en'];

    return requiredFields.every(field => formData[field].trim() !== '');
};