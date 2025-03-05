export function validateAndFormatPhoneNumber(phoneNumber) {
    if (typeof phoneNumber !== "string") {
        return 'Некоректний номер';
    }
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    if (cleanedNumber.length > 12) {
        return "Невірна довжина номера";
    }
    if (cleanedNumber.length === 12 && !cleanedNumber.startsWith("0") && !cleanedNumber.startsWith("38") && !cleanedNumber.startsWith("+38")) {
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

    if (formData.category === "phoneNumber") {
        return validateAndFormatPhoneNumber(formData.value) !== "Некоректний номер";
    }

    return requiredFields.every(field => formData[field].trim() !== '');
};