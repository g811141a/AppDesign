# 0137 – AD-Bean `hinweis`, `markHeld`, Absicherung ‚allgemein = AD-Bean‘, J-19

**Stand 19.11.2026** · Sitzung 0137 · Grundlage: Nachtrag aus 0136 (`UEBERGABE.md`, `arbeit/0136 AD-Bean zuerst.md`, `main` 1eea96f) ·
Version AppDesign 4.64.0 / Reiselogbuch 3.57.7 (Vorbereitung)

## Stand der Vorbereitung

Alle Ergebnisse unten stammen aus Läufen dieser Sitzung in Chromium.

- **B-4.1 verdrahtet:**
  - `ReiseLogBuch/tests/schnittstelle-regeln.mjs` ist neu und steht im Vorlauf von `lauf.mjs`. Sie läuft nur im ersten Browser.
  - `lauf-selbsttest` hat den neuen Fall S-6. Er ist grün, gegen `lauf.mjs` 4.63.0 rot.
  - S-1 (erfundener Name in einer Kopie der Liste) ist rot.
  - `schnittstelle.json` gehört jetzt zur festen Fassung (`tests/version.mjs`).
- **B-4.2 umgesetzt:**
  - `placeDialogs` steht als letzter `resize`-Hörer in `ui.js`, die App ruft es nicht mehr auf.
  - `markHeld(root)` ist neu. Die App nutzt es statt `held.forEach`.
  - Die App ruft `setOpener('#shareBtn')` statt `dlgOpener =`.
  - `capNext` und die drei `delete f.dataset.capNext` sind gestrichen.
  - ‚Bewegung reduzieren‘ wird einmal abgefragt (`bewegungRuhig`).
  - Das ⓧ-SVG steht einmal in `ui.js` (`FX_SVG`), die App nutzt es in beiden Suchzeilen.
  - Kopf von `ui.js`: Z. 3–4 sind gestrichen, dazu ein Verweis auf `schnittstelle.json`.
  - `schnittstelle` meldet die App 3.57.7 als ‚alles in Ordnung‘.
- **Gegenproben:**
  - S-8 und S-10 wurden mit einer Prüfkopie von `ui.js` zuerst gegen die vorhandenen Prüfungen versucht. Sie blieben **grün**.
  - Grund für S-8: `placeDialogs` läuft auch über das `resize` von `visualViewport`.
  - Grund für S-10: Kein Ablauf baute die Seitenleiste bei gehaltenem Knopf neu auf.
  - Deshalb gibt es zwei neue feste Fälle:
    - **S-8** in `ablauf-fenster`: Hinweisfenster verschoben, nach `resize` wieder am Platz. Mit der Prüfkopie rot.
    - **S-9** in `backup-regeln`: Backup aus dem Mehr-Menü. Die Seitenleiste wird nachweislich neu aufgebaut, der Mehr-Knopf bleibt blau und ist nach dem Schließen nicht mehr blau. Mit `markHeld` ohne Wirkung rot (= S-10).
- **`setOpener('#shareBtn')`, sichtbare Änderung:** keine.
  - `setOpener` beendet eine noch laufende Hervorhebung einer Zeile (`endReveal`, APD-23), wie bei jedem anderen Fenster.
  - Nach dem Teilen-Menü ist sie längst vorbei (2 s + 1 s). Den Rest tat schon `openDialog`.
- **J-28:** `.iconbtn` ist aus `design.css` und Designrichtlinie 15.1 gestrichen.
- **APD-138:**
  - R-10.8 steht im bestätigten Wortlaut (aus dem Verlauf von 0136, Bestätigung 12:29 UTC; jetzt auch in der Testfall-Liste).
  - `checkDateiname` misst am iPad Grund- und Höchstbreite und prüft eine Zeile. Neu ist `checkHinweisBreite` mit D-3 bis D-6, D-9 und D-10.
  - `backup-regeln` ist grün. Die Gegenprobe D-10 (ohne Breite nach Dateiname) meldet D-1.
  - **Befund beim Bauen:** `dialog` ist in `design.css` auf 90vw begrenzt. Die Bean hebt das wie `dialog.wide` auf, sonst blieb das Fenster bei Text 53 schmaler als die Höchstbreite.
