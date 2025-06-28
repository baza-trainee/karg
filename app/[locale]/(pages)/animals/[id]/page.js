import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import AnimalClient from "./AnimalClient";

const i18nNamespaces = ["uniCards", "advices", "common"];

export const metadata = ({ locale }) => {
    const isUkrainian = locale === "uk";

    return {
        title: isUkrainian ? "Наші тварини" : "Our animals"
    };
};

const ItemAdvice = async ({ params: { locale, id } }) => {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    let cultureCode = (locale === "uk") ? "ua" : "en";
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const translations = {
        goBackButtonText: t('advices:goBackButtonText'),
        shareText: t('advices:shareText'),
        cardButtonText: t('cardButtonText'),
        cardLinkText: t('cardLinkText'),
        adoptionModalFormText: t('adoptionModalFormText'),
        cardAltText: t('cardAltText'),
        rescueHistoryText: t('rescueHistoryText'),
        actionButtonTransparentText: t('actionButtonTransparentText'),
        actionButtonBackgroundText: t('actionButtonBackgroundText'),
        adoptionModalHeadingText: t('adoptionModalHeadingText'),
        adoptionModalFormLabelText: t('adoptionModalFormLabelText'),
        adoptionModalFormPlaceholderText: t('adoptionModalFormPlaceholderText'),
        adoptionModalFormPhoneText: t('adoptionModalFormPhoneText'),
        adoptionModalFormPhonePlaceholderText: t('adoptionModalFormPhonePlaceholderText'),
        adoptionModalText_text: t('adoptionModalText_text'),
        adoptionModalButtonsText: t('adoptionModalButtonsText'),
        adoptionModalButtonsCancelText: t('adoptionModalButtonsCancelText'),
        infoModalSuccess: t('infoModalSuccess'),
        infoModalError: t('infoModalError'),
        returnToPortalButton: t('returnToPortalButton')
    };

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <Header />
            <main style={{ flex: 1 }}>
                <AnimalClient
                    id={id}
                    cultureCode={cultureCode}
                    API_BASE_URL={API_BASE_URL}
                    endpoint={'api/animal'}
                    translations={translations}
                />
            </main>
            <ScrollToTop />
            <Footer />
        </TranslationsProvider>
    );
};

export default ItemAdvice;