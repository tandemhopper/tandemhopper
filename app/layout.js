import './globals.css';
import './cms.css';
import './enhancements.css';
import './editorial.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tandemhopper.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tandemhopper – Groundhopping & Fankultur',
    template: '%s | Tandemhopper',
  },
  description: 'Groundhopping, Fankultur, Stadien, Fanszenen und Fußballreisen – mit Berichten direkt aus den Kurven und von den Plätzen.',
  applicationName: 'Tandemhopper',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: '/',
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
      <body>{children}</body>
    </html>
  );
}
