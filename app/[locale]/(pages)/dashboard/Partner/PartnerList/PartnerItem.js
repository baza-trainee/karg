import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import variables from '../../../../variables.module.scss';

export default function PartnerItem(
    {
        containerStyle,
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
        <div className={containerStyle}>
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
                <div className={`${partnerNameStyle} ${variables.font24w700}`}>{partnerName}</div>
                <div className={`${partnerUriStyle} ${variables.font20w500}`}>{partnerUri}</div>
                <div className={iconsContainerStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}
PartnerItem.propTypes = {
    containerStyle: PropTypes.string,
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.array,
    photoAlt: PropTypes.string,
    petName: PropTypes.string,
    petDetails: PropTypes.string,
    detailsStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    basicInfoStyle: PropTypes.string,
    detailsBlockStyle: PropTypes.string,
    petLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

