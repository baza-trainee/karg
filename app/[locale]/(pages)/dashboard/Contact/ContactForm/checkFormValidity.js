export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['question_ua', 'question_en', 'answer_ua', 'answer_en'];

    return requiredFields.every(field => formData[field].trim() !== '');
};