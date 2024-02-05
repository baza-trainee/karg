import React from "react";
import Link from "next/link";
import { CardItem } from "../CardItem/CardItem";
//import ButtonAsLink from '../ButtonAsLink/buttonAsLink';
import styles from "./styles/rescueTypes.module.scss";
import variables from "../../app/[locale]/variables.module.scss";
import ButtonAsLink from "../ButtonAsLink/buttonAsLink";

const titleRescueTypes = "Види рятувальних робіт";
const allActivities = "Дивитись усі";

const rescueTypes = [
  { cardMessage: "Зняття котів з дерев", id: 1 },
  { cardMessage: "Зняття котів з конструкцій будинків", id: 2 },
  { cardMessage: "Підняття тварин з колодязя, колектора, зливи", id: 3 },
  { cardMessage: "Порятунок котів з вентиляції", id: 4 },
];

export default function RescueTypes() {
  return (
    <div>
      <div className={styles.container}>
        <p className={styles.titleBlock}>
          <span className={`${variables.rescueSubtitle1}`}>
            {titleRescueTypes}
          </span>
        </p>

        <div className={styles.cardBlock}>
          {rescueTypes.map((r) => {
            return (
              <div key={r.id}>
                <CardItem
                  cardMessage={r.cardMessage}
                  cardContainer={styles.cardItem}
                  cardMessageStyle={`${styles.message} ${variables.rescueText1}`}
                />
              </div>
            );
          })}
        </div>
        {/* /about/rules_of_appeal  or  /about/applying_rules*/}
        <ButtonAsLink
          buttonStyle="rescue"
          buttonCaption={allActivities}
          route="/about/rules_of_appeal"
        />
      </div>
    </div>
  );
}
