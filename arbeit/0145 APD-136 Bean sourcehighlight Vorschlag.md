# APD-136 – AD-Bean `sourcehighlight` – Listenzeile und Testfall-Liste (zur Freigabe)

Sitzung 0145, 20.11.2026. Grundlage: `0144 APD-136 Bean gedrueckt Vorschlag.md` mit den Entscheidungen APD-136/E-1 (auch der Mehr-Knopf bei offenem Menü),
APD-136/E-2 (Klasse `on` bleibt), E-3 (App auf die Bean umstellen); Name `sourcehighlight` (Nutzer 0144); Namen nach Vorbild (Zusammenarbeit 1, freigegeben 0145).

## 1. Aufgabe

Die Schaltfläche, Zeile oder Kachel, **aus der etwas kommt** – ein Fenster, ein Menü, ein Untermenü, eine Sprechblase oder eine laufende Aktion (Teilen,
Dateiauswahl) –, bleibt blau getönt, bis es fertig ist (R-3.3), auch nach einem Neuaufbau und nach dem Drehen (R-8.1).

## 2. Heute in `v4/ui.js` (gelesen in dieser Sitzung)

| Stelle | Was sie tut |
|---|---|
| `hold(sel)` · `release(sel)` · `markHeld(root)` (Zeile 1358–1361) | laufende Aktion: Schaltfläche blau bzw. frei, nach Neuaufbau wieder blau |
| `setOpener(sel)` · `markOpener()` · `dlgOpener` (1364–1372, 108, Schließen des Fensters 2179) | Quelle des offenen Fensters; beim Schließen frei, danach Hervorhebung (R-7.3) und Fokus (R-1.8) |
| `openMenu`: `anchor.classList.add('on')` (886, 918) und `liveAnchor` (806) | Mehr-Knopf bzw. Schaltfläche des offenen Menüs; nach Neuaufbau wiedergefunden |
| Untermenü: `b.classList.add('on')` (932) | Eintrag, aus dem das Untermenü kommt |
| `confirmPop`: `anchor.classList.add('on')` (1035, 1049) | Schaltfläche, aus der die Sprechblase wächst |

## 3. Vorbilder (in dieser Sitzung gelesen)

- Apple `UIPopoverPresentationController.sourceItem` – „The item on which to anchor the popover.“
- Apple `UIControl.isHighlighted` – „A Boolean value indicating whether the control draws a highlight.“ → Web-Schreibweise ohne `is`: `highlighted`
- Web: Ereignis `change` (Wert hat sich geändert); `hold`/`release` und `refresh` haben kein Vorbild – `hold`/`release` sind die bestehenden englischen
  Namen in `ui.js` und bleiben

## 4. Neue Zeile der Liste der AD-Beans (Designrichtlinie 15) – Wortlaut

| Kennung | Bereich | Anlegen | Eigenschaften (Standard) | Nur lesen | Methoden | Ereignisse | Regeln | Abschnitt |
|---|---|---|---|---|---|---|---|---|
| `sourcehighlight` | Aktionen und Menüs | `createSourcehighlight(root)` | `sourceItem` (`''` – Auswahl der Quelle des offenen Fensters; setzen tönt sie und gibt die vorige frei, `''` gibt frei) | `heldItems` | `hold(item)` · `release(item)` · `refresh(root)` | `change` | R-3.3, R-4.13, R-8.1 | 4, 15.6 |

- `item` = CSS-Auswahl (z. B. `#side .side-row[data-id="…"]`) **oder** Element – das Element nutzen Menü, Untermenü und Sprechblase.
- `heldItems` = die gehaltenen Quellen (laufende Aktion, offenes Menü, Untermenü, Sprechblase).
- `refresh(root)` tönt nach einem Neuaufbau in `root` alle Quellen wieder (ersetzt `markOpener()` und `markHeld(root)`, auch `liveAnchor`).
- `change` meldet `{ item, highlighted }` – für den Katalog.
- Ein Exemplar für die ganze Seite: `ui.js` legt es einmal an (`adSourcehighlight = createSourcehighlight(document.body)`), wie `alert`.
- Aussehen: Klasse `on` (APD-136/E-2) – die Bean hat kein eigenes CSS.
- Was ui.js beim Schließen des Fensters dazu tut (Hervorhebung R-7.3, Fokus R-1.8), bleibt in ui.js; es liest die Quelle aus `sourceItem`.

AD-Bean: `sourcehighlight` (neu).

## 5. App umstellen (APD-136/E-3, `index.html` des Reiselogbuchs)

| Heute | Neu | Stellen (0144) |
|---|---|---|
| `setOpener(sel)` | `adSourcehighlight.sourceItem = sel` | 9 |
| `hold(sel)` · `release(sel)` | `adSourcehighlight.hold(sel)` · `adSourcehighlight.release(sel)` | 2 · 6 |
| `markOpener()` · `markHeld(root)` | `adSourcehighlight.refresh(root)` | 3 · 1 |

