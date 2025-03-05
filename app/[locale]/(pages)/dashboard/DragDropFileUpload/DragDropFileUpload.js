'use client'
import { useState, useRef } from 'react';
import styles from "./dragDropFileUpload.module.scss";
import { encodeToBase64 } from '@/utils/base64ImageHandler';

const MAX_FILE_SIZE = 500000;

const DragDropFileUpload = ({
    onFileUploaded,
    placeholderImage,
    placeholderText,
    placeholderTextClassName = '',
    className = '',
    accept = 'image/*',
    style = {},
    showPreview = false,
}) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileUpload = async (file) => {
        try {
            if (!(file instanceof Blob) || !file.type.match(accept)) {
                console.error('Invalid file type in DragDropFileUpload:', file);
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert('Розмір файлу перевищує 500 КБ. Будь ласка, завантажте менший файл.');
                return;
            }
            const base64 = await encodeToBase64(file);
            onFileUploaded(base64);
        } catch (error) {
            console.error('Error processing file in handleFileUpload:', error);
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
            {file && showPreview ? (
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
