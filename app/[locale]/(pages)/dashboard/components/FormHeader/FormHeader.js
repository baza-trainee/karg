import styles from "./styles/formHeader.module.scss";
import variables from "../../../../variables.module.scss";
import { memo } from 'react';

const FormHeader = memo(({ title, language, toggleLanguage, ukrLng, engLng, ukrLangClassName = '', engLangClassName = '' }) => {
    return (
        <div className={styles.header}>
            <p className={`${styles.title} ${variables.font24w700}`}> {title}</p >
            <div className={`${styles.languageSwitcher} ${language === 'ua' ? styles.ua : styles.en} ${variables.font20w700}`}>
                <button className={`${ukrLangClassName} ${language === 'ua' ? styles.selectedLanguage : ''}`} onClick={toggleLanguage}>{ukrLng}</button>
                <button className={`${engLangClassName} ${language === 'en' ? styles.selectedLanguage : ''}`} onClick={toggleLanguage}>{engLng}</button>
            </div>
        </div>
    );
})

export default FormHeader;