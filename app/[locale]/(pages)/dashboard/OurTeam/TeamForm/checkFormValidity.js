export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['fullName', 'phoneNumber'];

    return requiredFields.every(field => formData[field].trim() !== '');
};