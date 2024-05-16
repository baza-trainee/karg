'use client'
import { useState, useRef } from 'react';
import styles from "./dragDropFileUpload.module.scss";
import uploadImage from '../../../../api/uploadImage/route';

const DragDropFileUpload = ({ onFileUploaded, placeholderImage, className = '', accept = 'image/*', style = {} }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileUpload = async (file) => {
        try {
            const url = await uploadImage(file);
            onFileUploaded(url);
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
