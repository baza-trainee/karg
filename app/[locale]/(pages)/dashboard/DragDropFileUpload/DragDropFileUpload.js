'use client'
import { useState, useRef } from 'react';
import styles from "./dragDropFileUpload.module.scss";

const DragDropFileUpload = ({ onFileUploaded, placeholderImage, placeholderText, placeholderTextClassName = '', className = '', accept = 'image/*', style = {} }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const uploadImage = async (file) => {
        if (!(file instanceof File)) {
            throw new Error("Provided argument is not a File");
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Upload successful:', data);
                return data.url;
            } else {
                throw new Error(data.error.message || 'Loading error');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };
    
    const handleFileUpload = async (file) => {
        try {
            const url = await uploadImage(file);
            onFileUploaded(url);
            setFile(null);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            handleFileUpload(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0 && files[0].type.match(accept)) {
            const file = files[0];
            setFile(file);
            handleFileUpload(file);
        }
    };

    return (
        <div
            className={className}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
        >
            {file ? (
                <img src={URL.createObjectURL(file)} alt="Uploaded" />
            ) : (
                <>
                    <div className={styles.placeholder}>{placeholderImage}</div>
                    {placeholderText && <div className={placeholderTextClassName}>{placeholderText}</div>}
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleChange}
                        accept={accept}
                        style={{ display: 'none' }}
                    />
                </>
            )}
        </div>
    );
};

export default DragDropFileUpload;
