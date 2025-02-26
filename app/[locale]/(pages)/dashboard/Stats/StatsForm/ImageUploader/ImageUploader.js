import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { PlusPlaceholder, TrashIcon, PlusPlaceholderMinImage } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import { memo, useState, useEffect } from 'react';
import { getImageSrc } from '@/utils/base64ImageHandler';

const ImageUploader = memo(({ images, maxImages, handleImageUploaded, handleDeleteImage }) => {
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        if (images && images.length > 0) {
            setPreviewUrls(images.map(image => getImageSrc(image)));
        } else {
            setPreviewUrls([]);
        }
    }, [images]);

    return (
        <div>
            {!images.length ? (
                <DragDropFileUpload
                    placeholderImage={<PlusPlaceholder className={styles.placeholderImage} />}
                    className={styles.uploadArea}
                    onFileUploaded={handleImageUploaded}
                />
            ) : (
                <div className={styles.imagesFlex}>
                    {Array.from({ length: maxImages }).map((_, index) => (
                        <div key={index} className={styles.imageContainer}>
                            {images[index] ? (
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
                                        alt={`Stats image ${index + 1}`}
                                        className={styles.imageMin}
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