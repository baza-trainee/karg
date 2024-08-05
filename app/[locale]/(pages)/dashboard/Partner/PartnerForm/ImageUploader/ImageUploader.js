import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { Plus, TrashIcon } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import { memo } from 'react';

const ImageUploader = memo(({ image, handleImageUploaded, handleDeleteImage }) => {
    return (
        <div className={styles.imageUploader}>
            {!image ? (
                <DragDropFileUpload
                    placeholderImage={<Plus className={styles.placeholderImageMin} />}
                    placeholderText="Додати фото"
                    placeholderTextClassName={styles.placeholderText}
                    className={styles.uploadArea}
                    onFileUploaded={handleImageUploaded}
                />
            ) : (
                <div className={styles.imageContainer}>
                    <div className={styles.deleteIconContainer}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image);
                        }}>
                        <TrashIcon
                            className={styles.deleteIcon}
                        />
                    </div>
                    <img src={image} alt={`Partner's logo`} className={styles.imageMin} />
                </div>
            )}
        </div>
    );
})
export default ImageUploader;