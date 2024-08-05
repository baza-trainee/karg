export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['name', 'uri', 'image'];

    return requiredFields.every(field => formData[field].trim() !== '');
};