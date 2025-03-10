const validateEmail = (value) => {
    const re = /^(?![_.-])[a-zA-Z0-9]+([.-](?![.-])[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+)*?@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/;
    return typeof value === "string" && value.trim() !== "" && re.test(value.toLowerCase());
};

export function validateAndFormatPhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== "string") {
        return 'Некоректний номер';
    }
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length > 12) {
        return "Невірна довжина номера";
    }
    if (cleanedNumber.length === 12 && !cleanedNumber.startsWith("0") && !cleanedNumber.startsWith("38")) {
        return 'Некоректний формат номера';
    }
    if (cleanedNumber.length === 10 && cleanedNumber.startsWith("0")) {
        return `+38 (${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6, 8)}${cleanedNumber.slice(8, 11)}`;
    }
    if (cleanedNumber.length === 12 && cleanedNumber.startsWith("38")) {
        return `+38 (${cleanedNumber.slice(2, 5)}) ${cleanedNumber.slice(5, 8)}-${cleanedNumber.slice(8, 10)}${cleanedNumber.slice(10, 12)}`;
    }
    return 'Некоректний номер';
}

export const checkFormValidity = (formData) => {
    if (!formData) return false;
    const requiredFields = ['fullName_lastName', 'fullName_name', 'phoneNumber'];
    if (requiredFields.some(field => !formData[field])) return false;
    const areFieldsFilled = requiredFields.every(field => formData[field].trim() !== '');
    const isNameValid = (formData.fullName_name || '').length >= 3 && (formData.fullName_lastName || '').length >= 3;
    const isEmailValid = validateEmail(formData.email);
    const phoneDigitsCount = (formData.phoneNumber || '').replace(/\D/g, '').length;
    const isPhoneValid = phoneDigitsCount >= 10 && validateAndFormatPhoneNumber(formData.phoneNumber) !== "Некоректний номер";

    return areFieldsFilled && isPhoneValid && isNameValid && isEmailValid;
};