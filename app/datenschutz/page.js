import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzhinweise für Tandemhopper.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
}

export default function Datenschutz(){
  return <><Header/><main className="legal-page">
    <p className="eyebrow">RECHTLICHES</p>
    <h1>DATENSCHUTZ</h1>
    <p className="legal-intro">Hier erklären wir möglichst verständlich, welche technischen Daten beim Besuch von Tandemhopper anfallen und wofür sie genutzt werden. Stand: 29. August 2026.</p>

    <section>
      <h2>1. Verantwortlicher</h2>
      <p><strong>Tandemhopper</strong><br/>Niederlande</p>
      <p className="legal-note">Die direkte Datenschutz-Kontaktadresse und die endgültige Betreiberangabe werden mit dem öffentlichen Start von tandemhopper.de ergänzt. Diese Seite ist bis dahin eine technische Vorabfassung.</p>
    </section>

    <section>
      <h2>2. Hosting über Vercel</h2>
      <p>Diese Website wird über Vercel bereitgestellt. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Verbindungs- und Nutzungsdaten. Dazu können insbesondere IP-Adresse, Zeitpunkt des Aufrufs, angeforderte Seite, Browser- und Geräteinformationen sowie technische Log- und Diagnosedaten gehören.</p>
      <p>Die Verarbeitung dient dem sicheren, stabilen und schnellen Betrieb der Website sowie der Fehler- und Missbrauchserkennung. Rechtsgrundlage ist unser berechtigtes Interesse an einem funktionsfähigen und sicheren Webangebot gemäß Art. 6 Abs. 1 lit. f DSGVO.</p>
      <p>Anbieter: Vercel Inc., USA. Weitere Informationen finden sich in der <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Datenschutzerklärung von Vercel</a>.</p>
    </section>

    <section>
      <h2>3. Vercel Web Analytics</h2>
      <p>Wir nutzen Vercel Web Analytics, um in zusammengefasster Form zu verstehen, wie häufig Tandemhopper besucht wird, welche Seiten aufgerufen werden und aus welchen Ländern, Geräten oder Verweisquellen die Zugriffe ungefähr kommen.</p>
      <p>In unserer aktuellen Konfiguration setzen wir dafür keine eigenen Analytics-Cookies. Wir verwenden die Auswertung nicht, um einzelne Besucher über mehrere Websites hinweg zu verfolgen oder persönliche Nutzerprofile aufzubauen.</p>
      <p>Die Reichweitenmessung erfolgt auf Grundlage unseres berechtigten Interesses, die Nutzung der Website zu verstehen und Inhalte technisch wie redaktionell sinnvoll weiterzuentwickeln (Art. 6 Abs. 1 lit. f DSGVO).</p>
    </section>

    <section>
      <h2>4. Inhalte und Bilder über Sanity</h2>
      <p>Artikel, Bildinformationen und weitere redaktionelle Inhalte werden mit dem Content-Management-System Sanity verwaltet. Ein Teil der Inhaltsabfragen erfolgt serverseitig. Bilder und andere Medien werden über das Sanity Asset CDN ausgeliefert. Beim Abruf solcher Dateien stellt dein Browser eine Verbindung zu Sanity bzw. dessen CDN her.</p>
      <p>Dabei können technisch notwendige Daten wie IP-Adresse, Zeitpunkt des Abrufs, Browserinformationen und die angeforderte Datei verarbeitet werden. Sanity gibt an, Ursprungs-IP-Adressen unter anderem zur Missbrauchs- und Angriffserkennung zu protokollieren.</p>
      <p>Anbieter: Sanity AS, Norwegen, und Sanity US Inc., USA. Weitere Informationen finden sich in der <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noreferrer">Datenschutzerklärung von Sanity</a>.</p>
    </section>

    <section>
      <h2>5. Externe Schriftarten</h2>
      <p>Die auf Tandemhopper verwendeten Schriftarten werden über die Website selbst ausgeliefert. Beim normalen Seitenaufruf wird dafür keine Verbindung zu Google Fonts hergestellt.</p>
    </section>

    <section>
      <h2>6. Social Media</h2>
      <p>Auf Tandemhopper befinden sich Links zu unseren Profilen bzw. Kanälen bei Instagram, Facebook, YouTube und WhatsApp. Es sind derzeit keine eingebetteten Social-Media-Plugins oder Feeds eingebaut. Eine Verbindung zum jeweiligen Anbieter entsteht erst, wenn du einen solchen externen Link aufrufst. Für die anschließende Datenverarbeitung gelten die Datenschutzbestimmungen des jeweiligen Netzwerks.</p>
    </section>

    <section>
      <h2>7. Speicherdauer</h2>
      <p>Wir speichern personenbezogene Daten nur so lange, wie sie für den jeweiligen Zweck erforderlich sind oder gesetzliche Pflichten dies verlangen. Für technische Protokoll- und Servicedaten gelten zusätzlich die jeweiligen Aufbewahrungs- und Löschregeln der eingesetzten Dienstleister.</p>
    </section>

    <section>
      <h2>8. Deine Rechte</h2>
      <p>Nach der DSGVO kannst du – soweit die jeweiligen Voraussetzungen vorliegen – Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung verlangen. Außerdem kannst du einer Verarbeitung auf Grundlage berechtigter Interessen widersprechen und dich bei einer zuständigen Datenschutzaufsichtsbehörde beschweren.</p>
      <p>Da Tandemhopper aus den Niederlanden betrieben wird, kommt insbesondere die niederländische Datenschutzaufsicht Autoriteit Persoonsgegevens als zuständige Aufsichtsbehörde in Betracht.</p>
    </section>

    <section>
      <h2>9. Änderungen</h2>
      <p>Wenn sich die Website technisch verändert – zum Beispiel durch neue Analyse-, Werbe-, Newsletter- oder Einbettungsdienste – passen wir diese Datenschutzhinweise entsprechend an.</p>
    </section>
  </main><Footer/></>
}
