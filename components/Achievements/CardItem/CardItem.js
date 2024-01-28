export function CardItem({
    title, 
    href, 
    label,
    iconSrc, 
    icon,
    innerMessage,
    cardStyle,
    cardImageStyle,
    cardTextBlock,
    cardTitleStyle,
    cardMessageStyle,
    buttonIconStyle
 }) {

  return (
    <div className={cardStyle}>
      {iconSrc ? 
      <Image
        className={cardImageStyle}
        src={iconSrc}
        alt="Donate icon"
      /> : null}
      <div className={cardTextBlock}>
        <p className={cardTitleStyle}>
          {title}
        </p>
        <p className={cardMessageStyle}>
          {innerMessage}
        </p>
        {href ?
            <Link href = {href}>
              <span>{label}</span>
              {
                icon ? 
                <Image
                className={buttonIconStyle}
                src={icon}
                alt="Button icon"
              /> : null
            }
           </Link> : null
        }
      </div>
    </div>
  )
} 