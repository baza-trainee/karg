import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import variables from '../../../../variables.module.scss';
import { getImageSrc } from '@/utils/base64ImageHandler';
export default function AdviceItem(
    {
        containerStyle,
        photoStyle,
        photoAlt,
        photoSrc = [],
        photoContainerStyle,
        basicInfoStyle,
        adviceTitle,
        adviceDetails,
        detailsStyle,
        adviceLineStyle,
        iconsContainerStyle,
        children
    }) {

    const processedPhotoSrc = photoSrc.length > 0 ? getImageSrc(photoSrc[0]) : null;

    return (
        // <div className={containerStyle}>
        <div className={adviceLineStyle}>
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
            <div className={`${basicInfoStyle} ${variables.font24w700}`}>{adviceTitle}</div>
            <div className={`${detailsStyle} ${variables.font20w500}`}>{adviceDetails}</div>
            <div className={iconsContainerStyle}>
                {children}
            </div>
        </div>
        // </div>
    )
}
AdviceItem.propTypes = {
    containerStyle: PropTypes.string,
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.array,
    photoAlt: PropTypes.string,
    adviceTitle: PropTypes.string,
    adviceDetails: PropTypes.string,
    detailsStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    basicInfoStyle: PropTypes.string,
    detailsBlockStyle: PropTypes.string,
    adviceLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

