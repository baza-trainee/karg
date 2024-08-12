export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['fullName_lastName', 'fullName_name', 'phoneNumber', 'email'];

    return requiredFields.every(field => formData[field].trim() !== '');
};