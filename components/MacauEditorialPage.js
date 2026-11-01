import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'

const base = '/assets/laender/macau-'

function Photo({name,alt,caption,wide=false}) {
  return <figure className={'th-photo'+(wide?' th-photo-wide':'')}>
    <img src={base+name+'.webp'} alt={alt} loading="lazy" decoding="async"/>
    {caption&&<figcaption>{caption}</figcaption>}
  </figure>
}

function Chapter({id,number,label,title,children}) {
  return <section className="th-chapter" id={id}>
    <span className="th-chapter-number">{number} / {label}</span>
    <h2>{title}</h2>
    {children}
  </section>
}

function TextLink({href,children}) {return <a className="th-source-link" href={href} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true"> ↗</span></a>}

const links = [
  ['FIFA-Weltrangliste','https://inside.fifa.com/fifa-rankings/world-ranking/MAC'],
  ['Liga und Spielpläne (Macau Football)','https://www.macaufootball.com/eng/league-d1/2026'],
  ['Macau Tourism – Bus & LRT','https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation'],
  ['Macau Tourism – Grenzübergänge','https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/ports-of-entry'],
  ['Macau Government – Canidrome-Umbau (2026)','https://www.gcs.gov.mo/news/detail/pt/N26AWONP9G'],
  ['Macao News – Bauphasen Lin Fong / Canidrome','https://macaonews.org/news/city/macau-sports-complex-former-canidrome-redevelopment-macao/'],
]

export default function MacauEditorialPage() {
  return <><Header/><main className="th-country">
    <nav className="th-breadcrumb" aria-label="Brotkrumennavigation"><Link href="/laender">LÄNDERKOMPASS</Link><span>/</span><span>ASIEN</span><span>/</span><strong>MACAU</strong><i/><span>GUIDE 01</span></nav>
    <header className="th-hero">
      <div className="th-hero-copy">
        <p className="th-eyebrow">OSTASIEN · LÄNDERKOMPASS</p>
        <h1>MACAU<span>.</span></h1>
        <p className="th-hero-deck">Fußball zwischen Hochhäusern und Casinowelten.</p>
        <div className="th-hero-meta"><span>GROUNDHOPPING-GUIDE</span><span>STAND 11/2026</span></div>
      </div>
      <figure className="th-hero-photo"><img src={base+'olympic-v2.webp'} alt="Olympic Sports Centre am Abend mit leuchtendem Galaxy Macau im Hintergrund" fetchPriority="high"/><figcaption>Olympic Sports Centre · Taipa</figcaption></figure>
    </header>
    <div className="th-facts" aria-label="Macau auf einen Blick">
      <div><span>FIFA-RANGLISTE · MÄNNER</span><strong>193. Platz</strong><small>Stand: 07.10.2026</small></div>
      <div><span>FUSSBALLVERBAND</span><strong>Macau FA</strong><small>Eigenständiges FIFA-Mitglied</small></div>
      <div><span>WÄHRUNG</span><strong>Macau-Pataca</strong><small>MOP · oft auch HKD</small></div>
      <div><span>BUS · BARZAHLUNG</span><strong>6 MOP</strong><small>Passend bezahlen, kein Rückgeld</small></div>
    </div>

    <section className="th-intro">
      <h2>CASINOS, GRENZEN UND <em>ZWEI BESONDERE GROUNDS.</em></h2>
      <div><p>Macau ist eine Sonderverwaltungszone Chinas – mit eigenem Fußballverband, eigener Nationalmannschaft und einem Ligaalltag vor meist ziemlich überschaubaren Kulissen.</p><p>Zwischen den gigantischen Casinoresorts und den dicht bebauten Wohnvierteln liegen zwei bemerkenswerte Fußballorte: das Olympic Sports Centre auf Taipa und das Lin Fong Stadium neben der ehemaligen Hunderennbahn Canidrome.</p></div>
    </section>

    <aside className="th-critical">
      <div><p className="th-eyebrow">DER WICHTIGSTE REISETIPP</p><h2>BARGELD MITNEHMEN. WIRKLICH.</h2></div>
      <div><p>Alipay und WeChat funktionierten bei beiden Reisen mit den für ausländische Touristen eingerichteten Zugängen vielerorts nicht – obwohl das Bezahlen damit in Festlandchina problemlos möglich war. Auch Visa und Mastercard wurden in kleineren Geschäften nicht immer akzeptiert.</p><p>Gerade im Linienbus braucht man Münzen: <strong>6 MOP pro Fahrt, kein Wechselgeld.</strong> Hongkong-Dollar werden vielerorts akzeptiert, der Wechselkurs ist aber nicht unbedingt günstig.</p></div>
    </aside>

    <div className="th-content-layout">
      <nav className="th-sticky-nav" aria-label="Inhaltsverzeichnis"><strong>DIREKT ZUM THEMA</strong>
        <a href="#stadien"><span>01</span> Die Stadien</a>
        <a href="#spiele"><span>02</span> Spielplanung</a>
        <a href="#anreise"><span>03</span> Anreise & Verkehr</a>
        <a href="#stadt"><span>04</span> Stadt & weitere Grounds</a>
        <a href="#quellen"><span>05</span> Quellen & Stand</a>
      </nav>
      <div className="th-chapters">
        <Chapter id="stadien" number="01" label="STADIEN & GROUNDS" title="ZWEI PLÄTZE, DIE ES SO NICHT OFT GIBT.">
          <p className="th-lead">Das große Stadion hat die Casinos im Hintergrund. Beim kleineren Platz steht ein ehemaliges Hunderennstadion daneben. Macau bietet ungewöhnliche Kulissen – aber nicht automatisch interessante Spiele.</p>
          <h3>Olympic Sports Centre · Taipa</h3>
          <p>Das Olympic Sports Centre ist schon wegen seiner Umgebung interessant: Hinter den Tribünen ragt das beleuchtete Galaxy Macau auf. Besonders in der Dämmerung ist die Kombination aus Laufbahn, Fußballfeld und Casinohochhäusern ziemlich speziell. Dort werden unter anderem internationale Spiele ausgetragen, gelegentlich auch Ligapartien.</p>
          <Photo name="olympic-v2" alt="Laufbahn und Fußballfeld im Olympic Sports Centre vor dem beleuchteten Galaxy Casino" caption="Olympic Sports Centre mit Galaxy Macau im Hintergrund. Der Blick von der Tribüne lohnt sich besonders am Abend." wide/>
          <p className="th-inline-tip"><strong>FOTOTIPP</strong> Das Spielfeld so fotografieren, dass das Galaxy Macau hinter dem Stadion zu sehen ist. Die LRT hält in der Nähe.</p>
          <h3>Lin Fong Stadium & das ehemalige Canidrome</h3>
          <p>Hier spielt Fußball in einer ganz anderen Größenordnung. Beim Ligaspiel MUST IPO gegen Benfica Macau Anfang 2025 waren ungefähr 20 bis 30 Menschen auf den Rängen. Von einer organisierten Fanszene war wenig zu sehen – dafür gab es alte Tribünen und die Kulisse der Wohnhochhäuser.</p>
          <p>Direkt neben dem Lin Fong Sports Centre liegt das Areal des früheren Canidrome. Bis 2018 wurden dort Windhundrennen ausgetragen. Anfang 2025 waren noch Überreste der Rennbahn, alte Anlagen und der markante Eingangsbereich zu sehen.</p>
          <div className="th-photo-pair">
            <Photo name="linfong-v2" alt="Ligaspiel im Lin Fong Stadium mit Wohnhochhäusern und Flutlicht" caption="Lin Fong Stadium, Ligaspiel Anfang 2025."/>
            <Photo name="canidrome-gate" alt="Historischer Eingangsbogen zum ehemaligen Macau Canidrome" caption="Der alte Canidrome-Eingang, aufgenommen 2025."/>
          </div>
          <div className="th-photo-pair th-photo-pair-small">
            <Photo name="canidrome-stands" alt="Alte Tribünen und Laufbahn des ehemaligen Canidrome" caption="Alte Anlagen der ehemaligen Hunderennbahn, 2025."/>
            <Photo name="canidrome-structure" alt="Historische Strukturen am ehemaligen Canidrome" caption="Ein Blick auf die historischen Strukturen, 2025."/>
          </div>
          <aside className="th-update"><strong>WICHTIG: UMBAU SEIT 2026</strong><p>Auf dem ehemaligen Canidrome-Gelände laufen seit Januar 2026 Bauarbeiten für einen Sportpark. Die Bilder zeigen deshalb <b>ausdrücklich den Zustand von 2025</b>. Das angrenzende Lin Fong Sports Centre ist nach der Projektplanung erst von einer späteren Bauphase betroffen. Dennoch unbedingt vor der Anreise prüfen, ob dort gespielt wird und welcher Zugang möglich ist.</p><TextLink href="https://www.gcs.gov.mo/news/detail/pt/N26AWONP9G">Offizielle Mitteilung zum Baubeginn</TextLink></aside>
        </Chapter>

        <Chapter id="spiele" number="02" label="SPIELPLANUNG" title="WAS SICH LOHNT – UND WAS NICHT.">
          <p>Macau ist kein Reiseziel für große Ligachoreografien oder volle Gästeblöcke. Wer einen Länderpunkt machen möchte, sollte zuerst auf den tatsächlichen Austragungsort achten und erst danach auf die Paarung.</p>
          <div className="th-option"><span>01</span><div><h3>Ein Heimländerspiel</h3><p>Die reizvollste Option, besonders wenn Hongkong der Gegner wäre. Ein solches Spiel ist aber nicht jährlich garantiert. Termin und Stadion müssen bestätigt sein.</p></div></div>
          <div className="th-option"><span>02</span><div><h3>Eine Partie der Macau League</h3><p>Ein Spiel mit bestätigtem Austragungsort reicht für einen Länderpunkt. Doppelspieltage sind möglich, kurzfristige Verlegungen ebenso. Die Liga folgt keinem europäischen Herbst-Frühjahrs-Spielplan.</p></div></div>
          <div className="th-option"><span>03</span><div><h3>Benfica oder ein ungewöhnliches Vereinsduell</h3><p>Benfica Macau spielt in der höchsten Liga. Ein mögliches Duell mit Sporting klingt nach kleinem „Lissabon-Derby“, ist aber <b>kein sicher planbares Highlight</b>: Sporting gehörte 2026 nicht zum Erstligafeld. Erst bei einer tatsächlich angesetzten Partie lohnt sich die weitere Planung.</p></div></div>
          <div className="th-detail-note"><strong>SPIELPLAN CHECKEN</strong><p>Spielplanseiten und Vereinskanäle gegenprüfen – gerade chinesischsprachige Meldungen können aktueller sein. Kostenfreier Einlass ist bei kleinen Spielen möglich, aber nicht grundsätzlich garantiert.</p><TextLink href="https://www.macaufootball.com/eng/league-d1/2026">Macau League 2026 · Spielplan und Tabelle</TextLink></div>
        </Chapter>

        <Chapter id="anreise" number="03" label="REISEPLANUNG" title="ANREISE, GRENZEN UND VERKEHR.">
          <p className="th-lead">Macau lässt sich gut mit Hongkong oder Zhuhai verbinden. Bei einem späten Anstoß kann allerdings der Rückweg die eigentliche Herausforderung sein.</p>
          <div className="th-trip-grid">
            <section><h3>Aus Hongkong</h3><p>Per Fähre oder über die Hongkong–Zhuhai–Macau-Brücke mit dem Bus. Für einen Tagesausflug reichen die Entfernungen aus, wenn die Rückfahrt zeitlich zum Spiel passt. Bei der Route unbedingt die konkreten Abfahrts- und Ankunftsterminals beachten.</p><TextLink href="https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/travelling-to-macao">Offizielle Anreiseinformationen</TextLink></section>
            <section><h3>Aus Zhuhai</h3><p>Zhuhai bietet oft günstigere Unterkünfte. Der Grenzübergang Gongbei / Portas do Cerco ist täglich <b>06:00–01:00 Uhr</b> geöffnet – nicht rund um die Uhr. Bei späten Spielen alternative Übergänge und die Einreisebestimmungen für Festlandchina prüfen.</p><TextLink href="https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/ports-of-entry">Grenzübergänge & Öffnungszeiten</TextLink></section>
          </div>
          <div className="th-photo-pair">
            <Photo name="gongbei" alt="Grenzgebäude Gongbei an der Grenze zwischen Macau und Zhuhai" caption="Gongbei / Portas do Cerco: praktisch, aber nicht 24 Stunden geöffnet."/>
            <Photo name="lrt" alt="Aufgeständerte Macau Light Rapid Transit bei Nacht" caption="Die aufgeständerte LRT auf Taipa."/>
          </div>
          <div className="th-trip-grid">
            <section><h3>Bus, LRT & Casino-Shuttles</h3><p>Der Linienbus kostet bei Barzahlung 6 MOP ohne Wechselgeld. Die Macau Pass-Karte kann bei längeren Aufenthalten sinnvoll sein. Die LRT erschließt Teile von Taipa und Cotai. Viele Casinoresorts betreiben kostenlose Shuttlebusse zu wichtigen Ankunftspunkten; Fahrwege können sich ändern.</p><TextLink href="https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation">Öffentlicher Verkehr</TextLink></section>
            <section><h3>SIM, Internet & Einreise</h3><p>Ein Festlandchina-Tarif gilt nicht automatisch in Macau. Roaming oder eine passende regionale eSIM sind die verlässlichere Planung. Macau hat eigene Einreisebestimmungen und Grenzkontrollen; deutsche Reisende sollten aktuelle Vorgaben vorab prüfen.</p><TextLink href="https://www.gov.mo/en/services/ps-1474/ps-1474b/">Offizielle Einreiseinformationen</TextLink></section>
          </div>
        </Chapter>

        <Chapter id="stadt" number="04" label="ABSEITS DES SPIELFELDS" title="ZWISCHEN CASINORESORTS UND ALTER STADT.">
          <p>Die schmalen Straßen der Altstadt, die Ruinen von St. Paul und die dicht gedrängten Wohnviertel liegen nicht weit von Casinowelten entfernt, in denen man sich plötzlich zwischen künstlichen Kanälen, Gondeln und Nachbauten europäischer Wahrzeichen bewegt.</p>
          <div className="th-photo-pair th-photo-pair-city">
            <Photo name="wynn" alt="Wasserspiele und Gondel am Wynn Palace in Macau bei Nacht" caption="Wynn Palace: Gondel und Wasserfontänen in Cotai."/>
            <Photo name="skyline" alt="Dichte Wohnbebauung mit Hochhäusern in Macau" caption="Die Wohnviertel Macaus wirken deutlich weniger glattpoliert."/>
          </div>
          <div className="th-photo-pair th-photo-pair-small">
            <Photo name="grandlisboa" alt="Grand Lisboa Casino zwischen Wohnhäusern in Macau" caption="Grand Lisboa zwischen den Häusern der Altstadt."/>
            <Photo name="lotus" alt="Lotuskunstwerk und historische Stadtbebauung in Macau" caption="Eine andere Seite Macaus abseits der Stadien."/>
          </div>
          <h3>Weitere Grounds</h3><p>An Universitäten und in Wohnvierteln gibt es kleinere Sportplätze, darunter Anlagen der Macau University of Science and Technology. Solche Grounds kommen nur infrage, wenn dort tatsächlich ein Spiel bestätigt ist. Auch das ehemalige Hippodrom des Macau Jockey Club gehört zur ungewöhnlichen, inzwischen verschwundenen Sportgeschichte der Stadt.</p>
        </Chapter>

        <section className="th-sources" id="quellen"><h2>QUELLEN & AKTUALITÄT</h2><p>Letzte inhaltliche Prüfung: 1. November 2026. Bei Grenzzeiten, Spielorten, Spielplänen, Eintrittsregeln und Umbauarbeiten gilt stets der neueste Stand der jeweiligen Veranstalter und Behörden. Die historischen Canidrome-Fotos stammen aus 2025.</p><div>{links.map(([label,url])=><TextLink key={url} href={url}>{label}</TextLink>)}</div></section>
      </div>
    </div>
    <div className="th-endbar"><Link href="/laender">← ZUR LÄNDERÜBERSICHT</Link><span>MACAU · LÄNDERKOMPASS</span></div>
  </main><Footer/></>
}