import styles from "./styles/formFields.module.scss";
import variables from "../../../../../variables.module.scss";
import { memo } from 'react';

const FormFields = memo(({ formData, handleChange, categoryTitle, type, categoryLabel }) => {

    return (
        <div className={`${styles.formFields} ${type === 'edit' ? styles.editMode : ''}`}>
            <div className={styles.textareaBlock}>
                <label
                    className={`${styles.nameField} ${variables.font20w400}`}
                >
                    {categoryTitle}
                </label>
                <span className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}>
                    {categoryLabel}
                </span>
            </div>

            <div className={styles.textareaBlock}>
                <label
                    className={`${styles.descriptionField} ${variables.font20w400}`}
                    htmlFor="valueField">
                </label>
                {formData.category === "Location" ? (
                    <>
                        <textarea
                            id="valueField"
                            name="valueUa"
                            maxLength="200"
                            value={formData.valueUa || ''}
                            className={`${styles.textareaField} ${variables.font18w500}`}
                            onChange={(e) => handleChange(e)}
                        >
                        </textarea>
                        <textarea
                            id="valueField"
                            name="valueEn"
                            maxLength="200"
                            value={formData.valueEn || ''}
                            className={`${styles.textareaField} ${variables.font18w500}`}
                            onChange={(e) => handleChange(e)}
                        >
                        </textarea>
                    </>
                ) : (
                    <textarea
                        id="valueField"
                        name="value"
                        maxLength="200"
                        value={formData.value}
                        className={`${styles.textareaField} ${variables.font18w500}`}
                        onChange={(e) => handleChange(e)}
                    >
                    </textarea>
                )}
            </div>
        </div>
    );
});
export default FormFields;