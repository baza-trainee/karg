'use client';
import { useState, useEffect } from 'react';
import styles from "./socialIcons.module.scss";

import { Facebook, Instagram, Telegram } from "@/public/assets/icons";
import { useContactLinks } from '@/app/contactLinksProvider';

const SocialIcons = ({ className, shareCurrentPage = false }) => {
  const { instagram, facebook, telegram } = useContactLinks();
  const [currentPageUrl, setCurrentPageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (shareCurrentPage && typeof window !== 'undefined') {
      setCurrentPageUrl(window.location.href);
    }
  }, [shareCurrentPage]);

  const shareToFacebook = (e) => {
    if (shareCurrentPage) {
      e.preventDefault();
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`;
      window.open(url, '_blank');
    }
  };

  const shareToTelegram = (e) => {
    if (shareCurrentPage) {
      e.preventDefault();
      const url = `https://t.me/share/url?url=${encodeURIComponent(currentPageUrl)}`;
      window.open(url, '_blank');
    }
  };

  const copyToClipboard = async (e) => {
    if (shareCurrentPage) {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(currentPageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={`${styles.iconsContainer}`}>
      <a
        target="_blank"
        href={shareCurrentPage ? '#' : instagram}
        onClick={shareCurrentPage ? copyToClipboard : undefined}
        rel="noreferrer"
      >
        <Instagram className={className} />
        {copied && shareCurrentPage && <div className={`${styles.socIcons_toast} ${copied ? styles.socIcons_toast_show : ''}`}>
          <div className={styles.socIcons_toast_content}>
            <span>Copied to clipboard!</span>
          </div>
        </div>}
      </a>
      <a
        target="_blank"
        href={shareCurrentPage ? '#' : facebook}
        onClick={shareCurrentPage ? shareToFacebook : undefined}
        rel="noreferrer"
      >
        <Facebook className={className} />
      </a>
      <a
        target="_blank"
        href={shareCurrentPage ? '#' : telegram}
        onClick={shareCurrentPage ? shareToTelegram : undefined}
        rel="noreferrer"
      >
        <Telegram className={className} />
      </a>
    </div>
  );
};

export default SocialIcons;