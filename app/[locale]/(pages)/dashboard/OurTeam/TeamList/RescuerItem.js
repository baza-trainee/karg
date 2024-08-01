import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import variables from '../../../../variables.module.scss';
export default function RescuerItem(
    {
        containerStyle,
        photoStyle,
        photoAlt,
        photoSrc = [],
        photoContainerStyle,
        rescuerFullname,
        rescuerPhone,
        phoneStyle,
        fullnameStyle,
        rescuerLineStyle,
        iconsContainerStyle,
        children
    }) {

    return (
        <div className={containerStyle}>
            <div className={rescuerLineStyle}>
                <div className={photoContainerStyle}>
                    {photoSrc && photoAlt.length > 0 ? (
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
                <div className={`${fullnameStyle} ${variables.font20w500}`}>{rescuerFullname}</div>

                <div className={`${phoneStyle} ${variables.font20w500}`}>{rescuerPhone}</div>

                <div className={iconsContainerStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}
RescuerItem.propTypes = {
    containerStyle: PropTypes.string,
    photoStyle: PropTypes.string,
    photoSrc: PropTypes.array,
    photoAlt: PropTypes.string,
    rescuerFullName: PropTypes.string,
    rescuerPhone: PropTypes.string,
    phoneStyle: PropTypes.string,
    rescuerLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