`v4/schnittstelle.json`: `hold`, `release`, `setOpener`, `markOpener`, `markHeld` fallen weg; `createSourcehighlight` und `adSourcehighlight` kommen dazu.
`row.classList.add('on')` in den Aktionen der App (z. B. beim Löschen aus dem Kontextmenü) wird `adSourcehighlight.hold(row)`.

## 6. Testfall-Liste (Testfall automatisch, Nummern gelten nur in dieser Datei)

| Nr. | Gerät · Lage | Handlung | Erwartet | Prüfung |
|---|---|---|---|---|
| S-1 | iPad quer, iPhone hoch | Mehr → ‚… einstellen‘ | Mehr-Knopf blau, solange das Fenster offen ist; nach x bzw. Häkchen frei | bestehend (R-3.3, `hig.mjs`) |
| S-2 | iPad quer | Kontextmenü der Kachel → ‚Einstellen‘ | Kachel blau, auch nach dem Neuaufbau der Seitenleiste; nach dem Schließen frei, dann 2 s Hervorhebung (R-7.3) | bestehend (App) |
| S-3 | iPad quer | Backup laden → Dateiauswahl abbrechen | Knopf blau während der Auswahl, danach frei | bestehend `backup-regeln` |
| S-4 | iPad quer, iPhone hoch | Teilen → Meldung schließen | Teilen-Knopf blau, bis die Meldung zu ist | bestehend |
| S-5 | iPad quer → hoch | Fenster offen, drehen | die Quelle bleibt blau (R-8.1) | bestehend Drehprüfung |
| S-6 | iPad quer, iPhone hoch | Mehr-Menü öffnen, schließen (daneben tippen, Esc, Eintrag wählen) | Mehr-Knopf blau, solange das Menü offen ist, danach frei; `heldItems` leer | bestehend (Menüprüfung) + neu: Prüfseite `heldItems` |
| S-7 | iPad quer | Untermenü öffnen und schließen | Eintrag blau, solange das Untermenü offen ist | bestehend (Untermenü) |
| S-8 | iPad quer, iPhone hoch | Löschen → Sprechblase → Abbrechen | Schaltfläche blau, solange die Sprechblase offen ist, danach frei | bestehend (`confirmPop`) |
| S-9 | Prüfseite | `sourceItem` eines zweiten Knopfs setzen, während der erste gilt | der erste frei, der zweite blau; `sourceItem` = zweiter; `change` je einmal | neu: Prüfseite Teil `fenster` |
| S-10 | Prüfseite | `hold`, Liste neu aufbauen, `refresh` | bleibt blau; `release` → frei; `change` je einmal | neu: Prüfseite Teil `fenster` |
| S-11 | – | Liste ↔ `ui.js` ↔ `katalog/sourcehighlight.js`; `schnittstelle.json` | `checkBeans` grün (auch die Namen englisch); `checkSchnittstelle` grün (App nutzt die alten Namen nicht mehr) | `doku-regeln`, `schnittstelle` |
| S-12 | alle 4 Ansichten | Katalog: Bean öffnen, ausprobieren | lädt fehlerfrei, Knopf blau/frei wie erwartet, Ereignis im Protokoll, Grundregeln | `katalog.mjs` |
| S-13 | alle | voller Lauf | App sieht unverändert aus, alle Prüfungen grün | voller Lauf |

**Gegenprobe:** die Bean tönt nicht (`sourceItem` ohne `on`) → S-9 rot; `release` gibt nicht frei → S-10 rot; ein deutscher Name in der Liste → S-11 rot.

**Testfall (User)** im Usertest: Katalog ‚Hervorgehobene Quelle‘ am iPad ausprobieren; in der App ‚Teilen‘ antippen – der Knopf bleibt blau, bis die
Meldung zu ist; Mehr-Menü öffnen – der Mehr-Knopf ist blau, bis das Menü zu ist.

## 7. Entschieden (Nutzer 20.11.2026, Sitzung 0145, im Fenster)

- **U-1: ja, alle drei** (Mehr-Knopf bei offenem Menü, Eintrag des Untermenüs, Schaltfläche der Sprechblase) in die Bean.
- **Listenzeile (Abschnitt 4) und Testfall-Liste S-1 bis S-13 freigegeben.**

## 8. Vorher offen (erledigt)

- **U-1 Umfang:** APD-136/E-1 nannte den Mehr-Knopf bei offenem Menü. Dieselbe Tönung setzt ui.js auch am Eintrag des Untermenüs und an der Schaltfläche der
  Sprechblase. Empfehlung: **alle drei in die Bean** – sonst setzt ui.js `on` für dieselbe Aufgabe weiter an zwei Stellen.
- Katalog-Name: ‚Hervorgehobene Quelle‘ (deutsch, wie ‚Hinweisfenster‘).
