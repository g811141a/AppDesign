# A-06 Offline-Hinweis – Muster und Fall-Liste

Stand 15.10.2026 · Sitzung Reiselogbuch 0005 · **Entschieden: Variante c als allgemeine Regel** (Ergänzung R-1.5)

## Apple-Abgleich

| App | Verhalten offline |
|---|---|
| Musik | Band oben ‚Du bist offline‘ mit Hinweis, was weiter geht |
| Mail | Zustand klein und grau unten in der Liste |
| Notizen, Erinnerungen | nichts – arbeiten lokal, gleichen später ab |

HIG ohne eigene Seite zu ‚offline‘; zutreffend: *Feedback* (Zustand ruhig zeigen) und *Writing* (sagen, was weiter geht).
Regeln: R-1.5 (ergänzt), R-1.1 (ein Baustein für Seitenleiste und Startliste), R-2.1 (keine Leiste verschiebt sich),
R-4.2 (Kontextmenü über der Backup-Kachel – jetzt samt Zeile), R-4.3 (Meldung ist kein Fenster), R-8.1 (Drehen),
R-10.1/R-10.2 (Text, 13 pt grau, Kontrast hell und dunkel).

## Variante c

1. **Dauer-Anzeige:** solange offline, unter der Backup-Kachel (Seitenleiste iPad, Startliste iPhone) eine graue Zeile,
   13 pt, Icon `wifi-off`: **‚Offline – alles bleibt auf diesem Gerät‘**. Online: keine Zeile.
2. **Kurze Meldung beim Wechsel:** weiße Karte unten (wie die Backup-Kachel schwebend), mittig im freien Bereich neben
   einer sichtbaren Seitenleiste, mit Abstand zu ‚Nach oben / Ans Ende‘; verschwindet nach etwa 4 s, Antippen schließt
   sie; fängt sonst keine Berührung ab.
   - offline: **‚Du bist offline‘** · darunter grau ‚Die App arbeitet weiter; alles bleibt auf diesem Gerät.‘
   - online: **‚Wieder online‘** (Icon `wifi`).
3. **Erkennen:** ‚Netz aus‘ über Safari (`navigator.onLine`, `offline`/`online`); ‚Netz hängt‘ über den Service Worker
   (liefert nach 3 s aus dem Speicher und meldet das der Seite). Wieder online nach ‚hängt‘: beim nächsten
   erfolgreichen Abruf (z. B. Rückkehr in die App).

Muster-Bilder: c1 iPad quer dunkel · c2 iPad hoch hell (Seitenleiste darübergelegt) · c3 iPhone Startliste ·
c4 iPhone Inhalt ‚Wieder online‘.

## Fall-Liste (jeder Fall ein automatischer Test, Prüfung `offline.mjs` erweitert – eine Prüfung je Regel)

| Nr. | Gerät / Lage / Darstellung | Handlung | Erwartet |
|---|---|---|---|
| F-1 | iPad quer, hell und dunkel | online → offline | Zeile erscheint unter der Backup-Kachel, Meldung ‚Du bist offline‘ mittig im Inhalt, nach 4 s weg |
| F-2 | iPad quer | offline → online | Zeile verschwindet, Meldung ‚Wieder online‘ |
| F-3 | iPad hoch, Seitenleiste darübergelegt / ausgeblendet | online → offline | Meldung im freien Bereich, überdeckt weder Zeile noch ‚Nach oben / Ans Ende‘; ausgeblendet: Meldung mittig, Zeile beim Einblenden da |
| F-4 | iPad quer, Seitenleiste mit panel-left ausgeblendet | Wechsel | Meldung mittig über die ganze Breite |
| F-5 | iPhone hoch und quer, Startliste | Wechsel | Zeile unter der Backup-Kachel, Meldung unten mittig über dem Home-Balken |
| F-6 | iPhone hoch, Inhaltsseite | Wechsel | Meldung unten mittig; Zeile beim Zurück in die Startliste da |
| F-7 | alle | **Start ohne Netz** | App erscheint (R-1.5), Zeile da; Meldung ‚Du bist offline‘ einmal (entschieden: ja) |
| F-8 | alle | **Start bei hängendem Netz** | nach höchstens 3 s App mit Zeile (Service Worker meldet ‚aus dem Speicher‘) |
| F-9 | alle | Wechsel schnell hin und her | nur eine Meldung zugleich, die letzte gilt; Zeile zeigt den letzten Zustand |
| F-10 | iPad, iPhone | Drehen während Meldung bzw. Zeile sichtbar | Meldung neu ausgerichtet, Zeile bleibt (R-8.1) |
| F-11 | alle | Wechsel bei offenem Fenster, Menü oder Sprechblase | Meldung erscheint, sperrt nichts; Fenster bleibt bedienbar (R-1.4) |
| F-12 | iPhone, iPad | Wechsel bei offener Tastatur | Meldung über der Tastatur (`--vv-bottom`), Leisten unverändert (R-2.1) |
| F-13 | alle | lange Liste (viele Einträge) offline | Kacheln laufen hinter Backup-Kachel **und** Zeile durch, letzter Eintrag erreichbar (R-7.1) |
| F-14 | alle | Kontextmenü der untersten Kachel offline | ganz über Backup-Kachel samt Zeile (R-4.2) |
| F-15 | hell und dunkel | offline | Kontrast Zeile und Meldungstext ≥ 4,5 : 1, Schrift ≥ 13 pt (R-10.2); Grundregeln (hig.mjs) nach jedem Schritt |
| F-16 | Backup-Kachel gelb und weiß (`.ok`) | offline | Zeile in beiden Fällen gleich |

**Nur am Gerät (Prüfliste):** Flugmodus ein/aus am iPad und iPhone (Zeile und Meldungen), schlechtes WLAN, Start aus
dem Home-Bildschirm im Flugmodus.

## Entschieden (15.10.2026)

1. Muster ok – ja.
2. Meldung ‚Du bist offline‘ auch beim Start ohne Netz – ja.
3. Meldung ‚Wieder online‘ – ja.
4. Fall-Liste F-1 bis F-16 vollständig – ja.
