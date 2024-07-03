import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { PlusPlaceholderImage, PlusPlaceholderMinImage, TrashIcon } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import { memo } from 'react';

const ImageUploader = memo(({ image, imageId, handleImageUploaded, handleDeleteImage }) => {
    return (
        <div>
            {!image ? (
                <DragDropFileUpload
                    placeholderImage={<PlusPlaceholderImage className={styles.placeholderImage} />}
                    className={styles.uploadArea}
                    onFileUploaded={handleImageUploaded}
                />
            ) : (
                <div className={styles.imagesGrid}>
                    <div className={styles.imageContainer}>
                        {image ? (
                            <div>
                                <div className={styles.deleteIconContainer}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteImage(imageId);
                                    }}>
                                    <TrashIcon
                                        className={styles.deleteIcon}
                                    />
                                </div>
                                <img src={image} alt={`Advice image ${imageId}`} className={styles.imageMin} />
                            </div>
                        ) : (
                            <DragDropFileUpload
                                placeholderImage={<PlusPlaceholderMinImage className={styles.placeholderImageMin} />}
                                className={styles.uploadArea}
                                onFileUploaded={handleImageUploaded}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
})
export default ImageUploader;