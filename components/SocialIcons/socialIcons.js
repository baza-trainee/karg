import styles from "./socialIcons.module.scss";

import { Facebook, Instagram, Telegram } from "@/public/assets/icons";

const SocialIcons = ({ className }) => {
  return (
    <div className={`${styles.iconsContainer}`}>
      <a
        target="_blanc"
        href="https://www.instagram.com/karg.kyiv?igsh=MWp0cDE1dDB4bHRoeQ=="
      >
        <Instagram className={className} />
      </a>
      <a
        target="_blanc"
        href="https://www.facebook.com/KARG.kyivanimalrescuegroup"
      >
        <Facebook className={className} />
      </a>
      <a
        target="_blanc"
        href={`https://t.me/share/url?url=${encodeURIComponent(
          "https://www.karg.kyiv.ua/"
        )}&text=${encodeURIComponent(
          "Сайт Карг"
        )}`}
      >
        <Telegram className={className} />
      </a>
    </div>
  );
};

export default SocialIcons;
