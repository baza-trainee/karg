import { Manrope } from "next/font/google";
import "./globals.css";
import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { Providers } from "../providers";

const manrope = Manrope({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin", "cyrillic"],
});

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function generateMetadata({ params: { locale } }) {
  const isUkrainian = locale === "uk";

  return {
    title: {
      default: isUkrainian
        ? "Головна | Команда Порятунку Тварин"
        : "Main page | Kyiv Animal Rescue Group",
      template: isUkrainian
        ? "%s | Команда Порятунку Тварин"
        : "%s | Kyiv Animal Rescue Group",
    },
    description: isUkrainian
      ? "Порятунок тварин у Києві – допомагаємо котам, собакам, птахам і диким тваринам. 11 років рятуємо тварин. Якщо знайшли поранену тварину – звертайтесь!"
      : "Animal rescue in Kyiv – helping cats, dogs, birds, and wild animals. 11 years of saving animals. If you find an injured animal – contact us!",
    keywords: isUkrainian
      ? "порятунок тварин, допомога тваринам, порятунок тварин Київ, KARG, rescue animals, animal help"
      : "animal rescue, help animals, KARG, rescue animals, animal help",
    openGraph: {
      title: "Kyiv Animal Rescue Group",
      description: isUkrainian
        ? "Порятунок тварин у Києві – допомагаємо котам, собакам, птахам і диким тваринам. 11 років рятуємо тварин. Якщо знайшли поранену тварину – звертайтесь!"
        : "Animal rescue in Kyiv – helping cats, dogs, birds, and wild animals. 11 years of saving animals. If you find an injured animal – contact us!",
      type: "website",
      url: isUkrainian ? API_BASE_URL : `${API_BASE_URL}en`,
      locale: isUkrainian ? "uk_UA" : "en_US",
      localeAlternate: ["uk_UA", "en_US"],
      siteName: "Kyiv Animal Rescue Group",
      images: [
        {
          url: `${API_BASE_URL}opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: isUkrainian
            ? "Порятунок тварин | Kyiv Animal Rescue Group"
            : "Animal rescue | Kyiv Animal Rescue Group",
        },
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Kyiv Animal Rescue Group",
      description: isUkrainian
        ? "Порятунок тварин у Києві – допомагаємо котам, собакам, птахам і диким тваринам."
        : "Animal rescue in Kyiv – helping cats, dogs, birds, and wild animals.",
      images: [
        {
          url: `${API_BASE_URL}opengraph-image.png`,
          alt: isUkrainian
            ? "Порятунок тварин | Kyiv Animal Rescue Group"
            : "Animal rescue | Kyiv Animal Rescue Group",
        },
      ],
    },
    alternates: {
      canonical: isUkrainian ? API_BASE_URL : `${API_BASE_URL}en`,
      languages: {
        uk: API_BASE_URL,
        en: `${API_BASE_URL}en`,
      },
    },
  };
};

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={manrope.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
