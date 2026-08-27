const p = (text) => ({_type:'block',style:'normal',children:[{_type:'span',text,marks:[]}],markDefs:[]})
const h2 = (text) => ({_type:'block',style:'h2',children:[{_type:'span',text,marks:[]}],markDefs:[]})

export const articles = [
  {
    slug: 'krieschow-machts-selbst',
    title: 'Krieschow macht’s selbst',
    shortTitle: 'VfB Krieschow – 1. FSV Mainz 05',
    category: 'Spielbericht',
    tag: 'DFB-Pokal · Brandenburg',
    date: '2026-08-23',
    dateDisplay: '23.08.2026',
    competition: 'DFB-Pokal',
    stadium: 'Sportpark Krieschow',
    attendance: '4.000',
    result: '0:9',
    hero: '/articles/krieschow/krieschow-03.jpg',
    heroAlt: 'Große blau-weiße Choreografie der Krieschower Fans hinter dem Tor im Sportpark Krieschow',
    heroCaption: 'Einmal DFB-Pokal im eigenen Sportpark: Krieschow empfängt Mainz 05 vor 4.000 Zuschauern.',
    teaser: 'Ein 560-Einwohner-Ort baut sich für einen Tag sein eigenes DFB-Pokal-Stadion – und Mainz bringt mehr als 1.000 Leute mit in die Lausitz.',
    seoDescription: 'VfB Krieschow gegen Mainz 05 im DFB-Pokal: provisorische Tribünen, mehr als 1.000 Mainzer und ein Dorf, das seinen Pokaltag einfach selbst baut.',
    body: [
      p(`Für ein ziemlich besonderes Pokalhighlight ging es zurück in meine geliebte Brandenburger Heimat. Genauer gesagt in den Teil des Bundeslandes, in dem die Ortsschilder zweisprachig sind und man als Rückkehrer aus dem niederländischen Exil ziemlich schnell wieder weiß, wo man gelandet ist: flache Landschaft, Dorfkirchen, Sonnenblumenfelder – und zwischendurch ein Sportplatz, der plötzlich DFB-Pokal spielen muss.`),
      p(`Der VfB Krieschow hatte im Landespokalfinale überraschend Energie Cottbus geschlagen. Nicht irgendein Energie Cottbus, sondern den frisch aufgestiegenen Zweitligisten. 2:1 im Stadion der Freundschaft. Für Krieschow war es der erste Landespokalsieg der Vereinsgeschichte, für den Rest Brandenburgs ein kurzer Moment kollektiven Stirnrunzelns.`),
      p(`Und dann kam Mainz 05.`),
      p(`Eigentlich hätte man meinen können, dass so ein Spiel einfach wieder nach Cottbus wandert: Stadion der Freundschaft, Infrastruktur, Parkplätze, fertig. Warum es am Ende nicht dazu kam, konnte ich nicht komplett sauber nachvollziehen. Energie war durch den Aufstieg selbst im DFB-Pokal dabei, dazu kommen Kosten, Verfügbarkeit, Organisation und wahrscheinlich noch drei Punkte, die nur Menschen verstehen, die schon einmal mit Verbänden, Behörden und Stadionauflagen zu tun hatten.`),
      p(`Also passierte das einzig Richtige: Krieschow machte es selbst. Und genau deshalb musste ich hin.`),

      h2(`Ein Dorf baut sich den DFB-Pokal`),
      p(`Besser kannst du so ein Pokallos eigentlich kaum machen. Kein Umzug in irgendeine entfernte Zweckschüssel, kein „aus organisatorischen Gründen tragen wir unser Heimspiel leider 90 Kilometer weiter aus“, sondern Sportpark Krieschow. Ein Ortsteil mit rund 560 Einwohnern baut sich für einen Tag ein kleines Pokalstadion zusammen.`),
      p(`Stahlrohrtribünen, LED-Anzeige, Kameraturm, zusätzliche Bereiche, Zelte, Absperrungen, Sponsorenbanden und mobile Toiletten – einmal der komplette DFB-Pokal-Baukasten quer über den Sportplatz gelegt.`),
      p(`Der Spruch „besser kannst du den Ground nicht machen“ bekam hier eine ziemlich konkrete Bedeutung.`),
      p(`Im normalen Betrieb ist der Sportpark eher schlicht. Guter Rasen, Vereinsheim und ein paar Sitzbänke. Und mit Sitzbänken meine ich wirklich Bänke. Keine kleine Tribüne, keine Stufen, keine romantische Ausbauphantasie. Einfach Bänke. Das zweisprachige Ortsschild mit Kśišow ist fast schon der größte Groundhopper-Gimmick.`),
      p(`Nicht respektlos gemeint. Mehr braucht so ein Dorf im normalen Oberliga-Alltag ja auch nicht.`),
      {
        _type:'imagePair',
        left:{src:'/articles/krieschow/krieschow-01.jpg',alt:'Spieler des VfB Krieschow vor einer provisorischen Tribüne und einem Kameraturm mit Windrädern im Hintergrund'},
        right:{src:'/articles/krieschow/krieschow-04.jpg',alt:'Mann aus dem Umfeld des VfB Krieschow mit Sonnenbrille am Spielfeldrand'},
        caption:'Zwischen Zusatztribüne, Kameraturm und Vereinsalltag: Krieschow stemmte den Pokaltag auf dem eigenen Sportplatz.'
      },
      p(`Für Mainz wurde daraus ein Dorfrummel mit Pokalbranding. Viele Bierstände, Eis, Essen, mobile Toiletten und Heuballen auf den Zuwegen, die mit Bettlaken zu Parkplatz-Wegweisern umfunktioniert wurden. Dazu Felder, Kirchturm, Spreewaldnähe und überall Menschen, die entweder sehr genau wussten, was sie taten, oder zumindest überzeugend so wirkten.`),
      p(`Ostdeutscher Pragmatismus kann schon schön sein. Aus meiner Köpenicker Stadionbauer-Familie und vom Brandenburger Dorfleben kenne ich diesen Ton ziemlich gut: Viel reden bringt nichts, einer muss halt anfangen, das Ding aufzubauen. Genau so sah es in Krieschow aus. Nicht glatt, nicht perfekt, aber mit genug Leuten, die anpackten.`),
      p(`Bei aller Pokalromantik darf man die bundesweite „Ach wie süß, das kleine Dorf“-Erzählung trotzdem etwas einordnen. Krieschow ist kein Märchen aus Kreideplatz, Apfelschorle und zehn Jungs aus der Nachbarschaft. Der Verein spielt seit Jahren weit oben im Amateurfußball, hat finanzstarke Unterstützer und profitiert auch davon, dass in der Region ordentlich Fußballtalent unterwegs ist.`),
      p(`Das macht den Tag nicht kleiner. Es macht die Geschichte nur etwas ehrlicher. Ich kenne das aus dem eigenen Amateurfußball zu gut: Da wird landesweit vom sympathischen Dorfprojekt gesprochen, während man als Spieler eines normalen Dorfvereins danebensteht und denkt: Ja klar, bei uns bezahlt Opa Horst halt keine Oberliga-Mannschaft als Hobby. Im großen Fußball nennt man das dann Investor, im kleinen Fußball Bauunternehmer. Die Mechanik ist nicht völlig unähnlich.`),
      p(`Trotzdem verdient das, was Krieschow für diesen einen Tag auf die Beine gestellt hat, Respekt. Das war kein normaler Heimspielbetrieb mit ein bisschen Zusatzbratwurst, sondern ein einmaliger Kraftakt für einen Verein und einen Ort, die auf so etwas nicht ausgelegt sind.`),
      p(`Die Karte kostete 34 Euro. Für Brandenburg und Oberliga natürlich sportlich. Andererseits müssen Stahlrohrtribünen, Sicherheitsauflagen und der ganze Pokalzirkus auch irgendwie bezahlt werden. Heimseitig gab es trotzdem bis kurz vor Schluss Karten. Ein Freund kaufte seine sogar ziemlich entspannt auf der Autobahn.`),

      h2(`Mainz macht den Ausflug voll`),
      p(`Bei Mainz hatte ich ehrlich gesagt mit weniger gerechnet. Fast 600 Kilometer, Sonntag und Krieschow mit öffentlichen Verkehrsmitteln faktisch kaum erreichbar. Ich dachte: Da kommen ein paar hundert, vielleicht ein ordentlicher Haufen, aber keine riesige Nummer.`),
      p(`Falsch gedacht.`),
      p(`Mainz nahm das volle Gästekontingent mit und stellte mehr als 1.000 Leute in die Lausitz. Und das in einen komplett umzäunten Gästeblock, der so wirkte, als hätte beim Sicherheitskonzept jemand einmal zu oft „Risiko minimieren“ gesagt. Zwei Stufen, hoher Zaun, wenig Sicht, alles eng. Fußballgucken war dort eher theoretisch möglich.`),
      {
        _type:'image',
        src:'/articles/krieschow/krieschow-02.jpg',
        alt:'Mainz-05-Spieler vor dem rot-weißen Gästeblock mit vielen Fahnen im Sportpark Krieschow',
        caption:'Mehr als 1.000 Mainzer machten sich auf den langen Weg in die Lausitz.',
        width:'wide'
      },
      p(`Die Mainzer machten einfach einen Ausflug daraus. 90 Minuten Zaun, gute Laune, Dorffußball und ein bisschen „wann kommt man schon mal wieder hierher?“. Das fand ich interessant. Man merkt schon, dass sich die Wahrnehmung solcher Pokalorte verändert hat. Viele aktive Fans nehmen diese absurden Spiele inzwischen eher dankbar mit, statt nur über fehlenden Komfort zu meckern. Vielleicht auch, weil man genau solche Nachmittage im Profifußball mittlerweile zu selten bekommt.`),
      p(`Auf Heimseite gab es ebenfalls einen kleinen aktiven Haufen. Vielleicht 20 bis 30 Leute, die versuchten, ein paar Normalos mitzuziehen. Dazu eine selbstgemalte Choreo. Nichts Großes, aber genau deshalb passend.`),
      p(`Nach wenigen Minuten gab es allerdings Ärger mit einem Ordner, der offenbar fand, dass der Capo unbedingt vom Umlauf runter müsse. Er schien ungefähr der einzige Mensch im ganzen Sportpark zu sein, den das ernsthaft störte. DFB, Schiedsrichter und der Rest der Veranstaltung wirkten sonst erstaunlich entspannt. In so einem Moment den Blockpädagogen zu geben, war schon maximal unnötig.`),
      p(`Der Stadionsprecher bekam dagegen sehr viel Freiraum. Vielleicht zu viel. Er feierte wirklich jede Aktion ab, brüllte alle paar Minuten ins Mikro und durfte am Ende auch noch neun Mainzer Tore ansagen. Für die Lautsprecher war das wahrscheinlich ein anstrengender Arbeitstag. Für meine Nerven auch. Aber irgendwie passte selbst das zu diesem Dorffest mit DFB-Logo.`),

      h2(`0:9 und trotzdem gewonnen`),
      p(`Sportlich wurde es leider ziemlich eindeutig. Krieschow hielt am Anfang noch mutig dagegen, aber Mainz hatte einen dieser Tage, an denen irgendwann fast alles reingeht. 0:5 zur Pause, 0:9 am Ende. Phillip Tietz traf viermal. Für eine Pokalsensation war das ungefähr so gut geeignet wie ein Trabant für die linke Spur auf der A5.`),
      p(`Andy Hebler, die Vereinslegende und Torjägerfigur aus Brandenburg, stand auf dem Platz. Trainiert wurde Krieschow von Robert Koch. Viel mehr konnte man gegen einen Bundesligisten, der die Sache ernst nahm, an so einem Tag sportlich dann auch nicht erwarten.`),
      p(`Man kann 0:9 verlieren und trotzdem den Tag nicht verlieren.`),
      p(`Das war vielleicht die wichtigste Erkenntnis. Krieschow ging nicht unter, weil es peinlich wurde. Krieschow ging sportlich unter, weil Mainz Bundesliga spielt und Ernst machte. Das ist ein Unterschied. Der Rest des Tages funktionierte dafür erstaunlich gut: volle Zusatztribünen, Dorfkulisse, ein Mainzer Gästeblock in Ausflugslaune, Heimfans mit kleinem eigenen Auftritt, Brandenburger Improvisation und ein Sportpark, der für ein paar Stunden aussah, als hätte jemand Football Manager mit Baugerüst-Mod gespielt.`),
      p(`Auffällig war auch die große Polizeipräsenz. Von außen wirkt das bei Mainz in Krieschow erst einmal etwas absurd. Andererseits kennt man in Brandenburg diese manchmal ziemlich zufällig auftauchenden Landespokalgeschichten, bei denen plötzlich Leute im Umfeld stehen, die mit dem eigentlichen Spiel wenig zu tun haben. Mainz hat dazu keine große Vorgeschichte mit der Region. Vermutlich plant man dann lieber zu viel als zu wenig.`),
      p(`Im Stadion blieb es ruhig. Die Polizei hielt sich weitgehend zurück. So soll es sein.`),
      p(`Am Ende war das für mich ziemlich genau der DFB-Pokal, wie ich ihn sehen will: Ein kleiner Verein bekommt ein großes Los und versucht nicht, daraus für einen Tag etwas anderes zu werden. Er baut einfach seinen eigenen Sportplatz um.`),
      p(`Bleibt nur noch die wichtigste Groundhopper-Frage des Tages: Zählt der Ground eigentlich als gemacht, wenn man ihn einmalig in einer DFB-Pokal-Version mit Zusatztribünen, LED-Anzeige und Stahlrohr-Upgrade besucht hat?`),
      {
        _type:'gallery',
        images:[
          {src:'/articles/krieschow/krieschow-01.jpg',alt:'Spieler des VfB Krieschow vor einer provisorischen Tribüne und einem Kameraturm mit Windrädern im Hintergrund'},
          {src:'/articles/krieschow/krieschow-02.jpg',alt:'Mainz-05-Spieler vor dem rot-weißen Gästeblock mit Fahnen'},
          {src:'/articles/krieschow/krieschow-03.jpg',alt:'Große blau-weiße Choreografie der Krieschower Fans hinter dem Tor'},
          {src:'/articles/krieschow/krieschow-04.jpg',alt:'Mann aus dem Umfeld des VfB Krieschow mit Sonnenbrille am Spielfeldrand'}
        ]
      }
    ]
  },
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
