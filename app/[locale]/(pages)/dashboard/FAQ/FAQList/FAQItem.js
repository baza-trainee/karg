import React from 'react';
import PropTypes from 'prop-types';
import variables from '../../../../variables.module.scss';

export default function FAQItem(
    {
        containerStyle,
        basicInfoStyle,
        faqQuestion,
        faqAnswer,
        faqAnswerStyle,
        faqBlockStyle,
        faqLineStyle,
        iconsContainerStyle,
        children
    }) {

    return (
        <div className={containerStyle}>
            <div className={faqLineStyle}>
                <div className={`${basicInfoStyle} ${variables.font24w700}`}>{faqQuestion}</div>
                <div className={faqBlockStyle}>
                    <div className={`${faqAnswerStyle} ${variables.font20w500}`}>{faqAnswer}</div>
                </div>
                <div className={iconsContainerStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}
FAQItem.propTypes = {
    containerStyle: PropTypes.string,
    faqQuestion: PropTypes.string,
    faqAnswer: PropTypes.string,
    faqAnswerStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    basicInfoStyle: PropTypes.string,
    faqBlockStyle: PropTypes.string,
    faqLineStyle: PropTypes.string,
    iconsContainerStyle: PropTypes.string,
};

