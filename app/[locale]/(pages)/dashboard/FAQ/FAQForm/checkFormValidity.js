export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['question_ua', 'question_en', 'answer_ua', 'answer_en'];

    return requiredFields.every(field => {
        if (field === 'question_ua' || field === 'question_en') {
            return formData[field]?.trim().length >= 3;
        }
        if (field === 'answer_ua' || field === 'answer_en') {
            return formData[field]?.trim().length >= 35;
        }
        typeof formData[field] === 'string' && formData[field].trim() !== '';
    });
};