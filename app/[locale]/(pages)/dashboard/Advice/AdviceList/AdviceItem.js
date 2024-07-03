import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import variables from '../../../../variables.module.scss';
export default function AdviceItem(
    {
        containerStyle,
        photoStyle,
        photoAlt,
        photoSrc,
        photoContainerStyle,
        basicInfoStyle,
        adviceTitle,
        adviceDetails,
        detailsStyle,
        detailsBlockStyle,
        adviceLineStyle,
        iconsContainerStyle,
        children
    }) {

    return (
        <div className={containerStyle}>
            <div className={adviceLineStyle}>
                <div className={photoContainerStyle}>
                    {photoSrc ? (
                        <Image
                            src={photoSrc}
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
                <div className={detailsBlockStyle}>
                    <div className={`${detailsStyle} ${variables.font20w500}`}>{adviceDetails}</div>
                </div>
                <div className={iconsContainerStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}
AdviceItem.propTypes = {
    containerStyle: PropTypes.string,
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.string,
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

