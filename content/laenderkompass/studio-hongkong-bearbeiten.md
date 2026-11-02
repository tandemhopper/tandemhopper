# Hongkong – Guide im Sanity Studio bearbeiten

**Webseite:** https://tandemhopper.de/laender/hongkong

**Studio:** https://tandemhopper.de/studio → **Länderkompass → 🇭🇰 Hongkong bearbeiten**.

Beim ersten Öffnen des Dokuments sind alle Ausgangstexte, neun Spartipps, sieben Groundbesuche, 17 Bildstellen, die Saisonangaben und die Quellenlinks vorausgefüllt. **Einmal „Veröffentlichen“ wählen**, anschließend lassen sich einzelne Passagen direkt im Studio ändern. Öffentliche Änderungen sind normalerweise nach etwa einer Minute sichtbar. Solange kein veröffentlichtes Studio-Dokument existiert, verwendet der Länderführer die geprüften Startinhalte aus dem Code.

## Reiter und Zuständigkeiten

- **01 · Titel & Einstieg:** Bildunterschriften bitte unter Fotos, Texte hier.
- **02 · Spiele & Saisons:** „Wann wird gespielt?“ mit 12 Monatsfeldern, Saisonarchiv, Quellen, außerdem sieben bearbeitbare Groundbesuche samt Ergebnis.
- **03 · Stadien & Grounds:** HKFC, Happy Valley, Kai Tak, Mong Kok, kleinere Grounds.
- **04 · Nationalmannschaft & Fans:** persönliche Eindrücke des Hongkong–Kambodscha-Finales.
- **05 · Anreise, ÖPNV, Stadt:** Shenzhen, Immigration, Octopus, SIM/eSIM, The Peak, Sehenswürdigkeiten.
- **06 · Tipps & Tricks:** Tipps einzeln bearbeiten, verschieben, löschen oder neue anlegen. Quellenlinks sind optional.
- **07 · Fotos & Bildtexte:** Alle 17 Bildplätze separat; Bildwechsel optional, Alt-Text und Bildunterschrift auch ohne neuen Upload editierbar.
- **08 · Quellen & Stand:** Bezeichnungen und Links ändern; Überprüfungsdatum setzen.
- **Community:** Leserkommentare kommen unter „Länderkompass → Community · Kommentare & Antworten“ als nicht veröffentlichte Entwürfe an. Beim Veröffentlichen werden Beitrag und redaktionelle Antwort auf der Hongkong-Seite sichtbar, wie bei Macau.

## Fakten, die regelmäßig zu prüfen sind

- **HKFA-Spielplan** ist die Primärquelle: https://www.hkfa.com/en/competitions/fixtures
- **Saison** üblicherweise August bis Mai. Die Saison 2026/27 ist am 02.11.2026 noch nicht abgeschlossen; geplante Spieltermine im Mai 2027 sind keine bereits absolvierten Spieltage.
- **Grenzzeiten** Futian/Lok Ma Chau 06:30–22:30, Lo Wu/Luohu 06:30–24:00, Huanggang 24h, jeweils nicht identisch mit MTR-Fahrzeiten. Quelle: https://www.immd.gov.hk/eng/contactus/control_points.html
- **Einreisevisum** in Festlandchina: Die am 02.11.2026 bekannte Visumbefreiung für deutsche Staatsangehörige läuft zunächst bis Ende 2026; keine unbewiesene Regelung für 2027 versprechen.
- **FIFA-Weltrangliste Männer:** 153. Platz, Stand 07.10.2026. Quelle: https://inside.fifa.com/fifa-rankings/world-ranking/HKG
- **HKFA Cup-Finale 03.10.2026:** Im Guide korrekt als **FIFA ASEAN Challenge Cup, 2:0 gegen Kambodscha, 31.374 Zuschauer** bezeichnet. Quelle: https://www.hkfa.com/competitions/result/51102/detail
- Eigene Erfahrungen sind keine allgemeingültigen Eintritts-/Preisgarantien, besonders bei privaten Schulen und Sportclubs.

## Bilder und Nutzerrechte

15 **Originalfotos des Autors** liegen optimiert unter `public/assets/laender/hongkong/` im Repository. Die Screenshots seiner Groundliste dienen nur der Verifikation und werden **nicht** öffentlich ausgestellt. Die Bearbeitung im Studio greift auf alternative Sanity-Mediendateien zurück, wenn der Nutzer ein neues Bild hochlädt. Das alte Foto bleibt sonst bestehen.

## Technik

- Seite: `components/HongkongEditorialPage.js`
- Design: `app/hongkong-editorial.css` als Erweiterung der bekannten `app/macau-editorial.css`
- Inhalte/Fallback: `lib/hongkongEditableDefaults.js`
- Studio: `sanity/schemaTypes/hongkongEditorialSettings.js`
- Abfrage: `lib/hongkongEditorialSettings.js`
- Veröffentlichung unter `/laender/hongkong`: spezielle Route innerhalb `app/laender/[slug]/page.js`, da vor dem ersten Studio-Publishing kein zusätzliches generisches `countryGuide`-Dokument erforderlich ist.
