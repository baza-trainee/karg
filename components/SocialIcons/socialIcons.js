import styles from './socialIcons.module.scss';

import { Facebook, Instagram, Telegram } from "@/public/assets/icons";
import PropTypes from 'prop-types';

const SocialIcons = ({ iconsColor, gridOption }) => {

    const iconsStyle = { color: iconsColor };

    return (
        <div className={`${styles.iconsContainer}`} style={gridOption}>
            <a href="https://www.facebook.com/">
                <Facebook className={`${styles.icons}`} style={iconsStyle} />
            </a>
            <a href="https://www.instagram.com/">
                <Instagram className={styles.icons} style={iconsStyle} />
            </a>
            <a href="https://www.telegram.com/">
                <Telegram className={styles.icons} style={iconsStyle} />
            </a>
        </div>
    );
};

SocialIcons.propTypes = {
    iconColor: PropTypes.string,
};


export default SocialIcons;