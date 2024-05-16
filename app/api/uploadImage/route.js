const uploadImage = async (file) => {
    if (!(file instanceof File)) {
        throw new Error("Provided argument is not a File");
    }
    const formData = new FormData();
    formData.append('key', '31144afd9db9fb9751d3334acc8eb52c');
    formData.append('image', file);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Download successful:', data);
            return data.data.image.url;
        } else {
            throw new Error(data.error.message || 'Loading error');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
export default uploadImage;
