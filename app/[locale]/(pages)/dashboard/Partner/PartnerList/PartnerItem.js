import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

export default function PartnerItem(
    {
        photoStyle,
        photoSrc = [],
        photoAlt,
        photoContainerStyle,
        partnerName,
        partnerNameStyle,
        partnerUri,
        partnerUriStyle,
        partnerLineStyle,
        iconsContainerStyle,
        children
    }) {

    return (
        <div className={partnerLineStyle}>
            <div className={photoContainerStyle}>
                {photoSrc && photoSrc.length > 0 ? (
                    <Image
                        src={photoSrc[0]}
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
            <div className={partnerNameStyle}>{partnerName}</div>
            <div className={partnerUriStyle}>{partnerUri}</div>
            <div className={iconsContainerStyle}>
                {children}
            </div>
        </div>
    )
}
PartnerItem.propTypes = {
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.array,
    photoAlt: PropTypes.string,
    photoContainerStyle: PropTypes.string,
    partnerName: PropTypes.string,
    partnerNameStyle: PropTypes.string,
    partnerUri: PropTypes.string,
    partnerUriStyle: PropTypes.string,
    partnerLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

