import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import variables from '../../../../variables.module.scss';
import { getImageSrc } from '@/utils/base64ImageHandler';

export default function StatsItem(
    {
        photoStyle,
        photoAlt,
        photoSrc = [],
        photoContainerStyle,
        basicInfoStyle,
        statTitle,
        statDetails,
        detailsStyle,
        statLineStyle,
        iconsContainerStyle,
        children
    }) {

    const processedPhotoSrc = photoSrc.length > 0 ? getImageSrc(photoSrc[0]) : null;

    return (
        <div className={statLineStyle}>
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
            <div className={`${basicInfoStyle} ${variables.font24w700}`}>{`${statTitle} рік`}</div>
            <div className={`${detailsStyle} ${variables.font20w500}`}>{statDetails}</div>
            <div className={iconsContainerStyle}>
                {children}
            </div>
        </div>
    )
}
StatsItem.propTypes = {
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.array,
    photoAlt: PropTypes.string,
    statTitle: PropTypes.string,
    statDetails: PropTypes.string,
    detailsStyle: PropTypes.string,
    basicInfoStyle: PropTypes.string,
    detailsBlockStyle: PropTypes.string,
    statLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

