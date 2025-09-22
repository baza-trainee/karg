import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './fullScreenGallery.module.scss';
import { LeftIcon, RightIcon } from '@/public/assets/icons/imageCarousel';

const FullScreenGallery = ({
    images,
    API_BASE_URL,
    isOpen,
    onClose,
    initialIndex = 0
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handleNavigation('prev');
            if (e.key === 'ArrowRight') handleNavigation('next');
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, currentIndex]);

    if (!isOpen || !images || images.length === 0) return null;

    const handleNavigation = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex((currentIndex - 1 + images.length) % images.length);
        } else {
            setCurrentIndex((currentIndex + 1) % images.length);
        }
    };

    return (
        <div className={styles.fullScreenOverlay}>
            <button className={styles.closeButton} onClick={onClose}>
                ✕
            </button>

            <div className={styles.fullScreenContainer}>
                {images.length > 1 && (
                    <button
                        className={styles.navButton}
                        onClick={() => handleNavigation('prev')}
                    >
                        <LeftIcon />
                    </button>
                )}
                <div className={styles.imageContainer}>
                    <Image
                        src={`${API_BASE_URL}${images[currentIndex]}`}
                        alt="Full screen image"
                        fill
                        priority
                        sizes="100vw"
                        style={{ objectFit: 'contain' }}
                        quality={100}
                    />
                </div>

                {images.length > 1 && (
                    <button
                        className={styles.navButton}
                        onClick={() => handleNavigation('next')}
                    >
                        <RightIcon />
                    </button>
                )}
            </div>
            {images.length > 1 && (
                <div className={styles.thumbnailsContainer}>
                    {images.map((image, index) => (
                        <div
                            key={image}
                            className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <Image
                                src={`${API_BASE_URL}${image}`}
                                alt={`Thumbnail ${index + 1}`}
                                width={80}
                                height={80}
                                quality={70}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FullScreenGallery;