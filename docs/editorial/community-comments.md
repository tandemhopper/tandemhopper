# Länderkompass-Community: Kommentare moderieren und beantworten

Der Community-Bereich ist auf **allen Länderführern** verfügbar, sobald die sichere Anbindung aktiviert ist. Macau zeigt ihn zwischen **Tipps & Tricks** und **Quellen & Stand**. Das Design und die Seitenränder stammen aus dem vorhandenen Tandemhopper-Raster.

## Einmalige Freischaltung

Die Website benötigt zum Speichern **nicht öffentlicher Kommentarentwürfe** einen Sanity-Schreibschlüssel. Bis dieser Schlüssel eingerichtet ist, wird der Community-Abschnitt bewusst nicht veröffentlicht – so erscheint kein kaputtes oder funktionsloses Formular.

1. Melde dich im Sanity-Projekt **90kx3kio** im [Sanity-Management](https://www.sanity.io/manage) an. Unter **Settings → API → Tokens** einen **Robot Token** anlegen; Bearbeitungsrechte im Projekt (idealerweise auf den Kommentar-Dokumenttyp eingeschränkt, andernfalls eine projektgebundene Editor-Rolle) reichen.
2. In **Vercel → tandemhopper → Settings → Environment Variables** eine *sensitive* Variable namens `SANITY_COMMENT_WRITE_TOKEN` hinzufügen, mit dem Token als Wert, Ziel **Production**. Für Testumgebungen bei Bedarf zusätzlich **Preview** aktivieren.
3. Anschließend die aktuelle Produktion erneut deployen. Der Community-Bereich wird dann automatisch sichtbar.
4. Zum Abschluss mit einem eigenen Testkommentar prüfen: Er muss als **Entwurf** im Studio erscheinen, darf zunächst **nicht öffentlich** zu lesen sein und wird erst nach Freigabe sichtbar.

**Niemals einen Sanity-Token in einen Chat, GitHub oder Client-Code kopieren.** Er darf ausschließlich als geschützte Server-Umgebungsvariable gespeichert werden.

## So funktioniert die Moderation

- **Besucher:** Name/Pseudonym, Thema und Kommentar eingeben; Veröffentlichung bestätigen. Keine Registrierung oder E-Mail-Adresse erforderlich.
- **Studio → Länderkompass → Community · Kommentare & Antworten:** Neue Beiträge stehen als **Entwürfe** in der Dokumentliste.
- **Freigeben:** Beitrag öffnen, bei Bedarf redaktionell prüfen, anschließend **Publish / Veröffentlichen**. Erst dann erscheint der Beitrag im öffentlichen Länderkompass.
- **Antworten:** Im Feld „Antwort von Tandemhopper“ antworten, dann veröffentlichen. Die Antwort steht unter genau diesem Kommentar.
- **Nachträglich ändern:** Kommentar oder Antwort im Studio bearbeiten und erneut veröffentlichen. 
- **Spam / beleidigende Beiträge:** Unveröffentlichten Entwurf löschen. Bereits veröffentlichte Beiträge bei Bedarf zurückziehen oder löschen.
- **Länderspezifisch:** Jeder Kommentar erhält automatisch den Länder-Slug; auf der Website erscheinen nur die zu diesem Land gehörenden freigegebenen Kommentare.

## Öffentliches Verhalten

- Leser können alle **freigegebenen** Kommentare und die jeweiligen Tandemhopper-Antworten sehen.
- Sortierung: neueste Beiträge zuerst, zunächst 30 Kommentare; weitere lassen sich nachladen.
- Inhalte werden als **reiner Text** dargestellt, nicht als HTML.
- Texte und Antworten werden nur nach redaktioneller Freigabe angezeigt.
- Es werden keine E-Mail-Adressen verlangt und keine IP-Adressen in Sanity-Dokumenten gespeichert.
- Formulare besitzen Größenlimits, Honeypot, zeitbasierte Signatur und eine einfache, pro Instanz begrenzte Absender-Sperre. Für stärkeres Spamaufkommen zusätzlich Vercel-WAF-Regeln oder Captcha aktivieren.

## Technischer Aufbau

- Sanity-Schema: `countryComment`; unveröffentlichte Einreichungen liegen als `drafts.countryComment.<UUID>` vor.
- Serverseitige API: `/api/country-comments?country=<slug>` (GET liest ausschließlich veröffentlichte Beiträge, POST speichert **Drafts**).
- Serverseitiger Token: `SANITY_COMMENT_WRITE_TOKEN` (nur Server, niemals `NEXT_PUBLIC_`).
- Frontend: `components/CountryCommunity.js`; Layout: `app/country-community.css`.
- Ohne aktivierten Schlüssel blendet die Website den Abschnitt automatisch aus. Leser sehen keinen funktionslosen Senden-Button.
