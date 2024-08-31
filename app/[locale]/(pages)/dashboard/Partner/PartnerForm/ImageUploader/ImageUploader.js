import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { Plus, TrashIcon } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import { memo } from 'react';

const ImageUploader = memo(({ images, maxImages, handleImageUploaded, handleDeleteImage }) => {
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
                                    <img src={images[index]} alt={`Partner's logo ${index + 1}`} className={styles.imageMin} />
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