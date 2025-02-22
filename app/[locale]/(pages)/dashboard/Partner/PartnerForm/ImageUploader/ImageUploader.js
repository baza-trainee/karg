import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { Plus, TrashIcon } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import { memo, useState, useEffect } from 'react';
import { getImageSrc } from '@/utils/base64ImageHandler';
import { PlusPlaceholderMinImage } from '@/public/assets/icons';

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