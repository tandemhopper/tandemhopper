const p = (text) => ({_type:'block',style:'normal',children:[{_type:'span',text,marks:[]}],markDefs:[]})
const h2 = (text) => ({_type:'block',style:'h2',children:[{_type:'span',text,marks:[]}],markDefs:[]})

export const articles = [
  {
    slug: 'wann-kippt-die-stimmung',
    title: 'Wann kippt die Stimmung?',
    shortTitle: 'SSV Ulm – Kickers Offenbach',
    category: 'Spielbericht',
    tag: 'Regionalliga Südwest',
    date: '2026-08-14',
    dateDisplay: '14.08.2026',
    competition: 'Regionalliga Südwest',
    stadium: 'Donaustadion',
    attendance: '7.209',
    result: '0:2',
    hero: '/assets/hero-ulm.jpg',
    heroAlt: 'Mannschaft und Fans des SSV Ulm im Donaustadion',
    teaser: 'Wie fühlt sich der SSV Ulm nach zwei Abstiegen an – und was ist von der Stimmung im Donaustadion geblieben?',
    lead: 'Die Regionalliga Südwest ist in dieser Saison so interessant wie lange nicht mehr. Große Namen, alte Stadien, ordentliche Fanszenen und genug Geschichten, bei denen man eigentlich jedes Wochenende irgendwo hängenbleiben könnte.',
    paragraphs: [
      'Ziemlich weit oben auf meiner Liste stand deshalb der SSV Ulm. Nicht nur wegen des Stadions. Nicht nur wegen Offenbach als Gegner. Sondern vor allem wegen der Frage: Wie fühlt sich dieser Verein gerade eigentlich an?',
      'Ulm ist in den letzten Jahren einmal komplett Achterbahn gefahren. 2023 noch Regionalliga, 2024 der Durchmarsch in die 2. Bundesliga – und danach wieder zurück. Das Donaustadion ist geblieben: offen, eigenwillig und herrlich weit weg von jeder modernen Arena-Schablone.',
      'Der vollständige Tandemhopper-Bericht wird hier im nächsten Schritt aus deinem bestehenden Text übernommen. Bis dahin bleibt diese Stelle bewusst kurz – ohne erfundene Beobachtungen.'
    ],
    galleryPlacement: 'end',
    gallery: [
      { src: '/assets/hero-ulm.jpg', alt: 'SSV Ulm im Donaustadion' },
      { src: '/assets/fans-close.jpg', alt: 'Fans am Spielfeldrand' },
      { src: '/assets/grounds-oldschool.jpg', alt: 'Oldschool-Fußballground' }
    ]
  },
  {
    slug: 'nec-nijmegen-olympiakos',
    title: 'Das hässliche Entlein breitet die Flügel aus',
    shortTitle: 'NEC Nijmegen – Olympiakos',
    category: 'Fankultur',
    tag: 'Nijmegen',
    date: '2026-08-13',
    dateDisplay: '13.08.2026',
    hero: '/assets/nec-choreo.jpg',
    heroAlt: 'Schwan-Choreografie bei NEC Nijmegen',
    teaser: 'Warum die Euphorie auf Europa in Nijmegen gerade besonders groß ist.',
    lead: 'Eine zweiteilige Choreo, ein europäischer Abend und eine Stadt, die auf solche Spiele lange warten musste.',
    paragraphs: ['Der ausführliche Tandemhopper-Text kann hier später direkt aus dem CMS eingefügt werden.'],
    galleryPlacement: 'end', gallery: []
  },
  {
    slug: 'bossche-bombonera',
    title: 'Bossche Bombonera',
    shortTitle: 'FC Den Bosch – Almere City',
    category: 'Fankultur', tag: 'Niederlande', date: '2026-08-10', dateDisplay: '10.08.2026',
    hero: '/assets/denbosch.jpg', heroAlt: 'Blaue Konfetti-Aktion in Den Bosch',
    teaser: 'Südamerikanisches Motto zur Saisoneröffnung in Den Bosch.',
    lead: 'Die aktive Fanszene von FC Den Bosch lädt seit mehreren Jahren zur Saisoneröffnung unter südamerikanischem Motto.',
    paragraphs: ['Der vollständige Bericht wird später aus dem CMS geladen.'], galleryPlacement: 'start', gallery: []
  },
  {
    slug: 'kaiserslautern-karlsruhe', title: 'Kaiserslautern – Karlsruhe', shortTitle: 'Kaiserslautern – Karlsruhe',
    category: 'Spielbericht', tag: 'Südwest', date: '2026-08-15', dateDisplay: '15.08.2026',
    hero: '/assets/fankultur-pyro.jpg', heroAlt: 'Pyrotechnik auf einer großen Fankurve',
    teaser: 'Flutlicht, volle Kurven und ein Südwest-Duell.', lead: 'Ein Spiel mit reichlich Betrieb auf den Rängen.',
    paragraphs: ['Der vollständige Bericht wird später aus dem CMS geladen.'], galleryPlacement: 'end', gallery: []
  }
];

export function getArticle(slug) { return articles.find((a) => a.slug === slug); }
