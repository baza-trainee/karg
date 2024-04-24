'use client'
import { useState, useRef } from 'react';
import styles from "./dragDropFileUpload.module.scss";

const DragDropFileUpload = ({ onFileSelected, placeholderImage, className = '', accept = 'image/*', style = {} }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            onFileSelected(file);
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
            onFileSelected && onFileSelected(file);
        }
    };

    return (
        <div
            className={`${styles.fileUpload} ${className}`}
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
            {file && <button onClick={() => setFile(null)}>Remove</button>}
        </div>
    );
};

export default DragDropFileUpload;
