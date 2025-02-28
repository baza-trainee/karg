export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['fullName', 'phoneNumber'];

    if(formData.phoneNumber && formData.phoneNumber.length < 11) return false;

    return requiredFields.every(field => formData[field].trim() !== '');
};