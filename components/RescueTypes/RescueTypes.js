import React from "react";
import { CardItem } from "../CardItem/CardItem";
import styles from "./styles/rescueTypes.module.scss";
import variables from "../../app/[locale]/variables.module.scss";
import ButtonAsLink from "../ButtonAsLink/buttonAsLink";
import initTranslations from "../../app/i18n";

export default async function RescueTypes({ locale, namespaces, rescueTypes, isButtonAsLink = true }) {
  const { t } = await initTranslations(locale, namespaces);
  const titleRescueTypes = t('common:rescueTypestytle');
  const allActivities = t('common:buttonOpenText');
  const isOdd = rescueTypes.length % 2 != 0;

  return (
    <div>
      <div className={styles.container}>
        <p className={styles.titleBlock}>
          <span className={`${variables.rescueSubtitle1}`}>
            {titleRescueTypes}
          </span>
        </p>

        <div className={styles.cardBlock}>
          {rescueTypes.map((r, index) => {
            const isLastItem = index === rescueTypes.length - 1;
            const lastItemClass = isOdd && isLastItem ? styles.lastOddItem : "";

            return (
              <div key={r.id} className={`${lastItemClass}`}>
                <CardItem
                  cardTextBlock={styles.cardTextBlock}
                  cardMessage={r.cardMessage}
                  cardContainer={styles.cardItem}
                  cardMessageStyle={`${styles.message} ${variables.rescueText1}`}
                  isButtonAsLink={isButtonAsLink}
                />
              </div>
            );
          })}
        </div>
        {isButtonAsLink && (
          <ButtonAsLink
            buttonStyle="rescue"
            buttonCaption={allActivities}
            route="/about/rules_of_appeal"
          />
        )}
      </div>
    </div>
  );
}

