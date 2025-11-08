import React from 'react';
import ButtonAsLink from '../ButtonAsLink/buttonAsLink';
import styles from './styles/item.module.scss';

export function CardItem({
    cardTitle, 
    buttonHref, 
    cardImage, 
    buttonIcon,
    cardMessage,
    cardContainer,
    cardImageStyle,
    cardTextBlock,
    cardTitleStyle,
    cardMessageStyle,
    buttonText,
    buttonIconStyle,
    isButtonAsLink,
    buttonCaption,
    buttonStyle,
    buttonRoute 
 }) {

  return (
    <div className={cardContainer}>
        {cardImage &&  
        <Image
          className={cardImageStyle}
          src={cardImage}
          alt="Donate icon"
        />
        }
        <div className={cardTextBlock}>
          {cardTitle && 
              <p className={cardTitleStyle}>
                  {cardTitle}
              </p>
          }
          {cardMessage && 
              <p className={cardMessageStyle}>
                  {cardMessage}
              </p>
          } 
          {buttonHref &&
              <Link href = {buttonHref}>
                  <span>{buttonText}</span>
                      {buttonIcon ? 
                          <Image
                          className={buttonIconStyle}
                          src={buttonIcon}
                          alt="Button icon"
                      /> 
                      : null}
              </Link>
          }
          {isButtonAsLink &&
              <ButtonAsLink 
                buttonCaption={buttonCaption} 
                buttonStyle={buttonStyle}
                route={buttonRoute}
              />  
          }
            
      </div>
    </div>
  )
} 
