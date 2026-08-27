# Tandemhopper → Sanity Import

Dieser Ordner ist die Import-Warteschlange für Tandemhopper-Artikel.

Sobald eine JSON-Datei oder ein zugehöriges Bild unter `content/import-assets/` auf `main` landet, startet GitHub Actions automatisch den Import. Der Import erstellt **immer nur einen Entwurf** in Sanity. Veröffentlicht wird anschließend bewusst im Studio.

## Einmalige Voraussetzung

Im GitHub-Repository muss unter **Settings → Secrets and variables → Actions** ein Repository Secret namens `SANITY_WRITE_TOKEN` hinterlegt sein. Der Token benötigt Schreibrechte für das Sanity-Projekt `90kx3kio`, Dataset `production`.

## Beispiel

```json
{
  "article": {
    "title": "Kurzer Titel",
    "slug": "kurzer-titel",
    "category": "spielbericht",
    "tag": "DFB-Pokal · Brandenburg",
    "teaser": "Kurzer Teaser für Startseite und Archiv.",
    "publishedAt": "2026-08-23T18:00:00.000Z",
    "featured": false,
    "heroImage": {
      "path": "content/import-assets/kurzer-titel/hero.jpg",
      "alt": "Beschreibender Alternativtext",
      "caption": "Optionale Bildunterschrift"
    },
    "match": {
      "homeTeam": "Heimteam",
      "awayTeam": "Auswärtsteam",
      "competition": "Wettbewerb",
      "matchday": "1. Runde",
      "matchDate": "2026-08-23",
      "stadium": "Stadionname",
      "attendance": "4.000",
      "result": "0:9"
    },
    "place": {
      "city": "Ort",
      "country": "Deutschland"
    },
    "body": [
      {"type": "p", "text": "Erster Absatz."},
      {"type": "h2", "text": "Eine Zwischenüberschrift"},
      {"type": "p", "text": "Nächster Absatz."},
      {
        "type": "image",
        "path": "content/import-assets/kurzer-titel/bild-01.jpg",
        "alt": "Alternativtext",
        "caption": "Bildunterschrift",
        "width": "wide"
      },
      {
        "type": "gallery",
        "title": "Fotostrecke",
        "images": [
          {"path": "content/import-assets/kurzer-titel/bild-01.jpg", "alt": "Alternativtext"},
          {"path": "content/import-assets/kurzer-titel/bild-02.jpg", "alt": "Alternativtext"}
        ]
      }
    ],
    "tags": ["DFB-Pokal", "Brandenburg"],
    "seoDescription": "Maximal 160 Zeichen für Google und Social Sharing."
  }
}
```

## Body-Typen

- `p` – normaler Absatz
- `h2` – Zwischenüberschrift
- `h3` – kleine Zwischenüberschrift
- `blockquote` – Zitat
- `image` – Einzelbild, optional `width: "wide"` oder `"text"`
- `imagePair` – zwei Bilder nebeneinander (`left`, `right`, optionale gemeinsame `caption`)
- `gallery` – Fotostrecke mit mehreren Bildern
- `factBox` – Faktenkasten mit `items: [{"label": "...", "value": "..."}]`

## Tandemhopper-Regeln

- Haupttitel kurz halten, in der Regel 2–5 Wörter.
- Nur wenige Zwischenüberschriften; sie dürfen länger sein.
- Facebook-spezifische CTAs, Emojis und zeitgebundene Hinweise werden für die Website entfernt.
- Spieldatum gehört in `match.matchDate`; `publishedAt` bleibt das ursprüngliche Veröffentlichungsdatum des Artikels.
- Bilder bekommen sinnvolle Alt-Texte und möglichst knappe Bildunterschriften.
- Alte Archivartikel werden standardmäßig mit `featured: false` importiert.

Der Import ist idempotent: Unveränderte JSON-Dateien werden bei späteren Workflow-Läufen übersprungen. Wird die JSON-Datei geändert, wird ein neuer/aktualisierter Sanity-Entwurf erzeugt.
