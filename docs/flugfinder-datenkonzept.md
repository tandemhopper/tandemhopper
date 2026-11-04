# Tandemhopper Flugfinder – Datenfreigabe und Ausbau

Der Flugfinder unter `/flugfinder` ist ein **Pilot**, keine vollständige Streckendatenbank.

## Datenmodell (für CSV/JSON-Import)
Je Direktverbindung:
- `airline`: `Ryanair` oder `easyJet` (ggf. `easyJet Europe`, `easyJet Switzerland` intern als Alias)
- `origin_iata`, `destination_iata`: drei Buchstaben, **konkrete Flughafen-Codes**, nicht Städtenamen
- `valid_from`, `valid_to`: Datum oder belegte Saisongültigkeit
- `status`: angekündigt / buchbar / in Betrieb / saisonal / eingestellt
- `verified_at`: Zeitpunkt der letzten Prüfung
- `source_url`: offizielle Streckenliste oder anderer lizenzierter Beleg
- `source_type`: airline / airport / lizenzierter Flugplandatenanbieter
- `source_license`: Nutzungserlaubnis, besonders bei Massendaten beachten

## Regeln
1. Keine Verbindung als aktuell markieren, nur weil sie irgendwann angekündigt wurde.
2. Winter und Sommer separat prüfen. Noch nicht gestartete Verbindungen kenntlich machen.
3. Flughäfen aus OurAirports (Public Domain) nach IATA/ICAO mit WGS84-Koordinaten abgleichen; Sonderfälle wie BSL/MLH/EAP, Weeze/NRN und Charleroi/CRL manuell prüfen.
4. Nicht verfügbare Angaben nicht schätzen. Flüge bei Ryanair und easyJet können schnell geändert oder eingestellt werden.
5. Für Lizenzfragen keine fremden kommerziellen Routendatenbanken vollständig kopieren.
6. Bei Fehlern letzte erfolgreiche Datenausgabe weiter anzeigen, aber `verified_at` und Warnung prominent halten.

## Ausbau
- Filter: Abflughafen, Airline, Zielland, Saison, Suche
- Standort/Radius: gesonderte Umkreissuche, geografische Distanz Luftlinie oder Straßenreisezeit mit Verkehrsanbieter
- Fußball: Clubs, Ligen, Stadion-Grounds, Spielkalender als eigenständige Datenebene, nie mit Routendaten vermischen
- Benachrichtigung: neue/gestrichene Verbindungen im News-Radar
- Darstellung: gefilterte Linien farbig, übrige grau; nur wenige Layergruppen und Marker für Performance

Offizielle Nachschlagequellen:
- https://www.ryanair.com/gb/en/flights
- https://www.easyjet.com/en/routemap
- https://ourairports.com/data/

**Nicht zur Live-Veröffentlichung freigeben**, bevor die vollständige Airline-Routenliste eingepflegt und auf Aktualität/Lizenz geprüft wurde.
