# APD-136 – AD-Bean `gedrueckt` (Gedrückte Schaltfläche) – Vorschlag

Sitzung 0144, 20.11.2026. Kandidat aus Sitzung 0138 (Nutzer 19.11.2026): die gedrückten Schaltflächen als eine Bean – heute fünf lose Funktionen in
`v4/ui.js` (Zeile 1356–1372) und die Variable `dlgOpener`.

## Heute

| Funktion | Was sie tut | Aufrufe in der App (`index.html`) |
|---|---|---|
| `hold(sel)` / `release(sel)` | Schaltfläche bleibt blau, solange eine Aktion läuft (Teilen-Menü, Dateiauswahl, Meldung) | 2× / 6× (Backup laden, Teilen) |
| `setOpener(sel)` | Schaltfläche bzw. Zeile, von der ein Fenster kommt, bleibt blau, solange es offen ist (die vorige wird frei) | 9× (Mehr, Kachel, Tag, Fazit, Teilen, Neu …) |
| `markOpener()` / `markHeld(root)` | nach einem Neuaufbau wieder blau hinterlegen | 3× / 1× |

`ui.js` selbst: `dlg` beim Schließen gibt die Schaltfläche frei (`dlgOpener`), Fenster öffnen ruft `markOpener()`. Aussehen über die Klasse `on` (dieselbe
Tönung wie der Mehr-Knopf bei offenem Menü, R-3.3). Alle fünf Namen stehen in `v4/schnittstelle.json`.

