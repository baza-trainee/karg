import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { getImageSrc } from '@/utils/base64ImageHandler';
export default function PetItem(
    {
        photoStyle,
        photoSrc = [],
        photoAlt,
        photoContainerStyle,
        petNameStyle,
        petCategoryStyle,
        petName,
        petCategory,
        petDetails,
        detailsStyle,
        detailsBlockStyle,
        petLineStyle,
        rescueStory,
        iconsContainerStyle,
        children
    }) {

    const processedPhotoSrc = photoSrc.length > 0 ? getImageSrc(photoSrc[0]) : null;
    
    return (
        <div className={petLineStyle}>
            <div className={photoContainerStyle}>
                {processedPhotoSrc && processedPhotoSrc.length > 0 ? (
                    <Image
                        src={processedPhotoSrc}
                        alt={photoAlt}
                        width={92}
                        height={92}
                        loading="lazy"
                        className={photoStyle}
                    />
                ) : (
                    <div className={photoStyle} aria-hidden="true"></div>
                )}
            </div>
            <div className={petNameStyle}>{petName}</div>
            <div className={petCategoryStyle}>{petCategory}</div>
            <div className={detailsBlockStyle}>
                <div className={detailsStyle}>{petDetails}</div>
            </div>
            <div className={detailsBlockStyle}>
                <div className={detailsStyle}>{rescueStory}</div>
            </div>
            <div className={iconsContainerStyle}>
                {children}
            </div>
        </div>
    )
}
PetItem.propTypes = {
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.array,
    photoAlt: PropTypes.string,
    petName: PropTypes.string,
    petNameStyle: PropTypes.string,
    petCategoryStyle: PropTypes.string,
    petDetails: PropTypes.string,
    detailsStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    detailsBlockStyle: PropTypes.string,
    petLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

