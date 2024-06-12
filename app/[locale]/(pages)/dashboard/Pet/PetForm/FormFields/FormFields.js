import { ArrowDown } from '@/public/assets/icons';
import styles from "./styles/formFields.module.scss";
import variables from "../../../../../variables.module.scss";
import ImageUploader from '../ImageUploader/ImageUploader';
import { memo } from 'react';

const FormFields = memo(({ formData, language, handleChange, handleImageUploaded, handleDeleteImage, maxImages, categoryTitle, descriptionTitle, storyTitle, nameTitle, type, placeholder }) => {
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
                    name={language === 'ua' ? "name_ua" : "name_en"}
                    value={language === 'ua' ? formData.name_ua : formData.name_en}
                    className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </input>
            </div>
            <ImageUploader
                images={formData.images}
                maxImages={maxImages}
                handleImageUploaded={handleImageUploaded}
                handleDeleteImage={handleDeleteImage}

            />
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.categoryField} ${variables.font20w400}`}
                    htmlFor="categoryField">
                    {categoryTitle}
                </label>
                <div className={styles.selectWrapper}>
                    <select
                        id="categoryField"
                        name="category"
                        required
                        className={`${styles.categoryFieldInput} ${styles.field} ${variables.font18w500}`}
                        value={formData.category}
                        onChange={(e) => handleChange(e)}
                        style={{ color: formData.category === "" ? '#A1A1A1' : '#141414' }}
                    >
                        {type === 'create' && !formData.category && <option value="" disabled hidden>{placeholder}</option>}
                        <option value='Dog' style={{ color: '#141414' }}>Собаки</option>
                        <option value='Cat' style={{ color: '#141414' }}>Коти</option>
                        <option value='Other' style={{ color: '#141414' }}>Інші тварини</option>
                    </select>
                    <ArrowDown className={styles.selectArrow} />
                </div>
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
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.storyField} ${variables.font20w400}`}
                    htmlFor="storyField">
                    {storyTitle}
                </label>
                <textarea
                    id="storyField"
                    name={language === 'ua' ? "story_ua" : "story_en"}
                    maxLength="500"
                    value={language === 'ua' ? formData.story_ua : formData.story_en}
                    className={`${styles.textareaField} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </textarea>
            </div>
        </div>
    );
});
export default FormFields;