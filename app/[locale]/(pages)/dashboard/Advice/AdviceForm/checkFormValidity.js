export const checkFormValidity = (formData) => {
    if (!formData) return false;
    //const requiredFields = ['name_ua', 'name_en', 'category', 'description_ua', 'description_en', 'story_ua', 'story_en'];
    const requiredFields = ['title_ua', 'title_en', 'description_ua', 'description_en'];

    return requiredFields.every(field => formData[field].trim() !== '');
};