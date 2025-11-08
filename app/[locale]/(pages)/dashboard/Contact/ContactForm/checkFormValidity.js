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

    if (formData.category === "Email") {
        return validateEmail(formData.value);
    }
    if (formData.category === "PhoneNumber") {
        return validateAndFormatPhoneNumber(formData.value) !== "Некоректний номер";
    }
    if (formData.category === "Location") {
        if (!formData.valueUa || !formData.valueEn) {
            return false;
        }

        const isValid =
            typeof formData.valueUa === "string" &&
            formData.valueUa.trim().length > 0 &&
            typeof formData.valueEn === "string" &&
            formData.valueEn.trim().length > 0;
        return isValid;
    }

    const areFieldsFilled = typeof formData.value === "string" && formData.value.trim().length > 0;
    return areFieldsFilled;
};
