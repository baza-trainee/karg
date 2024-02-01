import React from 'react';
import { CardItem } from '../CardItem/CardItem';
import styles from './styles/support.module.scss';
import variables from '../../app/[locale]/variables.module.scss';

const supportTitle = 'Як підтримати нас';

const supportData = [
    { 'cardTitle': 'Фінансово', 'cardMessage': 'Кожний донат має значення', 'buttonText': 'Зробити внесок', 'buttonRoute': '/help', id: 1 },
    { 'cardTitle': 'Взяти тварину', 'cardMessage': 'Кожний улюбленець чекає на свій дім', 'buttonText': 'Взяти тварину', 'buttonRoute': '/animals', id: 2 },
];

export default function Support() {
    return (
        <div>
            <div className={styles.container}>
                <p className={styles.titleBlock}>
                    <span className={variables.supportSubtitle1}>{supportTitle}</span>
                </p>

                <div className={styles.cardBlock}>
                    {supportData.map((r) => {
                        return (
                            <div key={r.id}>
                                <CardItem
                                    cardContainer={styles.cardItemContainer}
                                    cardTextBlock={styles.cardTextBlock}
                                    cardTitle={r.cardTitle}
                                    cardTitleStyle={`${styles.title} ${variables.supportSubtitle2}`}
                                    cardMessage={r.cardMessage}
                                    isButtonAsLink={true}
                                    cardMessageStyle={`${styles.message} ${variables.supportText4}`}
                                    buttonCaption={r.buttonText}
                                    buttonStyle='support'
                                    buttonRoute={r.buttonRoute}
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
