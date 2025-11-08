import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { PlusPlaceholderImage, PlusPlaceholderMinImage, TrashIcon } from '@/public/assets/icons';
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
        <div className={styles.imageContainer}>
            {previewUrls.length ? (
                <div className={styles.imageWrapper}>
                    <div className={styles.deleteIconContainer}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(0);
                        }}>
                        <TrashIcon
                            className={styles.deleteIcon}
                        />
                    </div>
                    <img
                        src={previewUrls[0]}
                        alt={`User image`}
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
    )
});
export default ImageUploader;