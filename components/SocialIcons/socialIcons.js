'use client';
import styles from "./socialIcons.module.scss";

import { Facebook, Instagram, Telegram } from "@/public/assets/icons";

const SocialIcons = ({ className, urlToShare = '' }) => {

  return (
    <div className={`${styles.iconsContainer}`}>
      <a
        target="_blank"
        href={''}
      >
        <Instagram className={className} />
      </a>
      <a
        target="_blank"
        href={`https://www.facebook.com/sharer/sharer.php?u=${urlToShare}`}
      >
        <Facebook className={className} />
      </a>
      <a
        target="_blank"
        href={`https://t.me/share/url?url=${urlToShare}`}
      >
        <Telegram className={className} />
      </a>
    </div>
  );
};

export default SocialIcons;
