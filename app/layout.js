import { Manrope } from 'next/font/google';
import './globals.css';
import './variables.scss';

const manrope = Manrope(
  { 
    weight: ['300','400','700', '800'],
    subsets: ['latin', 'cyrillic'] 
  }
)

export const metadata = {
  title: 'KARG',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
