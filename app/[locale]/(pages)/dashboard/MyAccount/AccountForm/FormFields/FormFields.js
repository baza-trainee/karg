import styles from "./styles/formFields.module.scss";
import variables from "../../../../../variables.module.scss";
import { memo } from 'react';

const FormFields = memo(({ formData, handleChange, phoneNumberTitle, firstNameTitle, lastNameTitle, emailTitle }) => {
    return (
        <div className={styles.formContainer}>
            <div className={`${styles.formFields} ${styles.editMode}`}>

                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.nameField} ${variables.font20w400}`}
                        htmlFor="firstNameField">
                        {firstNameTitle}
                    </label>
                    <input
                        type="text"
                        id="firstNameField"
                        name="fullName_name"
                        value={formData.fullName_name}
                        className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                        onChange={(e) => handleChange(e)}
                    >
                    </input>
                </div>
                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.descriptionField} ${variables.font20w400}`}
                        htmlFor="lastNameField">
                        {lastNameTitle}
                    </label>
                    <input
                        type="text"
                        id="lastNameField"
                        name="fullName_lastName"
                        value={formData.fullName_lastName}
                        className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                        onChange={(e) => handleChange(e)}
                    >
                    </input>
                </div>
                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.descriptionField} ${variables.font20w400}`}
                        htmlFor="phoneNumberField">
                        {phoneNumberTitle}
                    </label>
                    <input
                        type="text"
                        id="phoneNumberField"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                        onChange={(e) => handleChange(e)}
                    >
                    </input>
                </div>
                <div className={styles.inputBlock}>
                    <label
                        className={`${styles.descriptionField} ${variables.font20w400}`}
                        htmlFor="emailField">
                        {emailTitle}
                    </label>
                    <input
                        type="text"
                        id="emailField"
                        name="email"
                        value={formData.email}
                        className={`${styles.nameFieldInput} ${styles.field} ${variables.font18w500}`}
                        //onChange={(e) => handleChange(e)}
                        disabled={true}
                    >
                    </input>
                </div>

            </div>

        </div>

    );
});
export default FormFields;