- **Bestätigte Wortlaute eingetragen:** R-1.14, Designrichtlinie 14, AppDesign-`README.md`, 15.1, R-10.8.

## 1. AD-Bean `hinweis` – Schnittstelle und Zeile in der Liste der AD-Beans (0 Nr. 29)

So ist sie gebaut (`v4/ui.js`): `createHinweis(fenster, { breiteNachDateiname = true })` macht `<dialog id="msg">` zur Bean (`data-ad-bean="hinweis"`).
`ui.js` legt die eine Bean selbst an (`adHinweis`). `inform(titel, html, { wide, action })` bleibt der kurze Aufruf, die App ändert sich nicht.

- **Eigenschaft `breiteNachDateiname`** (lesen und setzen, Standard ein): Steht ein Dateiname (`.fname`) im Text, wird das Fenster am iPad so breit, dass er in
  einer Zeile steht. Es ist mindestens so breit wie die Grundbreite von `#msg` und höchstens so breit wie `#msg.wide`.
  - Am iPhone und im breiten Fenster bleibt es bei der Breite aus `design.css`.
  - Die Breite wird bei jedem `resize` neu berechnet (Drehen, Textgröße).
- **Nur lesen:** `offen`.
- **Methoden:** `zeigen(titel, html, { breit, aktion })` → Promise, erfüllt beim Schließen · `schliessen()`.
- **Ereignis:** `zu`.
- **Schnittstellenliste:**
  - Teil `app`: neu `createHinweis` (wie `createSwipeactions`) und `FX_SVG`.
  - Teil `pruefungen`: neu `adHinweis`, für die Gegenprobe D-10.
- **CSS:** keine neue Regel. Die Breite setzt die Bean am Element selbst. Das bisherige CSS von `#msg` bleibt, wie es ist, und wird mit APD-136 auf `.ad-hinweis` umgestellt.

**Neue Zeile in der Liste der AD-Beans (Designrichtlinie 15)**, nach `swipeactions`:

> | `hinweis` | Fenster und Meldungen | `createHinweis(fenster, …)` | `breiteNachDateiname` (ein; wirkt nur am iPad) | `offen` | `zeigen(titel, html, { breit, aktion })` · `schliessen()` | `zu` | R-10.8, R-1.8, R-4.3 | 7, 10 |

**Ergänzung der Testfall-Liste APD-138:**

| Nr. | Fall | Erwartet | Prüfung |
|---|---|---|---|
| D-12 | Bean `hinweis` in Liste und `ui.js` (Fabrik, `data-ad-bean`, Eigenschaft = Parameter) | `checkBeans` grün; ohne Listenzeile rot (W-72) | `doku-regeln` |
| D-13 | `inform` unverändert: alle Hinweisfenster (Backup, Abgleich, offline, Abgleichbericht) wie bisher | bestehende Prüfungen grün | voller Lauf |
| D-14 | `breiteNachDateiname = false` | Fenster wie in 4.63.0, `checkDateiname` meldet D-1 (= D-10) | `checkHinweisBreite` |

## 2. `markHeld` und `FX_SVG` – AD-Bean oder bewusst ohne?

- **Empfehlung: bewusst ohne AD-Bean** (im CHANGELOG ‚AD-Bean: keine, weil …‘). Gründe:
  - `markHeld` gehört zur losen Gruppe ‚gedrückte Schaltflächen‘ (`hold`, `release`, `setOpener`, `markOpener`). Eine Bean hieße, die ganze Gruppe samt der Aufrufe in der App umzubauen – das liegt außerhalb des bestätigten Umfangs (B-4.2: nur innere Nutzungen ersetzen).
  - `FX_SVG` ist nur das Zeichen ⓧ, kein Element mit Verhalten.
  - Beide kommen als Kandidaten in APD-136.
