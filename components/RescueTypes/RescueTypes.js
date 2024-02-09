import React from "react";
import Link from "next/link";
import { CardItem } from "../CardItem/CardItem";
import styles from "./styles/rescueTypes.module.scss";
import variables from "../../app/[locale]/variables.module.scss";
import ButtonAsLink from "../ButtonAsLink/buttonAsLink";

const titleRescueTypes = "Види рятувальних робіт";
const allActivities = "Дивитись усі";

export default function RescueTypes({ rescueTypes, isButtonAsLink = true }) {
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
              <div key={r.id} className={lastItemClass}>
                <CardItem
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
