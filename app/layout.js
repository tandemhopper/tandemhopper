import './globals.css';
import './cms.css';
import './enhancements.css';
import './editorial.css';
import './launch.css';
import './calendar.css';
import './club-marks.css';
import { Analytics } from '@vercel/analytics/next';
import { Inter, Barlow_Condensed } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tandemhopper.de';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tandemhopper – Groundhopping & Fankultur',
    template: '%s | Tandemhopper',
  },
  description: 'Groundhopping, Fankultur, Stadien, Fanszenen und Fußballreisen – mit Berichten direkt aus den Kurven und von den Plätzen.',
  applicationName: 'Tandemhopper',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Tandemhopper',
    title: 'Tandemhopper – Groundhopping & Fankultur',
    description: 'Groundhopping, Fankultur, Stadien, Fanszenen und Fußballreisen – mit Berichten direkt aus den Kurven und von den Plätzen.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tandemhopper – Groundhopping & Fankultur',
    description: 'Groundhopping, Fankultur, Stadien, Fanszenen und Fußballreisen.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body style={{ '--body': inter.style.fontFamily, '--cond': barlowCondensed.style.fontFamily }}>
        {children}<Analytics />
      </body>
    </html>
  );
}
