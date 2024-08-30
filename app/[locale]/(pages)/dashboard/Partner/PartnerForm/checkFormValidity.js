export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['name', 'uri', 'images'];
    return requiredFields.every(field => {
        const value = formData[field];
        if (typeof value === 'string') {
            return value.trim() !== '';
        }
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        return false;
    });
};