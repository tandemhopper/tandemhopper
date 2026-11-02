# Tandemhopper · verbindliches Seitenraster

**Ziel:** Jede neue Seite wirkt wie ein Teil derselben Website. Die sichtbaren linken und rechten Grenzen der Hauptbereiche sind fest, nicht pro Abschnitt frei geschätzt.

## Gemeinsame Außenkante

- Seiten-Container: maximal **1536 px** breit, immer mittig
- Sicherheitsabstand bis 1100 px: **48 px** pro Seite
- Von 1100 px bis 760 px: **24 px** pro Seite
- Mobil unter 760 px: **20 px** pro Seite
- Umsetzung über `--site-page-max`, `--site-page-gutter` und optional `.site-page-rail`.

Im Standardraster liegen **Navigationsleiste / Kopfbereich, Überschriften, Bildkanten, Infoboxen, Inhaltsbeginn und untere Navigation** auf derselben vertikalen Seite. Substanzielle Abweichungen sind bewusst zu gestalten; nicht bei jeder Section eine neue `max-width` und andere seitliche `padding`-Werte erfinden.

## Zulässige Unterbrechungen des Rasters

- Lesetexte bleiben **schmaler** als ein großes Foto (maximal ca. 780 px): Ihr Beginn orientiert sich trotzdem an der Kante ihrer zugehörigen Content-Spalte.
- Zweispaltige Layouts mit fixer Seitenleiste (z. B. Inhaltsverzeichnis) haben ein gemeinsames äußeres Raster; die Textspalte beginnt dann **sichtbar und logisch innerhalb** dieses Rasters.
- Fotos dürfen auf Smartphones bewusst randlos laufen. Die Entscheidung gilt über die gesamte dazugehörige Fotosektion, nicht zufällig bei jedem dritten Foto.
- Infoboxen dürfen einen Innenabstand haben; die **Außenkante** stimmt mit den anderen Hauptbereichen überein.

## Praktische Umsetzung

- `app/globals.css` stellt das globale Raster bereit.
- `app/macau-editorial.css` orientiert den Länderkompass an diesem Raster, ohne seine etablierte Schriftwelt oder Gestaltungslogik zu verändern.
- `app/site-grid.css` gibt Startseite, Archiv, Bildrastern und Footer dieselben Sicherheitsabstände.
- Neue Seiten verwenden zunächst `.site-page-rail` für die äußere Struktur und setzen Lesespalten bewusst **innen**.
- Bestehende fremde Seitentypen werden bei ihren nächsten Designänderungen auf dieses Raster migriert, nicht blind mit einer globalen Überschreibung verändert.

## Qualitätssicherung

Bei 360, 390, 768, 1024, 1440 und 1920 px den linken/rechten Rand der sichtbaren Bereiche prüfen. Für gleichrangige Container soll die Start-/Endposition jeweils praktisch identisch sein (±1 px). Horizontaler Overflow, abgeschnittene Überschriften und versehentlich verschobene Infoboxen sind Fehler.
