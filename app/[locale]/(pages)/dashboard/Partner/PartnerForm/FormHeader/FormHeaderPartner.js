import styles from "./styles/formHeaderPartner.module.scss";
import variables from "../../../../../variables.module.scss";
import { memo } from 'react';

const FormHeaderPartner = memo(({ title }) => {
    return (
        <div className={styles.header}>
            <p className={`${styles.title} ${variables.font24w700}`}> {title}</p >
        </div>
    );
})

export default FormHeaderPartner;