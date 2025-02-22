import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { Plus, TrashIcon } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import { memo, useState, useEffect } from 'react';
import { addBase64Prefix } from '@/utils/base64ImageHandler';
import { PlusPlaceholderMinImage } from '@/public/assets/icons';

const ImageUploader = memo(({ images, maxImages, handleImageUploaded, handleDeleteImage }) => {
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        if (images && images.length > 0) {
            const urls = images.map(image => {
                if (!image) return null;
                if (image.startsWith('http') || image.startsWith('/')) {
                    return image;
                } else if (image.startsWith('data:image/')) {
                    return image;
                } else {
                    return addBase64Prefix(image);
                }
            });

            setPreviewUrls(urls);
        } else {
            setPreviewUrls([]);
        }
    }, [images]);

    const getImageSrc = (image) => {
        if (!image) return '';
        if (image.startsWith('http')) return image;
        if (image.startsWith('data:image/')) return image;
        if (image.startsWith('/') && !image.startsWith('/9j/')) {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${image.replace(/^\/+/, '')}`;
            return url;
        }
        return addBase64Prefix(image);
    };

    return (
        <div className={styles.imageUploader}>
            {!images.length ? (
                <DragDropFileUpload
                    placeholderImage={<Plus className={styles.placeholderImageMin} />}
                    placeholderText="Додати фото"
                    placeholderTextClassName={styles.placeholderText}
                    className={styles.uploadArea}
                    onFileUploaded={handleImageUploaded}
                />
            ) : (
                <div>
                    {Array.from({ length: maxImages }).map((_, index) => (
                        <div key={index} className={styles.imageContainer}>
                            {previewUrls[index] ? (
                                <div>
                                    <div className={styles.deleteIconContainer}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteImage(index);
                                        }}>
                                        <TrashIcon
                                            className={styles.deleteIcon}
                                        />
                                    </div>
                                    <img
                                        src={getImageSrc(previewUrls[index])}
                                        alt={`Partner's logo`}
                                        width="92"
                                        height="92"
                                    />
                                </div>
                            ) : (
                                <DragDropFileUpload
                                    placeholderImage={<PlusPlaceholderMinImage className={styles.placeholderImageMin} />}
                                    className={styles.uploadArea}
                                    onFileUploaded={handleImageUploaded}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
})
export default ImageUploader;