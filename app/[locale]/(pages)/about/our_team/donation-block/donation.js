import styles from "../donation-block/donation.module.scss";
import variables from "@/app/[locale]/variables.module.scss";
import ButtonAsLinkAsLink from '@/components/ButtonAsLink/buttonAsLink';
import initTranslations from "../../../../../i18n";

const Donation = async ({ locale, namespaces }) => {
    const { t } = await initTranslations(locale, namespaces);

    return (
        <div className={styles.container}>
            <p className={`${styles.title} ${variables.subtitle3}`}>
                {t('donationBlock')}
            </p>
            <div className={`${styles.paymentSystems} ${variables.subtitle2}`}>
                <div className={styles.paymentItem}>PayPal</div>
                <div className={styles.paymentItem}>Monobank</div>
                <div className={styles.paymentItem}>Patreon</div>
            </div>
            <ButtonAsLinkAsLink route="/help" buttonCaption={t('common:buttonSupportText')} buttonStyle="button-support-donate-block" />
        </div>
    );
}

export default Donation;