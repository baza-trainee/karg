import styles from "./socialIcons.module.scss";

import { Facebook, Instagram, Telegram } from "@/public/assets/icons";


const SocialIcons = ({ className }) => {
  return (
    <div className={`${styles.iconsContainer}`}>
      <a
        target="_blanc"
        href="https://www.facebook.com/KARG.kyivanimalrescuegroup"
      >
        <Facebook className={className} />
      </a>
      <a
        target="_blanc"
        href="https://www.instagram.com/karg.kyiv?igsh=MWp0cDE1dDB4bHRoeQ=="
      >
        <Instagram className={className} />
      </a>
      <a
        target="_blanc"
        href={`https://t.me/share/url?url=${encodeURIComponent(
          "https://uk.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BF%D1%96%D0%B1%D0%B0%D1%80%D0%B0"
        )}&text=${encodeURIComponent(
          "Тут буде адреса сайту коли вын буде готовий а поки почитайте про Капібару"
        )}`}
      >
        <Telegram className={className} />
      </a>
    </div>
  );


};

export default SocialIcons;
