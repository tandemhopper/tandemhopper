import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CalendarExplorer from '../../components/calendar/CalendarExplorer'
import {getCalendarData} from '../../lib/calendar'

export const metadata = {
  title: 'Groundhopping-Spieltipps',
  description: 'Ausgewählte Derbys, Fanszenen, besondere Stadien und seltene Spiele: Tandemhoppers Spieltipps in einer chronologischen Übersicht.',
  alternates: {canonical: '/kalender'},
  robots: {index: false, follow: true},
}

export default async function Kalender() {
  const {matches} = await getCalendarData()

  return <>
    <Header />
    <main className="calendar-page">
      <section className="calendar-head">
        <p className="eyebrow">TANDEMHOPPER · GROUNDHOPPING-RADAR</p>
        <h1>SPIELTIPPS</h1>
        <p>Derbys, besondere Stadien und aktive Fanszenen. Unsere Auswahl statt eines vollständigen Spielplans – chronologisch sortiert, mit kurzen Gründen und Details für die Reiseplanung.</p>
      </section>
      <CalendarExplorer matches={matches} />
      <p className="calendar-note"><strong>Bewusst unvollständig.</strong> Fehlt ein Derby, ist das kein Datenfehler. Wir nehmen nur Spiele auf, bei denen wir einen konkreten Grund sehen, genauer hinzuschauen. Termine und Gästefanregeln vor der Reise bitte nochmals prüfen.</p>
    </main>
    <Footer />
  </>
}
