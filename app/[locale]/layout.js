import { Manrope } from "next/font/google";
import "./globals.css";
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';

const manrope = Manrope({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "KARG",
  description: "Generated by create next app",
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  );
}
