import React from 'react';
import PropTypes from 'prop-types';
import variables from '../../../../variables.module.scss';

export default function ContactItem(
    {
        basicInfoStyle,
        contactQuestion,
        contactAnswer,
        contactAnswerStyle,
        contactLineStyle,
        iconsContainerStyle,
        children
    }) {

    return (
        <div className={contactLineStyle}>
            <div className={`${basicInfoStyle} ${variables.font24w700}`}>{contactQuestion}</div>
            <div className={`${contactAnswerStyle} ${variables.font20w500}`}>{contactAnswer}</div>
            <div className={iconsContainerStyle}>
                {children}
            </div>
        </div>
    )
}
ContactItem.propTypes = {
    contactQuestion: PropTypes.string,
    contactAnswer: PropTypes.string,
    contactAnswerStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    basicInfoStyle: PropTypes.string,
    contactLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

