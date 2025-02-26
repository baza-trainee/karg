import React from 'react';
import PropTypes from 'prop-types';
import variables from '../../../../variables.module.scss';

export default function FAQItem(
    {
        basicInfoStyle,
        faqQuestion,
        faqAnswer,
        faqAnswerStyle,
        faqLineStyle,
        iconsContainerStyle,
        children
    }) {

    return (
            <div className={faqLineStyle}>
                <div className={`${basicInfoStyle} ${variables.font24w700}`}>{faqQuestion}</div>
                    <div className={`${faqAnswerStyle} ${variables.font20w500}`}>{faqAnswer}</div>
                <div className={iconsContainerStyle}>
                    {children}
                </div>
            </div>
    )
}
FAQItem.propTypes = {
    faqQuestion: PropTypes.string,
    faqAnswer: PropTypes.string,
    faqAnswerStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    basicInfoStyle: PropTypes.string,
    faqLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

