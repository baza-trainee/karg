import styles from "./styles/formHeader.module.scss";
import variables from "../../../../variables.module.scss";
import { memo } from 'react';

const FormHeader = memo(({ title, customTitle, customHeader, language, toggleLanguage, ukrLng, engLng, ukrLangClassName = '', engLangClassName = '' }) => {
    return (
        <div className={`${styles.header} ${customHeader}`}>
            <p className={`${styles.title} ${variables.font24w700} ${customTitle}`}> {title}</p >
            {language ?
                <div className={`${styles.languageSwitcher} ${language === 'ua' ? styles.ua : styles.en} ${variables.font20w700}`}>
                    <button className={`${ukrLangClassName} ${language === 'ua' ? styles.selectedLanguage : ''}`} onClick={(e) => toggleLanguage(e, 'ua')}>{ukrLng}</button>
                    <button className={`${engLangClassName} ${language === 'en' ? styles.selectedLanguage : ''}`} onClick={(e) => toggleLanguage(e, 'en')}>{engLng}</button>
                </div> : null}
        </div>
    );
})

export default FormHeader;