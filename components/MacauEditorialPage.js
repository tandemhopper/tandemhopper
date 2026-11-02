import {defaultMacauTips,defaultMacauTextMap,defaultMacauSources} from '../lib/macauEditableDefaults'
import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'

const base = '/assets/laender/macau-'

function BasePhoto({name,src,alt,caption,wide=false}) {
  return <figure className={'th-photo'+(wide?' th-photo-wide':'')}>
    <img src={src||base+name+'.webp'} alt={alt} loading="lazy" decoding="async"/>
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

function BaseTextLink({href,children}) {return <a className="th-source-link" href={href} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true"> ↗</span></a>}

export default function MacauEditorialPage({settings}) {
  const copyItems = [...(settings?.introTexts||[]), ...(settings?.stadiumTexts||[]), ...(settings?.matchTexts||[]), ...(settings?.travelTexts||[]), ...(settings?.cityTexts||[]), ...(settings?.budgetTexts||[]), ...(settings?.sourceTexts||[])];
  const copyOverrides = new Map(copyItems.map(item=>[item.key,item.value]));
  const t = key => copyOverrides.has(key) ? copyOverrides.get(key) : (defaultMacauTextMap[key]||'');
  const rich = key => t(key).split(/(\*\*[^*]+\*\*)/g).map((part,i)=>part.startsWith('**')&&part.endsWith('**')?<strong key={i}>{part.slice(2,-2)}</strong>:part);
  const photos = new Map((settings?.images||[]).map(item=>[item.slot,item]));
  const Photo = ({name,...props})=>{const edited=photos.get(name);return <BasePhoto name={name} {...props} src={edited?.url} alt={edited?.alt||props.alt} caption={edited?.caption||props.caption}/>};
  const sourceLinks = Array.isArray(settings?.sourceLinks)?settings.sourceLinks:defaultMacauSources;
  const sourceMap = new Map(sourceLinks.map(item=>[item.originalUrl,item]));
  const TextLink = ({href,children})=>{
    const changed = sourceMap.get(href);
    const original = defaultMacauSources.find(item=>item.originalUrl===href);
    const label = changed && original && changed.label!==original.label ? changed.label : children;
    return <BaseTextLink href={changed?.url||href}>{label}</BaseTextLink>;
  };
  const links = sourceLinks.map(item=>[item.label,item.url]);
  const heroPhoto=photos.get('hero');

  const tips = Array.isArray(settings?.tips)?settings.tips:defaultMacauTips
  return <><Header/><main className="th-country">
    <nav className="th-breadcrumb" aria-label="Brotkrumennavigation"><Link href="/laender">LÄNDERKOMPASS</Link><span>/</span><span>ASIEN</span><span>/</span><strong>MACAU</strong><i/><span>GUIDE 01</span></nav>
    <header className="th-hero">
      <div className="th-hero-copy">
        <p className="th-eyebrow">{t("copy-001")}</p>
        <h1>MACAU<span>.</span></h1>
        <p className="th-hero-deck">{t("copy-002")}</p>
        <div className="th-hero-meta"><span>GROUNDHOPPING-GUIDE</span><span>STAND {settings?.lastReviewed?new Intl.DateTimeFormat('de-DE').format(new Date(settings.lastReviewed)): '02.11.2026'}</span></div>
      </div>
      <figure className="th-hero-photo"><img src={heroPhoto?.url||base+'olympic-v2.webp'} alt={heroPhoto?.alt||'Olympic Sports Centre am Abend mit leuchtendem Galaxy Macau im Hintergrund'} fetchPriority="high"/><figcaption>{heroPhoto?.caption||'Olympic Sports Centre · Taipa'}</figcaption></figure>
    </header>
    <div className="th-facts" aria-label="Macau auf einen Blick">
      <div><span>FIFA-RANGLISTE · MÄNNER</span><strong>193. Platz</strong><small>Stand: 20.07.2026</small></div>
      <div><span>FUSSBALLVERBAND</span><strong>Macau FA</strong><small>Eigenständiges FIFA-Mitglied</small></div>
      <div><span>WÄHRUNG</span><strong>Macau-Pataca</strong><small>MOP · oft auch HKD</small></div>
      <div><span>BUS · BARZAHLUNG</span><strong>6 MOP</strong><small>Passend bezahlen, kein Rückgeld</small></div>
    </div>

    <section className="th-intro">
      <h2>CASINOS, GRENZEN UND <em>ZWEI BESONDERE GROUNDS.</em></h2>
      <div><p>{t("copy-003")}</p><p>{t("copy-004")}</p></div>
    </section>

    <aside className="th-critical">
      <div><p className="th-eyebrow">{t("copy-005")}</p><h2>{t("copy-006")}</h2></div>
      <div><p>{t("copy-007")}</p><p>{rich("rich-cash")}</p></div>
    </aside>

    <div className="th-content-layout">
      <nav className="th-sticky-nav" aria-label="Inhaltsverzeichnis"><strong>DIREKT ZUM THEMA</strong>
        <a href="#stadien"><span>01</span> Die Stadien</a>
        <a href="#spiele"><span>02</span> Spielplanung</a>
        <a href="#anreise"><span>03</span> Anreise & Verkehr</a>
        <a href="#stadt"><span>04</span> Stadt & weitere Grounds</a>
        <a href="#spartipps"><span>05</span> Tipps & Tricks</a>
        <a href="#quellen"><span>06</span> Quellen & Stand</a>
      </nav>
      <div className="th-chapters">
        <Chapter id="stadien" number="01" label="STADIEN & GROUNDS" title={t("chapter-stadien-title")}>
          <p className="th-lead">{t("copy-008")}</p>
          <h3>{t("copy-009")}</h3>
          <p>{t("copy-010")}</p>
          <Photo name="olympic-v2" alt="Laufbahn und Fußballfeld im Olympic Sports Centre vor dem beleuchteten Galaxy Casino" caption="Olympic Sports Centre mit Galaxy Macau im Hintergrund. Der Blick von der Tribüne lohnt sich besonders am Abend." wide/>
          <p className="th-inline-tip">{rich("rich-phototip")}</p>
          <h3>{t("copy-011")}</h3>
          <p>{t("copy-012")}</p>
          <p>{t("copy-013")}</p>
          <div className="th-photo-pair">
            <Photo name="linfong-v2" alt="Ligaspiel im Lin Fong Stadium mit Wohnhochhäusern und Flutlicht" caption="Lin Fong Stadium – Ligaspiel 2025, vor Beginn der Bauarbeiten."/>
            <Photo name="canidrome-gate" alt="Historischer Eingangsbogen zum ehemaligen Macau Canidrome" caption="Der alte Canidrome-Eingang, aufgenommen 2025."/>
          </div>
          <div className="th-photo-pair th-photo-pair-small">
            <Photo name="canidrome-stands" alt="Alte Tribünen und Laufbahn des ehemaligen Canidrome" caption="Historische Tribünen und ehemalige Anlagen, Aufnahme von 2025."/>
            <Photo name="canidrome-structure" alt="Historische Strukturen am ehemaligen Canidrome" caption="Anlagen rund um den damaligen Platz, aufgenommen 2025."/>
          </div>
          <aside className="th-update"><strong>WICHTIG: UMBAU SEIT 2026</strong><p>{rich("rich-construction")}</p><TextLink href="https://www.gcs.gov.mo/news/detail/pt/N26AWONP9G">Offizielle Mitteilung zum Baubeginn</TextLink></aside>
        </Chapter>

        <Chapter id="spiele" number="02" label="SPIELPLANUNG" title={t("chapter-spiele-title")}>
          <p>{t("copy-014")}</p>
          <div className="th-option"><span>01</span><div><h3>{t("copy-015")}</h3><p>{t("copy-016")}</p></div></div>
          <div className="th-option"><span>02</span><div><h3>{t("copy-017")}</h3><p>{t("copy-018")}</p></div></div>
          <div className="th-option"><span>03</span><div><h3>{t("copy-019")}</h3><p>{t("copy-020")}</p></div></div>
          <div className="th-detail-note"><strong>SPIELPLAN CHECKEN</strong><p>{t("copy-021")}</p><TextLink href="https://www.macaufootball.com/eng/league-d1/2026">Macau League 2026 · Spielplan und Tabelle</TextLink></div>
        </Chapter>

        <Chapter id="anreise" number="03" label="REISEPLANUNG" title={t("chapter-anreise-title")}>
          <p className="th-lead">{t("copy-022")}</p>
          <div className="th-trip-grid">
            <section><h3>{t("copy-023")}</h3><p>{t("copy-024")}</p><TextLink href="https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/travelling-to-macao">Offizielle Anreiseinformationen</TextLink></section>
            <section><h3>{t("copy-025")}</h3><p>{rich("rich-zhuhai")}</p><TextLink href="https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/ports-of-entry">Grenzübergänge & Öffnungszeiten</TextLink></section>
          </div>
          <div className="th-photo-pair">
            <Photo name="gongbei" alt="Grenzgebäude Gongbei an der Grenze zwischen Macau und Zhuhai" caption="Gongbei / Portas do Cerco: praktisch, aber nicht 24 Stunden geöffnet."/>
            <Photo name="lrt" alt="Aufgeständerte Macau Light Rapid Transit bei Nacht" caption="Die aufgeständerte LRT auf Taipa."/>
          </div>
          <div className="th-trip-grid">
            <section><h3>{t("copy-026")}</h3><p>{t("copy-027")}</p><TextLink href="https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation">Öffentlicher Verkehr</TextLink></section>
            <section><h3>{t("copy-028")}</h3><p>{t("copy-029")}</p><TextLink href="https://www.gov.mo/en/services/ps-1474/ps-1474b/">Offizielle Einreiseinformationen</TextLink></section>
          </div>
        </Chapter>

        <Chapter id="stadt" number="04" label="ABSEITS DES SPIELFELDS" title={t("chapter-stadt-title")}>
          <p>{t("copy-030")}</p>
          <div className="th-photo-pair th-photo-pair-city">
            <Photo name="wynn" alt="Wasserspiele und Gondel am Wynn Palace in Macau bei Nacht" caption="Wynn Palace: Gondel und Wasserfontänen in Cotai."/>
            <Photo name="skyline" alt="Dichte Wohnbebauung mit Hochhäusern in Macau" caption="Die Wohnviertel Macaus wirken deutlich weniger glattpoliert."/>
          </div>
          <div className="th-photo-pair th-photo-pair-small">
            <Photo name="grandlisboa" alt="Grand Lisboa Casino zwischen Wohnhäusern in Macau" caption="Grand Lisboa zwischen den Häusern der Altstadt."/>
            <Photo name="lotus" alt="Lotuskunstwerk und historische Stadtbebauung in Macau" caption="Eine andere Seite Macaus abseits der Stadien."/>
          </div>
          <h3>{t("copy-031")}</h3><p>{t("copy-032")}</p>
        </Chapter>


        <Chapter id="spartipps" number="05" label="TIPPS & TRICKS" title={t("chapter-spartipps-title")}>
          <p className="th-lead">{t("copy-033")}</p>
          <div className="th-budget-headline">
            <div><span>DER 0-MOP-SELBSTVERSUCH</span><strong>Ein Tag. Null Eintritt. Viel Macau.</strong></div>
            <p>{t("copy-034")}</p>
          </div>
          <div className="th-budget-list">
            {tips.map((item,i)=><article className="th-budget-tip" key={item._key||i}>
              <span>{String(i+1).padStart(2,'0')}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p>{item.sourceUrl&&<TextLink href={item.sourceUrl}>{item.sourceLabel||'Quelle und aktuelle Infos'}</TextLink>}</div>
            </article>)}
          </div>
          <details className="th-deep-dive">
            <summary>MEHR ZUR GRENZE: ZHUHAI ALS BASIS <span aria-hidden="true">+</span></summary>
            <div>
              <p>{t("copy-035")}</p>
              <p>{t("copy-036")}</p>
              <TextLink href="https://s.nia.gov.cn/ArrivalCardFillingPC/">Offizielle chinesische Arrival Card – kostenlos</TextLink>
              <TextLink href="https://china.diplo.de/cn-de/willkommen-in-china/reise-und-sicherheitshinweise">Auswärtiges Amt: Einreise nach China</TextLink>
            </div>
          </details>
          <details className="th-deep-dive">
            <summary>GRATIS-ESSEN IM CASINO – WAS STIMMT? <span aria-hidden="true">+</span></summary>
            <div>
              <p>{t("copy-037")}</p>
              <p>{t("copy-038")}</p>
              <TextLink href="https://www.reddit.com/r/Macau/comments/1thtue5/solo_trip_in_macau_help/">Erfahrungsberichte: Casino-Snacks und Kostproben</TextLink>
            </div>
          </details>
          <div className="th-detail-note">
            <strong>WAS „0 EURO“ HIER NICHT BEDEUTET</strong>
            <p>{t("copy-039")}</p>
          </div>
        </Chapter>

        <section className="th-sources" id="quellen"><h2>{t("copy-040")}</h2><p>{t("copy-041")}</p><div>{links.map(([label,url])=><TextLink key={url} href={url}>{label}</TextLink>)}</div></section>
      </div>
    </div>
    <div className="th-endbar"><Link href="/laender">← ZUR LÄNDERÜBERSICHT</Link><span>MACAU · LÄNDERKOMPASS</span></div>
  </main><Footer/></>
}