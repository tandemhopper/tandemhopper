import './globals.css';
import './cms.css';
import './enhancements.css';
import './editorial.css';

export const metadata = {
  title: { default: 'Tandemhopper – Fußball dort, wo’s spannend wird.', template: '%s | Tandemhopper' },
  description: 'Groundhopping, Fankultur, Stadien und Fußballreisen.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
