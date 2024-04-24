import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import variables from '../../../../variables.module.scss';
export default function PetItem(
    {
        containerStyle,
        photoStyle,
        photoSrc,
        photoAlt,
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
        <div className={containerStyle}>
            <div className={petLineStyle}>
                <Image
                    className={photoStyle}
                    src={photoSrc}
                    alt={photoAlt}
                    loading="lazy"
                />
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
        </div>
    )
}
PetItem.propTypes = {
    containerStyle: PropTypes.string,
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.object,
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

