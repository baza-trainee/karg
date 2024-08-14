import styles from "./styles/formFields.module.scss";
import variables from "../../../../../variables.module.scss";
import ImageUploader from '../ImageUploader/ImageUploader';
import { memo } from 'react';

const FormFields = memo(({ formData, handleChange, handleImageUploaded, handleDeleteImage, maxImages, phoneNumberTitle, fullNameTitle, type }) => {
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
                    name={"fullName"}
                    value={formData.fullName}
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
                <textarea
                    id="phoneNumber"
                    name={"phoneNumber"}
                    maxLength="500"
                    value={formData.phoneNumber}
                    className={`${styles.textareaField} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </textarea>
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