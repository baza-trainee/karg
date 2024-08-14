import DragDropFileUpload from '../../../DragDropFileUpload/DragDropFileUpload';
import { TrashIcon, CreateIcon } from '@/public/assets/icons';
import styles from "./styles/imageUploader.module.scss";
import variables from '../../../../../variables.module.scss';
import { memo } from 'react';
import { userDefault } from '@/public/assets/images/account';

const ImageUploader = memo(({ images, maxImages, handleImageUploaded, handleDeleteImage }) => {
    return (
        <div>
            {!images.length ? (
                <div className={styles.imagesGrid}>
                    <div className={styles.imageContainer}>
                        <div className={styles.row}>
                            <img src={userDefault.src} className={styles.defaultImg} alt={`Account default image`} />
                            <div className={styles.text}>
                                <p className={variables.font24w700}>Моє фото</p>
                                <p className={variables.font20w500}>Зображення</p>
                            </div>
                            <div className={`${styles.iconsContainer}`}>
                                <DragDropFileUpload
                                    placeholderImage={<CreateIcon className={`${styles.create_icon}`} />}
                                    className={styles.uploadArea}
                                    onFileUploaded={handleImageUploaded}
                                />
                                <DragDropFileUpload
                                    placeholderImage={<TrashIcon className={`${styles.trash_icon}`} />}
                                    className={styles.uploadArea}
                                    onFileUploaded={handleImageUploaded}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.imagesGrid}>
                    {Array.from({ length: maxImages }).map((_, index) => (
                        <div key={index} className={styles.imageContainer}>
                            {images[index] ? (
                                <div className={styles.row}>
                                    <img src={images[index]} alt={`Account image ${index + 1}`} className={styles.imageMin} />
                                    <div className={styles.text}>
                                        <p className={variables.font24w700}>Моє фото</p>
                                        <p className={variables.font20w500}>Зображення</p>
                                    </div>
                                    <div className={`${styles.iconsContainer}`}>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(index);
                                            }}>
                                            <CreateIcon
                                                className={styles.create_icon}
                                            />
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(index);
                                            }}>
                                            <TrashIcon
                                                className={styles.trash_icon}
                                            />
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className={styles.row}>
                                    <img src={userDefault.src} alt={`Account default image`} className={styles.imageMin} />
                                    <div className={styles.text}>
                                        <p className={variables.font24w700}>Моє фото</p>
                                        <p className={variables.font20w500}>Зображення</p>
                                    </div>
                                    <div className={`${styles.iconsContainer}`}>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(index);
                                            }}>
                                            <CreateIcon
                                                className={styles.create_icon}
                                            />
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(index);
                                            }}>
                                            <TrashIcon
                                                className={styles.trash_icon}
                                            />
                                        </div>

                                    </div>
                                </div>
                                // <DragDropFileUpload
                                //     placeholderImage={<PlusPlaceholderMinImage className={styles.placeholderImageMin} />}
                                //     className={styles.uploadArea}
                                //     onFileUploaded={handleImageUploaded}
                                // />
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
})
export default ImageUploader;