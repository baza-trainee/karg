import styles from './socialIcons.module.scss';

import { Facebook, Instagram, Telegram } from "@/public/assets/icons";
import PropTypes from 'prop-types';

const SocialIcons = ({ iconsColor, gridOption, customStyles }) => {

    const iconsStyle = { color: iconsColor };
    const customStylesArr = [{ styleName: 'iconsContacts', style: styles.iconsContacts }];

    const getStyles = () => {
        if (customStyles) {
            return customStylesArr.find(el => el.styleName === customStyles)?.style;
        }
    };

    const scssClass = getStyles() ? getStyles() : styles.icons;

    return (
        <div className={`${styles.iconsContainer}`} style={gridOption}>
            <a target='_blanc' href="https://www.facebook.com/KARG.kyivanimalrescuegroup">
                <Facebook className={scssClass} style={iconsStyle} />
            </a>
            <a target='_blanc' href="https://www.instagram.com/karg.kyiv?igsh=MWp0cDE1dDB4bHRoeQ==">
                <Instagram className={scssClass} style={iconsStyle} />
            </a>
            <a target='_blanc' href={`https://t.me/share/url?url=${encodeURIComponent('https://karg-roman-hana.vercel.app/')}&text=${encodeURIComponent('Сюди треба придумати якийсь текст будь-ласка')}`}>
                <Telegram className={scssClass} style={iconsStyle} />
            </a>
        </div>
    );
};

SocialIcons.propTypes = {
    iconColor: PropTypes.string,
};


export default SocialIcons;