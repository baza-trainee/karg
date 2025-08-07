import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import ScrollToTop from "@/components/common/ScrollToTop/scrollToTop";
import AnimalClient from "./AnimalClient";

const i18nNamespaces = ["uniCards", "advices", "common"];

export async function generateMetadata({ params }) {
    const { locale, id } = params;
    const isUkrainian = locale === "uk";
    const cultureCode = isUkrainian ? "ua" : "en";
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
        const response = await fetch(`${API_BASE_URL}api/animal/getbyid?id=${id}&cultureCode=${cultureCode}`);

        const animal = await response.json();

        const animalName = animal.name || (isUkrainian ? "Тварина" : "Animal");

        return {
            title: isUkrainian ? `Наші улюбленці - ${animalName}` : `Our favorites - ${animalName}`,
            alternates: {
                canonical: isUkrainian
                    ? `${API_BASE_URL}/animals/${id}`
                    : `${API_BASE_URL}/en/animals/${id}`,
            },
        };
    } catch (error) {
        console.error("Failed to fetch animal data for metadata", error);
        return {
            title: isUkrainian ? "Наші тварини" : "Our animals",
            alternates: {
                canonical: isUkrainian
                    ? `${API_BASE_URL}/animals`
                    : `${API_BASE_URL}/en/animals`,
            },
        };
    }
}

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
        returnToPortalButton: t('returnToPortalButton'),
        animalDesc: t('animalDesc')
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