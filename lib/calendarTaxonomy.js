// Gemeinsame redaktionelle Kategorien und Regionen für Liste, Filter und Sanity.
export const categoryOptions = [
  {value: 'fanszene', label: 'Ultras / Fanszene'},
  {value: 'krawallspiel', label: 'Krawallspiel'},
  {value: 'rivalitaet', label: 'Derby / Rivalität'},
  {value: 'besonderes_stadion', label: 'Besonderes Stadion'},
  {value: 'seltenes_spiel', label: 'Seltenes Spiel'},
  {value: 'abschiedsspiel', label: 'Abschiedsspiel'},
  {value: 'dorfderby', label: 'Dorfderby'},
  // Bestehende Daten behalten ihre ursprünglichen Kategorien, bis sie redaktionell geprüft wurden.
  {value: 'auswaertsfahrt', label: 'Große Auswärtsfahrt'},
  {value: 'anlass', label: 'Besonderer Anlass'},
  {value: 'unter_dem_radar', label: 'Unter dem Radar'},
]

export const regionOptions = [
  {value: 'deutschland', label: 'Deutschland'},
  {value: 'benelux', label: 'BeNeLux'},
  {value: 'polen', label: 'Polen'},
  {value: 'balkan', label: 'Balkan'},
  {value: 'nordafrika', label: 'Nordafrika'},
  {value: 'international', label: 'International (Europapokal etc.)'},
  {value: 'italien', label: 'Italien'},
  {value: 'weitere', label: 'Weitere Länder'},
]

export const categoryLabels = Object.fromEntries(categoryOptions.map(({value, label}) => [value, label.toUpperCase()]))

const countryGroups = {
  deutschland: ['deutschland', 'germany'],
  benelux: ['niederlande', 'netherlands', 'belgien', 'belgium', 'luxemburg', 'luxembourg'],
  polen: ['polen', 'poland'],
  balkan: [
    'albanien', 'albania', 'bosnien', 'bosnia', 'bulgarien', 'bulgaria',
    'griechenland', 'greece', 'kosovo', 'kroatien', 'croatia',
    'montenegro', 'nordmazedonien', 'north macedonia', 'nordmazedonien',
    'rumänien', 'romania', 'serbien', 'serbia', 'slowenien', 'slovenia',
    'türkei', 'turkey',
  ],
  nordafrika: [
    'marokko', 'morocco', 'algerien', 'algeria', 'tunesien', 'tunisia',
    'ägypten', 'egypt', 'libyen', 'libya',
  ],
  italien: ['italien', 'italy'],
}

export function regionsForMatch(match) {
  const country = (match.country || '').toLocaleLowerCase('de-DE').trim()
  const regions = new Set(Array.isArray(match.regions) ? match.regions : [])
  // Auch bereits neu klassifizierte CMS-Einträge unterstützen.
  if (regionOptions.some(({value}) => value === match.region)) regions.add(match.region)
  const geographicGroup = Object.entries(countryGroups)
    .find(([, names]) => names.some((name) => country === name || country.startsWith(name + ' ')))
  if (geographicGroup) regions.add(geographicGroup[0])
  if (match.internationalCompetition) regions.add('international')
  if (!geographicGroup && !regions.size) regions.add('weitere')
  // Internationale Spiele behalten zusätzlich immer ihre geografische Auffindbarkeit.
  if (!geographicGroup && match.internationalCompetition) regions.add('weitere')
  return [...regions]
}