- **Sonst:** eine neue Bean (z. B. `gedrueckt`) für die Gruppe, in einer späteren Version.

## 3. Absicherung ‚allgemein = AD-Bean‘ – Wortlaut (0 Nr. 29)

**Zusammenarbeit 0, Kasten ‚Immer‘ – alt:**

> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Testfall-Liste vor jedem Bau (Nr. 1) ·
> Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) · Regeln nur mit Genehmigung (Nr. 29) · ohne Auftrag nach dem Lagebild die
> Startfrage (Nr. 19).

**neu:**

> **Immer:** nie ohne ‚Ja‘ bauen (Nr. 21) · erst Usertests, dann Neues (Nr. 22) · Testfall-Liste vor jedem Bau (Nr. 1) ·
> allgemein = AD-Bean (R-1.13, Nr. 25) · Sammelversionen (Nr. 8) · nur Belegtes (Nr. 27) · Regeln nur mit Genehmigung (Nr. 29) ·
> ohne Auftrag nach dem Lagebild die Startfrage (Nr. 19).

**Zusammenarbeit 0 Nr. 25, letzter Satz – alt:** ‚Prüfung: Selbstkontrolle.‘

**neu:** ‚Prüfung: Selbstkontrolle; ändert eine AppDesign-Version `ui.js` oder `design.css`, nennt ihr CHANGELOG-Eintrag je Thema (fetter Absatz) eine Zeile
‚AD-Bean: `<kennung>` (neu | neue Eigenschaft …)‘ oder ‚AD-Bean: keine, weil …‘ – sonst bricht `veroeffentlichen.mjs` (`los`) vor dem Prüflauf ab (Selbsttest).‘

- **Wann geprüft:** in `los`, nicht schon in `vorbereiten`. Grund: Beim `vorbereiten` ist der neue CHANGELOG-Eintrag noch nicht geschrieben. `vorbereiten` erinnert in seiner Schlusszeile daran.
- **Selbsttest:**
  - Fehlt die Zeile bei geändertem `ui.js`, bricht `los` ab.
  - Mit der Zeile läuft es weiter.
  - Ohne Änderung an `ui.js` und `design.css` wird nichts verlangt.
  - Gegenprobe: Das Skript prüft die Zeile nicht – dann muss der erste Fall rot werden.
- **Versionen:** Zusammenarbeit 3.16.0 → 3.17.0, AppDesign-Skript in 4.64.0.

## 4. J-19 – Ergebnis und Wortlaut

- **Ergebnis:** Den Rückfall ohne Rollbereich braucht `ui.js` weiter.
  - `rolle.y`, `rolle.max`, `rolle.to`, `TITEL_OBEN`, `seitenHoehe`, `randOben` und `placeDialogs` fragen ab, ob es einen Rollbereich gibt.
  - Im Reiselogbuch hat `#app` keinen Rollbereich in der Startliste am iPhone und am iPad ohne gewählte Reise: `index.html` setzt dort `app.innerHTML = ''`.
  - Der Grund ‚(ältere Apps)‘ im Satz stimmt also nicht, der Satz selbst schon.
- **Designrichtlinie 15.22 – alt:** ‚Ohne Rollbereich rollt wie bisher das Fenster (ältere Apps).‘
- **neu (Empfehlung):** ‚Ohne Rollbereich (`#app` ohne `.rolle`, z. B. die Startliste am iPhone) beziehen sich `rolle` und `onRoll` auf das Fenster.‘

## Danach

Texte (CHANGELOG mit Usertest /0 und /1, Backlog, Versionsgeschichten), `fassung`, `stufe`, Bericht und dann die Bau-Frage (Stufe voll).
