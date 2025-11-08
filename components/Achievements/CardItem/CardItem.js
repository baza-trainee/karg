import styles from './styles/cardItem.module.scss';

export function CardItem({
    title, 
    href, 
    label,
    iconSrc, 
    icon,
    innerMessage,
    cardStyle,
    cardImageStyle,
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
      <div className={styles.cardTextBlock}>
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