import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
}

const photo = 'https://cdn.sanity.io/images/90kx3kio/production/4451dfe38884242b4885ae2259e571049cc50abb-3072x4080.jpg?w=1200&fit=max&auto=format&q=84'

export default function NotFound(){
  return <><Header/><main className="not-found">
    <div className="not-found-copy">
      <p className="eyebrow">404 · FALSCH ABGEBOGEN</p>
      <h1>DIESER GROUND EXISTIERT HIER NICHT.</h1>
      <p>Der Link ist falsch, die Geschichte wurde verschoben oder du hast den Ground zu früh verlassen.</p>
      <div className="not-found-links">
        <Link href="/">ZUR STARTSEITE →</Link>
        <Link href="/geschichten">ALLE GESCHICHTEN →</Link>
      </div>
    </div>
    <figure className="not-found-image">
      <img src={photo} alt="Zuschauer schauen durch und über einen Stadionzaun auf das Spielfeld." />
    </figure>
  </main><Footer/></>
}
