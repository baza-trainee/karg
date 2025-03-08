'use client';

import { CardItem } from './CardItem/CardItem';
import styles from './styles/achievements.module.scss';
import variables from '../../app/[locale]/variables.module.scss';
import { useContactLinks } from '@/app/contactLinksProvider';

export default function ClientAchievements({ translations }) {
    const { statistic } = useContactLinks();

    const statisticsData = [
        { 'title': statistic[0] || translations.defaultValues[0], 'innerMessage': translations.messages[0] },
        { 'title': statistic[1] || translations.defaultValues[1], 'innerMessage': translations.messages[1] },
        { 'title': statistic[2] || translations.defaultValues[2], 'innerMessage': translations.messages[2] },
        { 'title': statistic[3] || translations.defaultValues[3], 'innerMessage': translations.messages[3] },
    ];

    return (
        <section className={styles.achievementBlock}>
            <div className={styles.innerBlock}>
                {statisticsData.map((d, index) => {
                    return (
                        <div key={index}>
                            <CardItem
                                title={d.title}
                                innerMessage={d.innerMessage}
                                cardStyle={styles.cardItem}
                                cardTextBlock={styles.achievementText}
                                cardTitleStyle={`${styles.title} ${variables.achievSubtitle2}`}
                                cardMessageStyle={`${styles.message} ${variables.achievText3}`}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}