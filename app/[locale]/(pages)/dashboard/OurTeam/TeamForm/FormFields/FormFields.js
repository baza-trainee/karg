import styles from "./styles/formFields.module.scss";
import variables from "../../../../../variables.module.scss";
import ImageUploader from '../ImageUploader/ImageUploader';
import { memo } from 'react';

const FormFields = memo(({ formData, handleChange, handleImageUploaded, handleDeleteImage, maxImages, phoneNumberTitle, fullNameTitle, emailTitle, type, handleBlur }) => {
    return (
        <div className={`${styles.formFields} ${type === 'edit' ? styles.editMode : ''}`}>
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.nameField} ${variables.font20w400}`}
                    htmlFor="fullName">
                    {fullNameTitle}
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    maxLength="500"
                    value={formData.fullName || ''}
                    className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </input>
            </div>
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.descriptionField} ${variables.font20w400}`}
                    htmlFor="phoneNumber">
                    {phoneNumberTitle}
                </label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    inputMode="numeric"
                    value={formData.phoneNumber || ''}
                    className={`${styles.textareaField} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleBlur(e)}
                >
                </input>
            </div>
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.descriptionField} ${variables.font20w400}`}
                    htmlFor="email">
                    {emailTitle}
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={type === 'edit'}
                    maxLength='320'
                    value={formData.email || ''}
                    className={`${styles.textareaField} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)} 
                >
                </input>
            </div>
            <ImageUploader
                images={formData.images}
                maxImages={maxImages}
                imageId={formData.id}
                handleImageUploaded={handleImageUploaded}
                handleDeleteImage={handleDeleteImage}
            />
        </div>
    );
});
export default FormFields;