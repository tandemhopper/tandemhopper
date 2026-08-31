# Tandemhopper

Groundhopping, Fankultur und Fußballreisen.

## Kalender-Entwürfe testen

Auf dem Branch `calendar-sanity-foundation` können drei klar markierte Kalender-Testentwürfe in Sanity angelegt werden:

```bash
npm run import:calendar
```

Dafür muss `SANITY_WRITE_TOKEN` gesetzt sein. Der Import veröffentlicht nichts automatisch; alle Testdokumente werden als Sanity-Drafts mit `[TEST]`-Kennzeichnung angelegt.