**So macht es Apple:** HIG ‚Lists and tables‘ (https://developer.apple.com/design/human-interface-guidelines/lists-and-tables): „In general, a table that
helps people navigate through a hierarchy persistently highlights the selected row to clarify the path people are taking.“ Für Schaltflächen, die ein
Fenster oder das Teilen-Menü geöffnet haben, steht dort nichts – dass sie hervorgehoben bleiben, ist Vermutung (so in unserer Regel R-3.3 seit langem).

## Vorschlag

**Bean** `gedrueckt`, Bereich ‚Aktionen und Menüs‘ (im Katalog schon als ‚geplant‘), ein Exemplar für die ganze Seite – `ui.js` legt es einmal an
(`adGedrueckt = createGedrueckt(document.body)`), wie `hinweis`.

**Neue Zeile der Liste der AD-Beans (Designrichtlinie 15) – Wortlaut:**

| Kennung | Bereich | Anlegen | Eigenschaften (Standard) | Nur lesen | Methoden | Ereignisse | Regeln | Abschnitt |
|---|---|---|---|---|---|---|---|---|
| `gedrueckt` | Aktionen und Menüs | `createGedrueckt(wurzel)` | – | `gehalten` · `fensterQuelle` | `halten(sel)` · `loslassen(sel)` · `fensterVon(sel)` · `fensterZu()` · `auffrischen(wurzel)` | `geaendert` | R-3.3, R-8.1 | 4, 15.6 |

(Spaltenkopf ‚Anlegen‘ nach APD-136 Anlegen.) `gehalten` = Liste der gehaltenen Schaltflächen, `fensterQuelle` = die Schaltfläche bzw. Zeile des offenen
Fensters; `fensterZu()` gibt sie frei und nennt sie (für R-7.3 und den Fokus R-1.8); `auffrischen(wurzel)` hinterlegt nach einem Neuaufbau alle wieder;
`geaendert` meldet (sel, an) – für den Katalog.

**Entscheidungen** (je mit Empfehlung):

| | Frage | Empfehlung | Sonst |
|---|---|---|---|
| E-1 | Umfang | **nur die fünf Funktionen** und `dlgOpener` (wie im Kandidaten) | auch den Mehr-Knopf bei offenem Menü (`openMenu` setzt `on` selbst) – größer, später |
| E-2 | Aussehen | **Klasse `on` bleibt** – die Bean hat kein eigenes CSS, das Aussehen ist garantiert gleich (R-3.3 gilt für alle Tönungen gleich) | eigene Klasse `.ad-gedrueckt` mit eigenem CSS – doppelt zu `.on`, Bildvergleich nötig |
| E-3 | Aufrufe der App | **die fünf alten Namen bleiben als kurze Aufrufe** der Bean (wie `inform` bei `hinweis`) – `index.html` und `schnittstelle.json` unverändert | die App ruft `adGedrueckt.halten(…)` usw. – 21 Stellen in der App ändern |

**Katalog:** neue Datei `katalog/gedrueckt.js` – ‚Ausprobieren‘: Knopf ‚Fenster öffnen‘ (bleibt blau, bis das Fenster zu ist) und Knopf ‚Halten‘ (bleibt
blau bis ‚Loslassen‘); ‚Ereignisse‘ zeigt `geaendert`. Aus ‚geplant‘ wird eine Bean.

AD-Bean: `gedrueckt` (neu).

## Testfall-Liste (Testfall automatisch, Nummern gelten nur in dieser Datei)

| Nr. | Gerät · Lage | Handlung | Erwartet | Prüfung |
|---|---|---|---|---|
| H-1 | iPad quer, iPhone hoch | Mehr → ‚… einstellen‘ | Mehr-Knopf blau, solange das Fenster offen ist; nach x bzw. Häkchen nicht mehr | bestehend (R-3.3, `hig.mjs`) |
| H-2 | iPad quer | Kontextmenü der Kachel → ‚Einstellen‘ | Kachel blau, auch nach dem Neuaufbau der Seitenleiste; nach dem Schließen frei, dann 2 s Hervorhebung (R-7.3) | bestehend (App) |
| H-3 | iPad quer | Backup laden → Dateiauswahl abbrechen | Knopf blau während der Auswahl, danach frei | bestehend `backup-regeln` |
| H-4 | iPad quer, iPhone hoch | Teilen → Meldung schließen | Teilen-Knopf blau bis die Meldung zu ist | bestehend |
| H-5 | iPad quer → hoch | Fenster offen, drehen | die Schaltfläche bleibt blau (R-8.1) | bestehend Drehprüfung |
| H-6 | Prüfseite | `fensterVon` eines zweiten Knopfs, während der erste gilt | der erste wird frei, der zweite blau; `fensterQuelle` = zweiter | neu: Prüfseite Teil `fenster` |
| H-7 | Prüfseite | halten, Liste neu aufbauen, `auffrischen` | bleibt blau; `loslassen` → frei; `geaendert` je einmal | neu: Prüfseite Teil `fenster` |
| H-8 | – | Liste ↔ `ui.js` ↔ `katalog/gedrueckt.js` | `checkBeans` grün; Bean nennt kein CSS (keine Klasse unter `.ad-gedrueckt` nötig) | `doku-regeln` |
| H-9 | alle 4 Ansichten | Katalog: Bean öffnen, ausprobieren | lädt fehlerfrei, Knopf blau/frei wie erwartet, Ereignis im Protokoll, Grundregeln | `katalog.mjs` |
| H-10 | alle | voller Lauf | App unverändert, alle Prüfungen grün | voller Lauf |

**Gegenprobe:** die Bean hinterlegt nicht (`fensterVon` ohne `on`) → H-6 rot; `fensterZu` gibt nicht frei → H-6 rot.

**Testfall (User)** im Usertest: Katalog ‚Gedrückte Schaltfläche‘ am iPad ausprobieren; in der App ‚Teilen‘ antippen – der Knopf bleibt blau, bis die
Meldung zu ist.

## Entschieden (Nutzer 20.11.2026, Sitzung 0144, im Fenster)

- **E-1:** auch der Mehr-Knopf bei offenem Menü (`openMenu`) kommt in die Bean.
- **E-2:** Klasse `on` bleibt (kein eigenes CSS).
- **E-3:** die App wird auf die Bean umgestellt (21 Stellen in `index.html`, `schnittstelle.json` nachführen).
- Listenzeile und Testfall-Liste: offen – der Nutzer schreibt im Chat; beide werden nach E-1 und E-3 angepasst.
