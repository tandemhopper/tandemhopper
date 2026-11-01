// Editorial fallback: country guides remain available without a Sanity write token.
// When a published document with the same slug exists in Sanity, Sanity takes precedence.
const paragraph = (text, key) => ({
  _type: 'block', _key: key, style: 'normal', markDefs: [],
  children: [{_type:'span',_key:key+'s',text,marks:[]}],
});
const photo = (name, caption, key, alt=caption) => ({
  _type:'image', _key:key, src:'/assets/laender/macau-'+name+'.svg', caption, alt,
});
const section = (id, topic, heading, paragraphs, options={}) => ({
  _type:'guideSection', _key:id, topic, heading,
  presentation:options.presentation||'standard',
  content:paragraphs.flatMap((p,i)=>typeof p==='string'?[paragraph(p,id+'p'+i)]:[p]),
  ...(options.tip?{tip:options.tip}:{}),
  ...(options.notice?{notice:options.notice}:{}),
  ...(options.sources?{sources:options.sources}:{}),
});
const source = (label,url)=>({label,url});

export const macauGuide = {
  _id:'editorial-macau', _type:'countryGuide', title:'Macau', slug:'macau',
  continent:'asien', region:'Ostasien', flag:'🇲🇴',
  teaser:'Hunderennbahn, Hochhauskulisse und Fußball zwischen den Casinos.',
  hero:'/assets/laender/macau-olympic.svg',
  heroAlt:'Olympic Sports Centre in Macau bei Nacht, Casino Galaxy Macau im Hintergrund',
  tile:'/assets/laender/macau-casino.svg',
  checkedAt:'2026-11-01', fifaRanking:193, fifaRankingDate:'2026-10-07',
  intro:[
    paragraph('Macau ist eine chinesische Sonderverwaltungszone mit eigenem Fußballverband und einer eigenen Nationalmannschaft. In der kleinen Stadt an der Perlflussmündung stehen riesige Casinoresorts neben engen Wohnvierteln. Fußball spielt für die meisten Besucher keine Rolle – aus Groundhopping-Sicht macht gerade das einige Plätze interessant.','macauintro1'),
    paragraph('Zwei Grounds stechen heraus: das Olympic Sports Centre mit Blick auf die beleuchteten Casinos und das Lin Fong Stadium neben dem ehemaligen Hunderennstadion Canidrome. Wer seinen Länderpunkt machen möchte, sollte sich allerdings nicht auf einen langfristig verlässlichen Spielplan verlassen.','macauintro2'),
  ],
  essentials:[
    'FIFA-Weltrangliste Männer: Platz 193 (07.10.2026)',
    'Fußballverband: Macau Football Association (AFM)',
    'Währung: Macau-Pataca (MOP), häufig auch HKD',
    'Bus: 6 MOP bei Barzahlung – passendes Kleingeld bereithalten',
    'Beste Spiele: Heimländerspiele oder eine Ligapartie',
    'Wichtig: Spielort und Zugang kurz vorher bestätigen',
  ],
  sections:[
    section('cash','tipps','Wichtig: Bezahlen in Macau',[
      'Der größte praktische Stolperstein war überraschenderweise nicht die Grenze oder die Spielplanung, sondern das Bezahlen. Alipay und WeChat funktionierten mit den für ausländische Reisende eingerichteten Zugängen vielerorts nicht, obwohl sie in Festlandchina problemlos nutzbar waren. Auf Visa und Mastercard war in kleineren Läden und Restaurants ebenfalls nicht immer Verlass.',
      'Deshalb: ausreichend Bargeld dabeihaben. Macau-Pataca ist die Landeswährung; Hongkong-Dollar wird häufig akzeptiert, aber nicht überall zum günstigsten Kurs umgerechnet. Im Linienbus zahlt man bei Barzahlung 6 Pataca und bekommt kein Wechselgeld. Eine Macau Pass-Karte kann sich bei mehreren Tagen lohnen.',
    ],{notice:{level:'important',title:'Nicht ohne Bargeld losziehen',text:'Alipay/WeChat mit ausländischem Touristenzugang können in Macau scheitern. Auch ausländische Kreditkarten werden nicht überall angenommen.'},
      sources:[source('Offizielle Businformationen und Fahrpreise','https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation?tab=public-buses')]}),
    section('olympic','tickets','Olympic Sports Centre',[
      'Das große Stadion auf Taipa ist wahrscheinlich Macaus interessantester Fußballort, wenn es um die Kulisse geht. Hinter dem Spielfeld ragen die gewaltigen Casinobauten auf. Besonders bei Dunkelheit bildet das beleuchtete Galaxy Macau einen absurden Kontrast zur Laufbahn und den Tribünen.',
      photo('olympic','Olympic Sports Centre bei Nacht – mit dem Galaxy Macau im Hintergrund.','olympic-image'),
      'Hier finden unter anderem internationale Spiele statt. Auch Ligaspiele können hier angesetzt werden, vor allem wenn andere Anlagen nicht zur Verfügung stehen. Die konkrete Nutzung hängt vom Spielplan ab.',
    ],{tip:'Wer das Stadion fotografieren möchte, sollte eine Perspektive wählen, bei der der Galaxy-Komplex hinter dem Spielfeld zu sehen ist. In der Dämmerung funktioniert das Motiv besonders gut.'}),
    section('canf','tickets','Lin Fong Stadium & das ehemalige Canidrome',[
      'Der alte Canidrome-Komplex ist Macaus ungewöhnlichster Ground. Früher wurden hier Windhundrennen veranstaltet; im angrenzenden Lin Fong Sports Centre wurde Fußball gespielt. Noch Anfang 2025 waren die ehemaligen Rennbahnbereiche, Tribünen und zahlreiche Spuren der Wett- und Hundesportvergangenheit zu erkennen. Rundherum stehen dicht gedrängt Wohnhochhäuser.',
      photo('linfong','Ligafußball im Lin Fong Stadium: kleine Kulisse, große Hochhäuser. Aufnahme aus dem Jahr 2025.','linfong-image'),
      'Beim Spiel MUST IPO gegen Benfica Macau Anfang 2025 saßen nur etwa 20 bis 30 Zuschauer auf den Rängen. Der Spielort war zuvor beim Platzpersonal bestätigt worden. Für eine organisierte Fanszene gibt es bei solchen Partien kaum Anzeichen – es ist eher Fußball zwischen Alltag und Nachbarschaft.',
      photo('canidrome','Die historischen Anlagen des ehemaligen Canidrome. Foto von 2025, vor dem aktuellen Umbau.','canidrome-image'),
      'Die frühere Hunderennbahn wird zu einem großen Sportpark umgebaut. Die Bauarbeiten verlaufen in mehreren Phasen. Das Sportzentrum Lin Fong sollte laut Projektplanung in der ersten Phase zunächst weiterbetrieben werden; seine spätere Erneuerung ist Teil der zweiten Phase. Historische Fotos zeigen daher ausdrücklich keinen garantiert aktuellen Zustand.',
    ],{notice:{level:'update',title:'Achtung: Umbau des Canidrome',text:'Die Aufnahmen aus 2025 dokumentieren den alten Zustand. Der frühere Hunderennground wird umgebaut, und die Nutzung des angrenzenden Fußballplatzes kann sich ändern. Vor der Anreise aktuelle Spielorte prüfen.'},sources:[source('Macao News: Umbau des ehemaligen Canidrome (18.08.2025)','https://macaonews.org/news/city/macau-sports-complex-former-canidrome-redevelopment-macao/'),source('Macau Post Daily: Bauphasen und Sportzentrum Lin Fong','https://www.macaupostdaily.com/news/25315')]}),
    section('bestmatch','fanszenen','Welches Spiel lohnt sich?',[
      'Am reizvollsten wäre ein Länderspiel Macaus, besonders gegen Hongkong. Solche Heimspiele sind aber nicht jedes Jahr garantiert. Ob die Partie im Olympic Sports Centre ausgetragen wird, muss man rechtzeitig prüfen.',
      'Als kuriose Alternative gibt es die portugiesisch geprägten Vereinsnamen Benfica und Sporting. Ihr mögliches Aufeinandertreffen lässt sich als kleines „Lissabon-Derby“ verkaufen – aber bitte keine entsprechende Derbyatmosphäre erwarten. Die Zuschauerzahlen im Ligafußball sind oft sehr überschaubar.',
    ],{presentation:'card',tip:'Nicht nur nach dem Gegner schauen: Ein Länderspiel in Macau oder eine Ligapartie mit gesichertem Stadiontermin ist meist die bessere Wahl als eine vermeintlich attraktive Paarung ohne bestätigten Spielort.'}),
    section('fixtures','tickets','Spielplan & Eintritt',[
      'Die Liga wird nicht im europäischen Herbst-Frühjahr-Rhythmus gespielt. Ansetzungen am besten über den Fußballverband und die Social-Media-Kanäle der Vereine verfolgen. Chinesischsprachige Informationen können aktueller sein als englische Übersichten.',
      'Es kann Doppelspieltage an einem Ground und kurzfristige Änderungen geben. Bei kleinen Ligapartien ist der Einlass oft unkompliziert; kostenloser Zugang ist aber nicht pauschal garantiert. Vor allem bei neu angesetzten Spielen unbedingt Anstoßzeit, Austragungsort und Zutrittsregeln gegenprüfen.',
    ],{presentation:'accordion'}),
    section('border','einreise','Anreise über Hongkong oder Zhuhai',[
      'Aus Hongkong gelangt man mit der Fähre oder über die Hongkong–Zhuhai–Macau-Brücke nach Macau. Eine Tagestour ist möglich, sofern Spieltermin und letzte Rückverbindung zusammenpassen. Alternativ bietet sich Zhuhai als Übernachtungsort an; rund um den Grenzübergang Gongbei gibt es oft günstigere Hotels als im Casinogebiet.',
      photo('gongbei','Grenzübergang Gongbei / Portas do Cerco: praktische Verbindung zwischen Zhuhai und Macau.','gongbei-image'),
      'Achtung bei späten Spielen: Gongbei / Portas do Cerco ist täglich von 6:00 bis 1:00 Uhr geöffnet und nicht rund um die Uhr. Andere Übergänge haben teilweise andere Zugangsregeln und Öffnungszeiten. Für den Weg nach Festlandchina gelten außerdem gesonderte Einreisebestimmungen.',
    ],{notice:{level:'important',title:'Gongbei schließt nachts',text:'Offizielle Öffnungszeiten: täglich 06:00–01:00 Uhr. Bei einer Übernachtung in Zhuhai den Rückweg nach dem Spiel einplanen.'},sources:[source('Macau Tourism: Grenzübergänge und Öffnungszeiten','https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/ports-of-entry'),source('Macau Tourism: Fähren und Landwege','https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/travelling-to-macao?tab=by-air')]}),
    section('movement','verkehr','Unterwegs: Bus, LRT und Casino-Shuttles',[
      'Viele Ziele lassen sich zu Fuß erreichen, größere Distanzen überbrückt man mit Bus oder der aufgeständerten Light Rapid Transit (LRT). Die Bahn ist gerade auf Taipa eine willkommene Abwechslung und führt nahe am Olympic Sports Centre vorbei.',
      'Praktisch sind auch die kostenlosen Shuttlebusse vieler Casinos. Sie verbinden häufig große Resorts mit wichtigen Ankunftsorten. Routen und Nutzungsbedingungen unterscheiden sich; es gibt keinen Anspruch auf eine Verbindung zu jedem beliebigen Ziel.',
      'Bei den öffentlichen Bussen sind passende Münzen Gold wert. Bei Barzahlung werden 6 MOP in die Kasse eingeworfen; Rückgeld gibt es nicht. Ein vermeintliches Tagesticket sollte man nicht als sichere Option einplanen.',
    ],{sources:[source('Offizieller Verkehrsüberblick','https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation?tab=public-buses')]}),
    section('internet','tipps','Internet, SIM und Verständigung',[
      'Eine SIM-Karte für Festlandchina umfasst Macau nicht automatisch. Wer online bleiben will, prüft das Roaming oder besorgt sich einen passenden regionalen Tarif beziehungsweise eine eSIM. Hotels und viele Casinos bieten WLAN an.',
      'Im Alltag ist vor allem Kantonesisch zu hören, dazu Mandarin und Portugiesisch in verschiedenen offiziellen Zusammenhängen. Nicht jeder Busfahrer und jede kleine Gaststätte ist auf englischsprachige Besucher eingestellt.',
    ],{presentation:'accordion'}),
    section('casino','weiteres','Zwischen Casinos und Altstadt',[
      'Macau lebt touristisch vor allem von seinen gigantischen Casinokomplexen. Venetian, Galaxy, Londoner und Parisian sind schon als Gebäude bemerkenswert. Daneben gibt es eine dichte, teilweise ziemlich heruntergekommene Wohnstadt, die deutlich weniger nach Glitzer aussieht.',
      photo('casino','Wynn Palace: Gondeln, Wasserspiele und die ziemlich eigene Casinowelt Macaus.','casino-image'),
      'Die Ruinen von St. Paul, die alten Gassen und die Festungsanlagen eignen sich gut für einen Rundgang abseits des Fußballs. Auch ein Blick in die Casinoresorts ist möglich, ohne an einem Tisch zu spielen. Beim Geldwechsel und bei unaufgeforderten Angeboten sollte man allerdings vorsichtig bleiben.',
    ],{presentation:'card'}),
    section('more','tickets','Weitere Grounds & verlorene Anlagen',[
      'Kleinere Spielstätten gibt es unter anderem an Universitäten, etwa bei der Macau University of Science and Technology. Solche Plätze eignen sich als Alternative, wenn ein konkretes Spiel bestätigt ist. Für den normalen Besucher sind sie keine sichere Planungsoption.',
      'Auch die ehemalige Pferderennbahn des Macau Jockey Club ist ein verlorener Ground: Der Rennbetrieb wurde 2024 eingestellt. Der einstige Canidrome gehört zur gleichen ungewöhnlichen Sportgeschichte der Stadt.',
    ],{presentation:'accordion'}),
  ],
};