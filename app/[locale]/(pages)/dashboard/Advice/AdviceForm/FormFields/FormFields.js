import styles from "./styles/formFields.module.scss";
import variables from "../../../../../variables.module.scss";
import ImageUploader from '../ImageUploader/ImageUploader';
import { memo } from 'react';

const FormFields = memo(({ formData, language, handleChange, handleImageUploaded, handleDeleteImage, descriptionTitle, nameTitle, type }) => {
    return (
        <div className={`${styles.formFields} ${type === 'edit' ? styles.editMode : ''}`}>
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.nameField} ${variables.font20w400}`}
                    htmlFor="nameField">
                    {nameTitle}
                </label>
                <input
                    type="text"
                    id="nameField"
                    name={language === 'ua' ? "title_ua" : "title_en"}
                    value={language === 'ua' ? formData.title_ua : formData.title_en}
                    className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </input>
            </div>
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.descriptionField} ${variables.font20w400}`}
                    htmlFor="descriptionField">
                    {descriptionTitle}
                </label>
                <textarea
                    id="descriptionField"
                    name={language === 'ua' ? "description_ua" : "description_en"}
                    maxLength="500"
                    value={language === 'ua' ? formData.description_ua : formData.description_en}
                    className={`${styles.textareaField} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </textarea>
            </div>
            <ImageUploader
                image={formData.image}
                imageId={formData.id}
                handleImageUploaded={handleImageUploaded}
                handleDeleteImage={handleDeleteImage}
            />
        </div>
    );
});
export default FormFields;