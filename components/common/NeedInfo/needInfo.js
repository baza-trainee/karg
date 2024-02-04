'use client'

import PropTypes from 'prop-types';
import styles from "./styles/needInfo.module.scss"
import ButtonAsLink from '../../ButtonAsLink/buttonAsLink';

const NeedInfo = ({ title, subtitle, route, buttonCaption, isMainPageStyle = false }) => {

    return (
        <div className={`${styles.desk} ${isMainPageStyle ? styles.mainPageDesk : ''}`}>
            <div className={styles.text}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle}>
                    {subtitle}
                </div>
            </div>
            <ButtonAsLink
                route={route}
                buttonCaption={buttonCaption}
                buttonStyle={`${isMainPageStyle ? 'button-help-main-page' : 'button-help'}`} />
        </div>
    );
};

NeedInfo.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    route: PropTypes.string,
    buttonCaption: PropTypes.string,
    isMainPageStyle: PropTypes.bool,
};

export default NeedInfo;



