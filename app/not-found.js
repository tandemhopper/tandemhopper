import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
}

export default function NotFound(){
  return <><Header/><main className="not-found">
    <p className="eyebrow">404 · FALSCH ABGEBOGEN</p>
    <h1>DIESER GROUND EXISTIERT HIER NICHT.</h1>
    <p>Der Link ist falsch, die Geschichte wurde verschoben oder du bist beim Hopping einmal zu früh ausgestiegen.</p>
    <div className="not-found-links">
      <Link href="/">ZUR STARTSEITE →</Link>
      <Link href="/geschichten">ALLE GESCHICHTEN →</Link>
    </div>
  </main><Footer/></>
}
