// Only replace exact, originally published mistakes. A later editor change
// in Sanity always takes precedence, including custom titles or captions.
const replacements = {
  "copy-004": {
    "from": "Zwischen den gigantischen Casinoresorts und den dicht bebauten Wohnvierteln liegen zwei bemerkenswerte Fußballorte: das Olympic Sports Centre auf Taipa und das Lin Fong Stadium neben der ehemaligen Hunderennbahn Canidrome.",
    "to": "Zwischen den gigantischen Casinoresorts und den dicht bebauten Wohnvierteln liegen zwei bemerkenswerte Fußballorte: das Olympic Sports Centre auf Taipa und das Lin Fong Stadium. Dessen Fußballfeld befindet sich direkt in der ehemaligen Hunderennbahn Canidrome."
  },
  "copy-008": {
    "from": "Das große Stadion hat die Casinos im Hintergrund. Beim kleineren Platz steht ein ehemaliges Hunderennstadion daneben. Macau bietet ungewöhnliche Kulissen – aber nicht automatisch interessante Spiele.",
    "to": "Das große Stadion auf Taipa hat die Casinos im Hintergrund. Der kleinere Ground liegt mitten in einer ehemaligen Hunderennbahn – mit den alten Tribünen und dicht stehenden Wohnhochhäusern ringsum."
  },
  "copy-011": {
    "from": "Lin Fong Stadium & das ehemalige Canidrome",
    "to": "Lin Fong Stadium – Fußball im ehemaligen Canidrome"
  },
  "copy-012": {
    "from": "Hier spielt Fußball in einer ganz anderen Größenordnung. Beim Ligaspiel MUST IPO gegen Benfica Macau Anfang 2025 waren ungefähr 20 bis 30 Menschen auf den Rängen. Von einer organisierten Fanszene war wenig zu sehen – dafür gab es alte Tribünen und die Kulisse der Wohnhochhäuser.",
    "to": "Beim Ligaspiel MUST IPO gegen Benfica Macau Anfang 2025 saßen ungefähr 20 bis 30 Zuschauer auf den Rängen. Interessanter als die Partie war der Spielort: das Fußballfeld in der ehemaligen Hunderennbahn mit ihren alten Tribünen und den Wohnhochhäusern ringsum."
  },
  "copy-013": {
    "from": "Direkt neben dem Lin Fong Sports Centre liegt das Areal des früheren Canidrome. Bis 2018 wurden dort Windhundrennen ausgetragen. Anfang 2025 waren noch Überreste der Rennbahn, alte Anlagen und der markante Eingangsbereich zu sehen.",
    "to": "Das Fußballfeld liegt innerhalb des ehemaligen Canidrome, in dem bis 2018 Windhundrennen ausgetragen wurden – nicht auf einem Platz neben der Rennbahn. Anfang 2025 waren Teile der früheren Rennbahn, alte Tribünen und der markante Eingangsbereich noch zu erkennen. Das benachbarte Lin Fong Sports Centre beherbergt andere Sportanlagen, darunter Hallen und ein Schwimmbad."
  },
  "copy-014": {
    "from": "Macau ist kein Reiseziel für große Ligachoreografien oder volle Gästeblöcke. Wer einen Länderpunkt machen möchte, sollte zuerst auf den tatsächlichen Austragungsort achten und erst danach auf die Paarung.",
    "to": "Wer in Macau Fußball schauen möchte, sollte besonders auf den bestätigten Spielort achten. Spielansetzungen können sich ändern; deshalb den Austragungsort möglichst kurz vor dem Besuch noch einmal überprüfen."
  },
  "rich-construction": {
    "from": "Auf dem ehemaligen Canidrome-Gelände haben im Januar 2026 die Bauarbeiten für einen Sportpark begonnen. Die Bilder zeigen deshalb **ausdrücklich den Zustand von 2025**. Das angrenzende Lin Fong Sports Centre soll laut Bauplanung während der ersten Phase weiter in Betrieb bleiben und erst später umgebaut werden. Trotzdem vor der Anreise prüfen, ob dort gespielt wird und welcher Zugang möglich ist.",
    "to": "Auf dem ehemaligen Canidrome-Gelände haben im Januar 2026 die Bauarbeiten für einen Sportpark begonnen. Die Bilder zeigen deshalb **ausdrücklich den Zustand von 2025**. Das benachbarte Lin Fong Sports Centre mit seinen Hallen und dem Schwimmbad soll laut Bauplanung während der ersten Phase weiter in Betrieb bleiben und erst später umgebaut werden. Vor einer Reise daher prüfen, ob das Fußballfeld im früheren Canidrome noch bespielt wird und welcher Zugang möglich ist."
  }
}
const imageCopy = {
  "linfong-v2": {
    "caption": {
      "from": "Lin Fong Stadium – Ligaspiel 2025, vor Beginn der Bauarbeiten.",
      "to": "Fußball im ehemaligen Canidrome (Lin Fong Stadium), Aufnahme von 2025."
    },
    "alt": {
      "from": "Ligaspiel im Lin Fong Stadium mit Wohnhochhäusern und Flutlicht",
      "to": "Fußballspiel in der früheren Hunderennbahn Canidrome, umgeben von Wohnhochhäusern"
    }
  }
}

export function correctPublishedMacauCopy(settings) {
  if (!settings) return settings
  let changed = false
  const fields = ['introTexts','stadiumTexts','matchTexts','travelTexts','cityTexts','budgetTexts','sourceTexts']
  const result={...settings}
  for (const field of fields) {
    if(!Array.isArray(settings[field]))continue
    result[field]=settings[field].map(entry=>{
      const correction=replacements[entry.key]
      if(!correction||entry.value!==correction.from)return entry
      changed=true
      return {...entry,value:correction.to}
    })
  }
  if(Array.isArray(settings.images)) {
    result.images=settings.images.map(image=>{
      const correction=imageCopy[image.slot]
      if(!correction)return image
      let copy=image
      for(const [field,change] of Object.entries(correction)){
        if(copy[field]===change.from){copy={...copy,[field]:change.to};changed=true}
      }
      return copy
    })
  }
  return changed?result:settings
}
