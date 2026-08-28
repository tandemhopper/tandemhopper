import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata={
  title:'Groundhopper-Kalender',
  description:'Der Tandemhopper-Kalender für Derbys, Jubiläen, Europapokal-Termine und besondere Spiele.',
  alternates:{canonical:'/kalender'},
  robots:{index:false,follow:true},
}

export default function Kalender(){
  return <><Header/><main className="calendar-page">
    <section className="calendar-head">
      <p className="eyebrow">GROUNDHOPPER-SERVICE</p>
      <h1>KALENDER</h1>
      <p>Hier sammeln wir künftig Spiele und Termine, bei denen sich aus Hopper- oder Fansicht genaueres Hinschauen lohnt: Derbys, Jubiläen, Europapokal-Fenster, Pokalrunden und andere Dinge, die man besser vor der Zugbuchung erfährt.</p>
    </section>
    <section className="calendar-foundation">
      <div><span>SPIELE</span><strong>Derbys &amp; besondere Paarungen</strong><p>Nicht nach Tabellenplatz, sondern danach, ob rundherum etwas Interessantes passieren könnte.</p></div>
      <div><span>TERMINE</span><strong>UEFA, FIFA &amp; Pokal</strong><p>Auslosungen, Spieltagsfenster und Wettbewerbsphasen, die für Reiseplanung relevant sind.</p></div>
      <div><span>ANLÄSSE</span><strong>Jubiläen &amp; besondere Tage</strong><p>Vereinsjubiläen, Stadionabschiede und andere Termine, die im normalen Spielplan leicht untergehen.</p></div>
    </section>
    <p className="calendar-note"><strong>Der Kalender wird gerade aufgebaut.</strong> Lieber eine gute Auswahl als die nächste vollständige Spielplandatenbank.</p>
  </main><Footer/></>
}
