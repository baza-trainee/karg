export const encodeToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = (error) => {
            console.error('Error encoding file to Base64:', error);
            reject(error);
        }
    });

export const getMimeTypeFromBase64 = (base64) => {
    if (base64.startsWith('/9j/')) return 'image/jpeg';
    if (base64.startsWith('iVBORw0KGgo')) return 'image/png';
    if (base64.startsWith('R0lGODdh') || base64.startsWith('R0lGODlh')) return 'image/gif';
    return 'image/jpeg';
}

export const addBase64Prefix = (base64) => {
    const mimeType = getMimeTypeFromBase64(base64);
    return `data:${mimeType};base64,${base64}`;
}

export const base64ToImage = (base64) => {
    if (!base64 || typeof base64 !== 'string') return ''; 
    if (base64.includes('data:image/')) return base64;
    return addBase64Prefix(base64);
}

export const processFileToBase64 = async (file) => {
    try {
        const base64 = await encodeToBase64(file);
        return base64;
    } catch (error) {
        console.error('Error encoding file to Base64:', error);
        throw error;
    }
}

export const uploadFileAsBase64 = async (file, callback) => {
    try {
        const base64 = await processFileToBase64(file);
        const dataUrl = addBase64Prefix(base64); 
        callback(dataUrl);
    } catch (error) {
        console.error('Error handling file upload:', error);
    }
}