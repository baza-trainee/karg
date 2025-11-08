import React from 'react';
import PropTypes from 'prop-types';
import variables from '../../../../variables.module.scss';

export default function ContactItem(
    {
        categoryStyle,
        contactCategory,
        contactValue,
        valueStyle,
        contactLineStyle,
        iconsContainerStyle,
        contactIconStyle,
        contactIcon,
        contactIconContainerStyle,
        children
    }) {

    return (
        <div className={contactLineStyle}>
            <div className={contactIconContainerStyle}>
                <div className={`${contactIconStyle}`}>{contactIcon}</div>
            </div>
            <div className={`${categoryStyle} ${variables.font24w700}`}>{contactCategory}</div>
            <div className={`${valueStyle} ${variables.font20w500}`}>{contactValue}</div>
            <div className={iconsContainerStyle}>
                {children}
            </div>
        </div>
    )
}
ContactItem.propTypes = {
    contactCategory: PropTypes.string,
    contactValue: PropTypes.string,
    contactAnswerStyle: PropTypes.string,
    valueStyle: PropTypes.string,
    categoryStyle: PropTypes.string,
    contactLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

