import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from "./styles/petList.module.scss";

export default function PetItem(
{
    containerStyle,
    photoStyle,
    photoSrc,
    photoAlt,
    nameStyle,
    petName,
    petDetails,
    detailsStyle,
    rescueStory,
    storyStyle,
    children
}) {
  return (
    <div>
        <div className={containerStyle}>
            <Image
                className={photoStyle}
                src={photoSrc}
                alt={photoAlt}
                loading="lazy"
            />
        <p className={nameStyle}>{petName}</p>
        <p className={detailsStyle}>{petDetails}</p>
        <p className={storyStyle}>{rescueStory}</p>
        <div className={styles.flex}>
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
    nameStyle: PropTypes.string,
    petName: PropTypes.string,
    petDetails: PropTypes.string,
    detailsStyle: PropTypes.string,
    rescueStory: PropTypes.string,
    storyStyle: PropTypes.string,
};

