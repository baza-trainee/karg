'use client';
import styles from "./socialIcons.module.scss";

import { Facebook, Instagram, Telegram } from "@/public/assets/icons";
import { useContactLinks } from '@/app/contactLinksProvider';

const SocialIcons = ({ className }) => {
  const { instagram, facebook, telegram } = useContactLinks();

  return (
    <div className={`${styles.iconsContainer}`}>
      <a
        target="_blanc"
        href={instagram}
      >
        <Instagram className={className} />
      </a>
      <a
        target="_blanc"
        href={facebook}
      >
        <Facebook className={className} />
      </a>
      <a
        target="_blanc"
        href={telegram}
      >
        <Telegram className={className} />
      </a>
    </div>
  );
};

export default SocialIcons;
