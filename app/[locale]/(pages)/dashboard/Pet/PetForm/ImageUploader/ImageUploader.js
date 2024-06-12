import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { PlusPlaceholderImage, PlusPlaceholderMinImage, TrashIcon } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import { memo } from 'react';

const ImageUploader = memo(({ images, maxImages, handleImageUploaded, handleDeleteImage }) => {
    return (
        <div>
            {!images.length ? (
                <DragDropFileUpload
                    placeholderImage={<PlusPlaceholderImage className={styles.placeholderImage} />}
                    className={styles.uploadArea}
                    onFileUploaded={handleImageUploaded}
                />
            ) : (
                <div className={styles.imagesGrid}>
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
                                    <img src={images[index]} alt={`Pet image ${index + 1}`} className={styles.imageMin} />
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