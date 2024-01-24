import React from 'react'

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
    buttonIconStyle
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
      </div>
    </div>
  )
} 
