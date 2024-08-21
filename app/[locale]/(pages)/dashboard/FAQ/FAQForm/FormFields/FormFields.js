import styles from "./styles/formFields.module.scss";
import variables from "../../../../../variables.module.scss";
import { memo } from 'react';

const FormFields = memo(({ formData, language, handleChange, questionTitle, answerTitle, type }) => {
    return (
        <div className={`${styles.formFields} ${type === 'edit' ? styles.editMode : ''}`}>
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.nameField} ${variables.font20w400}`}
                    htmlFor="questionField">
                    {questionTitle}
                </label>
                <input
                    type="text"
                    id="questionField"
                    name={language === 'ua' ? "question_ua" : "question_en"}
                    value={language === 'ua' ? formData.question_ua : formData.question_en}
                    className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </input>
            </div>
            <div className={styles.inputBlock}>
                <label
                    className={`${styles.descriptionField} ${variables.font20w400}`}
                    htmlFor="answerField">
                    {answerTitle}
                </label>
                <textarea
                    id="answerField"
                    name={language === 'ua' ? "answer_ua" : "answer_en"}
                    maxLength="500"
                    value={language === 'ua' ? formData.answer_ua : formData.answer_en}
                    className={`${styles.textareaField} ${variables.font18w500}`}
                    onChange={(e) => handleChange(e)}
                >
                </textarea>
            </div>
        </div>
    );
});
export default FormFields;