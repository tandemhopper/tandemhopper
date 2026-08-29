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
      <p className="legal-note">Tandemhopper wird derzeit als nicht-kommerzielles redaktionelles Hobbyprojekt betrieben. Eine KVK- oder Umsatzsteuerangabe besteht derzeit nicht.</p>
    </section>

    <section>
      <h2>2. Hosting über Vercel</h2>
      <p>Diese Website wird über Vercel bereitgestellt. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Verbindungs- und Nutzungsdaten. Dazu können insbesondere IP-Adresse, Zeitpunkt des Aufrufs, angeforderte Seite, Browser- und Geräteinformationen sowie technische Log- und Diagnosedaten gehören.</p>
      <p>Die Verarbeitung dient dem sicheren, stabilen und schnellen Betrieb der Website sowie der Fehler- und Missbrauchserkennung. Rechtsgrundlage ist unser berechtigtes Interesse an einem funktionsfähigen und sicheren Webangebot gemäß Art. 6 Abs. 1 lit. f DSGVO.</p>
      <p>Vercel verarbeitet Daten auch in den USA. Soweit dafür ein internationaler Datentransfer erforderlich ist, sieht Vercels Data Processing Addendum anwendbare Transfermechanismen nach den Datenschutzgesetzen vor, insbesondere anerkannte Rahmenwerke und Standardvertragsklauseln.</p>
      <p>Anbieter: Vercel Inc., USA. Weitere Informationen finden sich in der <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Datenschutzerklärung von Vercel</a> und im <a href="https://vercel.com/legal/dpa" target="_blank" rel="noreferrer">Data Processing Addendum</a>.</p>
    </section>

    <section>
      <h2>3. Vercel Web Analytics</h2>
      <p>Wir nutzen Vercel Web Analytics, um in zusammengefasster Form zu verstehen, wie häufig Tandemhopper besucht wird, welche Seiten aufgerufen werden und aus welchen Ländern, Geräten oder Verweisquellen die Zugriffe ungefähr kommen.</p>
      <p>Vercel Web Analytics verwendet nach Angaben von Vercel keine Cookies. Besucher werden über einen aus der eingehenden Anfrage erzeugten Hash unterschieden, der täglich zurückgesetzt wird. Die Analytics-Daten werden aggregiert ausgewertet und laut Vercel nicht mit einer einzelnen Person oder IP-Adresse verknüpft. Eine sitzungsübergreifende Verfolgung über verschiedene Websites hinweg findet damit nicht statt.</p>
      <p>Die Reichweitenmessung erfolgt auf Grundlage unseres berechtigten Interesses, die Nutzung der Website zu verstehen und Inhalte technisch wie redaktionell sinnvoll weiterzuentwickeln (Art. 6 Abs. 1 lit. f DSGVO).</p>
      <p>Weitere Informationen zur Funktionsweise finden sich in den <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">Datenschutzhinweisen zu Vercel Web Analytics</a>.</p>
    </section>

    <section>
      <h2>4. Inhalte und Bilder über Sanity</h2>
      <p>Artikel, Bildinformationen und weitere redaktionelle Inhalte werden mit dem Content-Management-System Sanity verwaltet. Ein Teil der Inhaltsabfragen erfolgt serverseitig. Bilder und andere Medien werden über das Sanity Asset CDN ausgeliefert. Beim Abruf solcher Dateien stellt dein Browser eine Verbindung zu Sanity bzw. dessen CDN her.</p>
      <p>Dabei können technisch notwendige Daten wie IP-Adresse, Zeitpunkt des Abrufs, Browserinformationen und die angeforderte Datei verarbeitet werden. Sanity gibt an, Ursprungs-IP-Adressen unter anderem zur Missbrauchs- und Angriffserkennung zu protokollieren.</p>
      <p>Sanity kann Daten auch außerhalb des Europäischen Wirtschaftsraums verarbeiten. Das Data Processing Addendum von Sanity sieht hierfür – soweit erforderlich – Angemessenheitsbeschlüsse, anerkannte Zertifizierungs- oder Transfermechanismen sowie die EU-Standardvertragsklauseln vor.</p>
      <p>Anbieter: Sanity AS, Norwegen, und Sanity US Inc., USA. Weitere Informationen finden sich in der <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noreferrer">Datenschutzerklärung von Sanity</a> und im <a href="https://www.sanity.io/legal/dpa" target="_blank" rel="noreferrer">Data Processing Addendum</a>.</p>
    </section>

    <section>
      <h2>5. Redaktionelle und journalistische Inhalte</h2>
      <p>Tandemhopper veröffentlicht redaktionelle Berichte, Fotos und Informationen über Fußball, Stadien und Fankultur. Soweit dabei personenbezogene Daten ausschließlich zu journalistischen Zwecken verarbeitet werden, können nach Art. 43 der niederländischen Uitvoeringswet AVG besondere Ausnahmen von einzelnen Vorschriften der DSGVO gelten. Sie dienen dem Ausgleich zwischen Datenschutz und Meinungs- und Informationsfreiheit.</p>
      <p>Diese journalistischen Ausnahmen gelten nicht automatisch für jede technische Verarbeitung auf der Website. Hosting- und Reichweitendaten behandeln wir deshalb gesondert in diesen Datenschutzhinweisen.</p>
    </section>

    <section>
      <h2>6. Schriftarten</h2>
      <p>Die auf Tandemhopper verwendeten Schriftarten werden über die Website selbst ausgeliefert. Beim normalen Seitenaufruf wird dafür keine Verbindung zu Google Fonts hergestellt.</p>
    </section>

    <section>
      <h2>7. Social Media</h2>
      <p>Auf Tandemhopper befinden sich Links zu unseren Profilen bzw. Kanälen bei Instagram, Facebook, YouTube und WhatsApp. Es sind derzeit keine eingebetteten Social-Media-Plugins oder Feeds eingebaut. Eine Verbindung zum jeweiligen Anbieter entsteht erst, wenn du einen solchen externen Link aufrufst. Für die anschließende Datenverarbeitung gelten die Datenschutzbestimmungen des jeweiligen Netzwerks.</p>
    </section>

    <section>
      <h2>8. Speicherdauer</h2>
      <p>Wir speichern personenbezogene Daten nur so lange, wie sie für den jeweiligen Zweck erforderlich sind oder gesetzliche Pflichten dies verlangen. Für technische Protokoll- und Servicedaten gelten zusätzlich die jeweiligen Aufbewahrungs- und Löschregeln der eingesetzten Dienstleister. Der von Vercel Web Analytics zur Besucherunterscheidung verwendete Hash wird nach Angaben von Vercel täglich zurückgesetzt.</p>
    </section>

    <section>
      <h2>9. Deine Rechte</h2>
      <p>Nach der DSGVO kannst du – soweit die jeweiligen Voraussetzungen vorliegen – Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung verlangen. Außerdem kannst du einer Verarbeitung auf Grundlage berechtigter Interessen widersprechen und dich bei einer zuständigen Datenschutzaufsichtsbehörde beschweren.</p>
      <p>Für ausschließlich journalistische Verarbeitungen können aufgrund von Art. 43 Uitvoeringswet AVG Einschränkungen dieser Rechte gelten.</p>
      <p>Da Tandemhopper aus den Niederlanden betrieben wird, kommt insbesondere die niederländische Datenschutzaufsicht Autoriteit Persoonsgegevens als zuständige Aufsichtsbehörde in Betracht.</p>
    </section>

    <section>
      <h2>10. Änderungen</h2>
      <p>Wenn sich die Website technisch oder organisatorisch verändert – zum Beispiel durch neue Analyse-, Werbe-, Kontakt-, Newsletter- oder Einbettungsdienste – passen wir diese Datenschutzhinweise entsprechend an.</p>
    </section>
  </main><Footer/></>
}
