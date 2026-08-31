import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CalendarExplorer from '../../components/calendar/CalendarExplorer'
import {getCalendarData} from '../../lib/calendar'

export const metadata = {
  title: 'Groundhopper-Kalender',
  description: 'Kuratierte Wettbewerbsphasen und besondere Spiele für Groundhopper, Fanszenen und Fußballreisen.',
  alternates: {canonical: '/kalender'},
  robots: {index: false, follow: true},
}

export default async function Kalender() {
  const {competitions, matches} = await getCalendarData()

  return <>
    <Header />
    <main className="calendar-page">
      <section className="calendar-head">
        <p className="eyebrow">GROUNDHOPPER-SERVICE</p>
        <h1>KALENDER</h1>
        <p>Wettbewerbsphasen und Spiele, die einen genaueren Blick wert sind. Keine vollständige Spielplandatenbank, sondern eine redaktionelle Auswahl für Leute, die ihre Fußballreisen nicht nach Tabellenplatz planen.</p>
      </section>

      <CalendarExplorer competitions={competitions} matches={matches} />

      <p className="calendar-note"><strong>Bewusst unvollständig.</strong> Ein fehlendes Derby ist kein Datenfehler. Wir nehmen nur Termine auf, bei denen wir aus Hopper- oder Fansicht einen konkreten Grund sehen, genauer hinzuschauen.</p>
    </main>
    <Footer />
  </>
}
