import styles from "./styles/formFieldsPartner.module.scss";
import variables from "../../../../../variables.module.scss";
import ImageUploader from "../ImageUploader/ImageUploader";
import { memo } from 'react';

const FormFieldsPartner = memo(({ formData, handleChange, handleImageUploaded, handleDeleteImage, nameTitle, linkTitle, type }) => {

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
                    name={'name'}
                    value={formData.name}
                    className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </input>
            </div>
            <ImageUploader
                images={formData.images}
                maxImages={1}
                handleImageUploaded={handleImageUploaded}
                handleDeleteImage={handleDeleteImage}
            />
            <div className={styles.inputBlock}>
                <label
                    className={variables.font20w400}
                    htmlFor="linkField">
                    {linkTitle}
                </label>
                <input
                    type="text"
                    id="linkField"
                    name={'uri'}
                    value={formData.uri}
                    className={`${styles.field} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </input>
            </div>
        </div>
    );
});
export default FormFieldsPartner;