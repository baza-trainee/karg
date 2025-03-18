import React from 'react';
import { CardItem } from '../CardItem/CardItem';
import styles from './styles/support.module.scss';
import variables from '../../app/[locale]/variables.module.scss';
import initTranslations from "../../app/i18n";

export default async function Support({ locale, namespaces }) {
    const { t } = await initTranslations(locale, namespaces);
    const localizedPath = (path) => locale === 'uk' ? path : `/${locale}${path}`;
    const supportTitle = t('supportTitle');
    const supportData = [
        { 'cardTitle': t('supportSubtitle1'), 'cardMessage': t('supportMessage1'), 'buttonText': t('supportButtonText1'), 'buttonRoute': localizedPath('/help'), id: 1 },
        { 'cardTitle': t('supportSubtitle2'), 'cardMessage': t('supportMessage2'), 'buttonText': t('supportButtonText2'), 'buttonRoute': localizedPath('/animals'), id: 2 },
    ];

    return (
        <div>
            <div className={styles.container}>
                <p className={styles.titleBlock}>
                    <span className={variables.w700_f20_f36_f44_subtitle_shared}>{supportTitle}</span>
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
