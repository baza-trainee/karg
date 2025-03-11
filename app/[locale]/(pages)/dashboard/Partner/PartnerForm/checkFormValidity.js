export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['name', 'uri', 'images'];

    const isValidUri = (uri) => {
        try {
            new URL(uri);
            return true;
        } catch (error) {
            return false;
        }
    }

    return requiredFields.every(field => {
        const value = formData[field];
        if (typeof value === 'string') {
            if (field === 'uri') {
                return value.trim() !== '' && isValidUri(value.trim());
            }
            return value.trim() !== '';
        }
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        return false;
    });
};