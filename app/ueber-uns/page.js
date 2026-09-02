import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from './about.module.css'

export const metadata={
  title:'Über Tandemhopper',
  description:'Tandemhopper steht für Groundhopping, Fankultur, Fußballreisen und Geschichten, die dort anfangen, wo die normale Spielberichterstattung oft aufhört.',
  alternates:{canonical:'/ueber-uns'},
  openGraph:{
    type:'website',
    locale:'de_DE',
    url:'/ueber-uns',
    siteName:'Tandemhopper',
    title:'Über Tandemhopper',
    description:'Groundhopping, Fankultur und Fußballreisen – mit persönlichem Blick, lokaler Recherche und Interesse an den Geschichten neben dem Platz.',
    images:[{url:'/assets/grounds-oldschool.jpg',alt:'Zuschauer an einem alten Fußballplatz'}],
  },
  twitter:{
    card:'summary_large_image',
    title:'Über Tandemhopper',
    description:'Groundhopping, Fankultur und Fußballreisen – mit Blick auf die Geschichten neben dem Platz.',
    images:['/assets/grounds-oldschool.jpg'],
  },
}

export default function About(){
  return <>
    <Header/>
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ÜBER TANDEMHOPPER</p>
          <h1>GEHT’S RAUS,<br/>SCHAUT’S FUSSBALL.</h1>
          <p className={styles.heroIntro}>Grounds sammeln. Hinschauen, was rundherum passiert. Geschichten erzählen.</p>
        </div>
        <div className={styles.heroImage}>
          <img src="/assets/grounds-oldschool.jpg" alt="Zuschauer an einem alten Fußballplatz"/>
        </div>
      </section>

      <section className={styles.intro}>
        <p className={styles.lead}>Tandemhopper ist mein Projekt rund um Groundhopping, Fankultur und Fußballreisen. Natürlich geht es um Stadien und Spiele. Mindestens genauso interessieren mich aber die Dinge daneben: Fanszenen, besondere Spieltage, ungewöhnliche Orte und Geschichten, die in keinem Liveticker auftauchen.</p>
        <div className={styles.split}>
          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>MEHR ALS EIN WEITERER GROUND</p>
            <h2>NICHT NUR ABHAKEN, WO ICH WAR.</h2>
            <p>Ich fahre zu großen Europapokalabenden genauso wie in Ligen, Regionen und Wettbewerbe, die in der üblichen Fußballberichterstattung kaum auftauchen.</p>
            <p>Mich interessiert nicht nur, dass irgendwo gespielt wird, sondern warum ein Spiel, ein Stadion oder eine Fanszene gerade interessant ist. Deshalb darf ein Bericht hier auch mal deutlich tiefer gehen als Groundnummer, Bierpreis und ein kurzer Satz zur Stimmung.</p>
          </div>
          <div className={styles.copyBlock}>
            <p className={styles.eyebrow}>WENN AM ANFANG EINE FRAGE STEHT</p>
            <h2>MANCHMAL WIRD AUS EINEM SPIEL EINE RECHERCHE.</h2>
            <p>Bei manchen Themen habe ich bewusst einen journalistischeren Anspruch. Dann steht am Anfang nicht unbedingt ein Spielplan, sondern eine Frage.</p>
            <p className={styles.question}>Was passiert dort gerade? Warum passiert es? Und was sagen die Menschen vor Ort dazu?</p>
            <p>Wenn es dafür sinnvoll ist, reise ich hin, suche lokale Quellen, spreche mit Leuten und versuche ein Bild zu bekommen, das über die schnelle Mainstream-Meldung hinausgeht – und auch über den klassischen Groundhopping-Bericht.</p>
          </div>
        </div>
      </section>

      <section className={styles.photoGrid} aria-label="Tandemhopper unterwegs">
        <figure>
          <img src="/assets/fans-close.jpg" alt="Dicht gefüllte Fußballkurve" loading="lazy" decoding="async"/>
          <figcaption>GROSSE KURVEN. KLEINE DETAILS.</figcaption>
        </figure>
        <figure>
          <img src="/assets/fankultur-pyro.jpg" alt="Fanszene mit Pyrotechnik" loading="lazy" decoding="async"/>
          <figcaption>FANKULTUR AUS NÄCHSTER NÄHE.</figcaption>
        </figure>
        <figure>
          <img src="/assets/unterwegs.jpg" alt="Fußballreise abseits der großen Arenen" loading="lazy" decoding="async"/>
          <figcaption>FUSSBALL DORT, WO NICHT JEDER HINSCHAUT.</figcaption>
        </figure>
      </section>

      <section className={styles.storyBlock}>
        <div>
          <p className={styles.storyLabel}>WER STECKT DAHINTER?</p>
          <p className={styles.statement}>KEIN GROSSES MEDIUM. KEINE REDAKTION.</p>
        </div>
        <div className={styles.storyText}>
          <p>Hinter Tandemhopper steckt ein persönliches Projekt. Das meiste entsteht unterwegs: Spielpläne durchforsten, Zugverbindungen zusammensetzen, fotografieren, recherchieren, schreiben – und gelegentlich feststellen, dass das interessanteste Spiel des Wochenendes selbstverständlich an einem Ort stattfindet, von dem sonntags kein Zug mehr zurückfährt.</p>
          <p>Von den Niederlanden aus geht es regelmäßig zu Fußballspielen in den Benelux-Ländern, Deutschland, Europa und darüber hinaus. Manche Reisen sind lange geplant. Andere beginnen mit einem Spiel, das am selben Morgen irgendwo aufgetaucht ist.</p>
          <p><strong>Der rote Faden bleibt derselbe:</strong> hinfahren, genau hinschauen und hinterher möglichst etwas erzählen, das man nicht schon überall gelesen hat.</p>
        </div>
      </section>

      <section className={styles.worldStrip} aria-label="Unterschiedliche Fußballwelten">
        <figure>
          <img src="/assets/green-pyro.jpg" alt="Aktive Fanszene mit Rauch und Farben" loading="lazy" decoding="async"/>
          <figcaption>FANSZENEN, DIE AUSSERHALB IHRER REGION OFT KAUM JEMAND SIEHT.</figcaption>
        </figure>
        <figure>
          <img src="/assets/denbosch.jpg" alt="Fußball und Fankultur in den Niederlanden" loading="lazy" decoding="async"/>
          <figcaption>BENELUX VOR DER HAUSTÜR – UND TROTZDEM VOLLER EIGENER GESCHICHTEN.</figcaption>
        </figure>
        <figure>
          <img src="/assets/nec-choreo.jpg" alt="Choreografie in einer Fußballkurve" loading="lazy" decoding="async"/>
          <figcaption>VOM EUROPAPOKAL BIS ZUM SPIEL, DAS SONST KAUM AUFMERKSAMKEIT BEKOMMT.</figcaption>
        </figure>
      </section>

      <section className={styles.formats}>
        <div className={styles.formatsHead}>
          <div>
            <p className={styles.eyebrow}>WAS DU HIER FINDEST</p>
            <h2>FUSSBALL HAT MEHR ALS EINE GUTE GESCHICHTE.</h2>
          </div>
          <p>Deshalb ist Tandemhopper bewusst nicht auf eine Liga, ein Land oder eine Art von Ground festgelegt. Interessant ist, was etwas zu erzählen hat – nicht, wie groß der Name auf dem Ticket ist.</p>
        </div>
        <div className={styles.formatGrid}>
          <article className={styles.formatCard}>
            <span className={styles.formatNo}>01</span>
            <h3>SPIELBERICHTE</h3>
            <p>Nicht zwingend Minute 1 bis 90. Lieber die Dinge, die einen Spieltag wirklich besonders gemacht haben.</p>
            <Link href="/geschichten?filter=spielbericht">BERICHTE LESEN →</Link>
          </article>
          <article className={styles.formatCard}>
            <span className={styles.formatNo}>02</span>
            <h3>FANKULTUR</h3>
            <p>Fanszenen, Ultras, Choreos, Pyro, Proteste und Entwicklungen – möglichst mit lokalen Quellen und Kontext.</p>
            <Link href="/geschichten?filter=fankultur">KURZMELDUNGEN →</Link>
          </article>
          <article className={styles.formatCard}>
            <span className={styles.formatNo}>03</span>
            <h3>GROUNDHOPPING</h3>
            <p>Alte Stadien, moderne Sportparks, untere Ligen, große Arenen und Plätze, für die sich der Umweg lohnt.</p>
            <Link href="/geschichten">GESCHICHTEN →</Link>
          </article>
          <article className={styles.formatCard}>
            <span className={styles.formatNo}>04</span>
            <h3>REISEN & RECHERCHE</h3>
            <p>Geschichten, für die manchmal etwas mehr nötig ist als eine Eintrittskarte und ein Haken in einer App.</p>
            <Link href="/geschichten?filter=reisen">REISEN →</Link>
          </article>
          <article className={styles.formatCard}>
            <span className={styles.formatNo}>05</span>
            <h3>KALENDER & TIPPS</h3>
            <p>Spiele, Termine und Wettbewerbe, die aus Groundhopping- oder Fankultur-Sicht einen zweiten Blick verdienen.</p>
            <Link href="/kalender">KALENDER ÖFFNEN →</Link>
          </article>
        </div>
      </section>

      <div className={styles.closingWrap}>
        <section className={styles.closing}>
          <div className={styles.closingGrid}>
            <div>
              <p className={styles.eyebrow}>NICHT FERTIG. SOLL ES AUCH NICHT SEIN.</p>
              <h2>TANDEMHOPPER<br/>SOLL SICH<br/>WEITERENTWICKELN.</h2>
              <p>Ich probiere neue Formate aus, möchte bei manchen Themen noch tiefer recherchieren und bewusst auch in Teile der Fußballwelt reisen, die sonst wenig Beachtung bekommen.</p>
            </div>
            <div className={styles.feedback}>
              <strong>FEEDBACK IST AUSDRÜCKLICH ERWÜNSCHT.</strong>
              <p>Wenn irgendwo etwas fehlt, eine Information falsch ist, ihr einen interessanten Hinweis habt oder findet, dass ein Thema einen zweiten Blick verdient: meldet euch.</p>
              <p className={styles.smallNote}>Die besten Geschichten beginnen schließlich nicht immer mit einem Spielplan.</p>
            </div>
          </div>
          <div className={styles.closingActions}>
            <Link href="/geschichten">GESCHICHTEN ENTDECKEN →</Link>
            <Link href="/kalender">KALENDER ÖFFNEN →</Link>
            <a href="https://www.instagram.com/tandemhopper/" target="_blank" rel="noreferrer">FEEDBACK AUF INSTAGRAM →</a>
            <a href="https://whatsapp.com/channel/0029Vb8tvGq29756PquCbC1F" target="_blank" rel="noreferrer">WHATSAPP-KANAL →</a>
          </div>
          <p className={styles.lastLine}>GEHT’S RAUS, SCHAUT’S FUSSBALL.</p>
        </section>
      </div>
    </main>
    <Footer/>
  </>
}
