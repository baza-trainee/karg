import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

const i18nNamespaces = ['advices', 'common'];

export default async function UsefulLayout ({children, params: { locale }}) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
 return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>        
        <Header/>
        <main>{children}</main>
        <Footer/>
    </TranslationsProvider>
 )
}
