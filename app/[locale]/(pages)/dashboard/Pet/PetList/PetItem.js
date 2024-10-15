import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import variables from '../../../../variables.module.scss';
export default function PetItem(
    {
        photoStyle,
        photoSrc = [],
        photoAlt,
        photoContainerStyle,
        basicInfoStyle,
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

    return (
        <div className={petLineStyle}>
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
            <div className={`${basicInfoStyle} ${variables.font24w700}`}>{petName}</div>
            <div className={`${basicInfoStyle} ${variables.font20w500}`}>{petCategory}</div>
            <div className={detailsBlockStyle}>
                <div className={`${detailsStyle} ${variables.font20w500}`}>{petDetails}</div>
            </div>
            <div className={detailsBlockStyle}>
                <div className={`${detailsStyle} ${variables.font20w500}`}>{rescueStory}</div>
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
    petDetails: PropTypes.string,
    detailsStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    basicInfoStyle: PropTypes.string,
    detailsBlockStyle: PropTypes.string,
    petLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

