# APD-135 Paket 6, Schritt 1 (B-4.1, B-4.2) – Vorschlag mit Wortlaut und Testfall-Liste

**Stand 19.11.2026** · Sitzung 0136 · **Umfang, Wortlaut und Testfall-Liste bestätigt (Nutzer 19.11.2026, im Fenster)** · Grundlage: `arbeit/APD-135 Konsolidierung 3 Befund und Plan.md` (Paket 6, B-4.1, B-4.2, W-53, W-56) und die
Entscheidungen aus Sitzung 0123: APD-135/J-31 (B-4.1, B-4.2, dann B-3.1 und B-3.2, je mit Gegenprobe), J-28 (`.iconbtn` mit Doku streichen, `.lcount`
behalten), J-19 (in Paket 6 prüfen, ob der Rückfall ‚Ohne Rollbereich rollt das Fenster‘ gebraucht wird), J-32 (Allgemeines aus der App nach AppDesign: eigenes
Thema nach B-3).

## Umfang und Version

- **Sammelversion AppDesign 4.64.0 / Reiselogbuch 3.57.7** mit zwei Themen (0 Nr. 8): **APD-135 Paket 6 Schritt 1** und das bereite **APD-138**
  (`arbeit/APD-138 Testfall-Liste.md`). B-3.1 und B-3.2 folgen als Schritt 2 in einer eigenen Version (je Schritt eine Version, Plan).
- **Prüfstufe:** voll (Code in AppDesign und in der App).
- **Risiko:** sehr gering (Plan). Die App ändert sich in Bedienung und Aussehen nicht.

## Inhalt

**B-4.1 – Schnittstellenliste und statische Prüfung** (U-37 Nr. 1)
1. Neue Datei `v4/schnittstelle.json`: die öffentlichen Namen von `ui.js` in zwei Teilen. `app` enthält, was eine App nutzen darf, heute die Namen, die das
   Reiselogbuch nutzt (69, U-8), ohne die drei inneren. `pruefungen` enthält, was nur Prüfungen zusätzlich nutzen dürfen (Safari-Modell und Messung schreiben
   in innere Variablen, U-12, U-13; z. B. `isOffline` in `hig.mjs`).
2. Neue Prüfung `tests/schnittstelle.mjs` (ohne Browser, im Vorlauf neben `doku-regeln`). Sie zerlegt `ui.js`, das Skript der App und die Prüfdateien und meldet:
   - jeden Namen von `ui.js`, den die App nutzt und der nicht in `app` steht,
   - in Prüfdateien jeden, der weder in `app` noch in `pruefungen` steht,
   - jede Namensgleichheit einer Deklaration der App (`function`, `let`, `const`, `var`, `class`) mit einem der Namen von `ui.js` (U-34 Nr. 4),
   - jeden Namen der Liste, den es in `ui.js` nicht gibt.
   Die Meldung nennt Regel, Datei, Zeile und Namen.

**B-4.2 – die drei inneren Nutzungen beheben, toter Code, Kopf** (U-11, W-56, W-53)
3. `placeDialogs()` ruft `ui.js` selbst bei jedem `resize` auf, und zwar zuerst, wie heute die erste Zeile im `resize`-Hörer der App. Die App ruft es nicht mehr
   auf (`index.html` Z. 2119).
4. Statt `held.forEach(…)` in `renderSide` (Z. 1155) gibt es die neue öffentliche Funktion `markHeld(root)`: sie hinterlegt die gedrückten Schaltflächen in
   `root` wieder blau.
5. Statt `dlgOpener = '#shareBtn'` (Z. 1983, 1991) ruft die App `setOpener('#shareBtn')` auf. Ändert das sichtbar etwas (Ende einer Hervorhebung, `on` der
   vorigen Schaltfläche), melde ich es vor dem Bau.
6. Toter Code: `capNext` (leere Funktion) und die drei `delete f.dataset.capNext` werden gestrichen. ‚Bewegung reduzieren‘ wird einmal abgefragt statt fünfmal,
   das ⓧ-SVG einmal definiert statt dreimal (W-56). `isOffline` bleibt, weil `hig.mjs` es nutzt (Teil `pruefungen`).
7. Kopf von `ui.js`: Z. 3–4 (‚Seit 4.11.0 … immer mit `?v=` einbinden‘) werden gestrichen. Die Schnittstelle verweist auf `v4/schnittstelle.json` (W-53).

**J-28 und J-19**
8. `.iconbtn` wird aus `design.css` (Z. 627) und aus Designrichtlinie 15.1 gestrichen; `.lcount` bleibt.
9. J-19: Ich prüfe, ob `ui.js` oder `vorlage/index.html` den Rückfall ‚Ohne Rollbereich rollt das Fenster‘ brauchen, und berichte das Ergebnis. Den Satz streiche
   ich nur nach deinem Ja zu einem eigenen Wortlaut.

## Wortlaut (0 Nr. 29)

**Neu – Regelkatalog (Designrichtlinie 17, Thema 1), nach R-1.13:**

> | R-1.14 | **Schnittstelle von ui.js:** die App nutzt von `ui.js` nur die Namen aus `v4/schnittstelle.json` (Teil `app`), ihre Prüfungen dazu den Teil
> `pruefungen`; keine Deklaration der App trägt den Namen eines Bausteins von `ui.js` | schnittstelle.mjs – `checkSchnittstelle` (App, Prüfdateien,
> Namensgleichheit, Liste gegen `ui.js`; Gegenprobe) | – | 14 |

**Designrichtlinie 14 – alt:**

> - **Schnittstelle von ui.js:** Die App stellt bereit: `<dialog id="dlg">`, `<dialog id="msg">`, `db.settings.appearance`
>   (`auto` | `light` | `dark`), `save()`, `render()`; optional `onDialogOpen()` (wird bei jedem `openDialog` aufgerufen). Von einer
>   AD-Bean nutzt die App nur Fabrik, Eigenschaften, Methoden und Ereignisse (R-1.13, Liste in 15).

**Designrichtlinie 14 – neu:**

> - **Schnittstelle von ui.js:** Die App stellt bereit: `<dialog id="dlg">`, `<dialog id="msg">`, `db.settings.appearance`
>   (`auto` | `light` | `dark`), `save()`, `render()`; optional `onDialogOpen()` (wird bei jedem `openDialog` aufgerufen). Von `ui.js` nutzt
>   die App nur die Namen aus `v4/schnittstelle.json` (R-1.14); von einer AD-Bean nur Fabrik, Eigenschaften, Methoden und Ereignisse (R-1.13, Liste in 15).

**AppDesign-`README.md` (Abschnitt ‚Schnittstelle‘) – alt:**

> - **Schnittstelle:** Die App stellt bereit: `db.settings.appearance` (`auto` | `light` | `dark`),
>   `save()`, `render()`; optional `onDialogOpen()`.

**neu:**

> - **Schnittstelle:** Die App stellt bereit: `db.settings.appearance` (`auto` | `light` | `dark`),
>   `save()`, `render()`; optional `onDialogOpen()`. Von `ui.js` nutzt sie nur die Namen aus `v4/schnittstelle.json` (R-1.14).

**Designrichtlinie 15.1 – alt:** ‚`aria-pressed="true"`, nur Icon `.iconbtn`).‘ · **neu:** ‚`aria-pressed="true"`).‘

## Testfall-Liste (automatisch)

Alle Fälle in Chromium und WebKit, soweit ein Browser nötig ist; nach jedem Schritt die Grundregeln (`pruefe.mjs`). APD-138 zusätzlich mit D-1 bis D-11.

| Nr. | Punkt | Fall | Erwartet | Prüfung | gegen 4.63.0 / 3.57.6 |
|---|---|---|---|---|---|
| S-1 | 1, 2 | jeder Name in `schnittstelle.json` gibt es in `ui.js` | grün; ein erfundener Name in einer Kopie der Liste → rot mit ‚R-1.14‘ | `schnittstelle.mjs` | – (neu) |
| S-2 | 2 | App nutzt einen inneren Namen | rot mit ‚R-1.14‘, Datei, Zeile, Name | `schnittstelle.mjs` | rot: `placeDialogs`, `held`, `dlgOpener` |
| S-3 | 2 | Gegenprobe: Kopie von `index.html` mit `function esc(…)` | rot (Namensgleichheit) | Gegenprobe | – |
| S-4 | 2 | Gegenprobe: Kopie mit `let leer = …` | rot (Namensgleichheit) | Gegenprobe | – |
| S-5 | 2 | Gegenprobe: Prüfdatei nutzt einen Namen, der weder in `app` noch in `pruefungen` steht | rot | Gegenprobe | – |
| S-6 | 2 | `schnittstelle.mjs` läuft im Vorlauf, rot bricht sofort ab | wie `doku-regeln` (APD-135/Z-1) | `lauf-selbsttest` | rot |
| S-7 | 3 | drehen und Größe ändern bei offenem Fenster, Hinweis und Menü | Fenster bleibt richtig platziert wie heute | `ablauf-fenster`, `ablauf-drehen-*` | grün (bleibt) |
| S-8 | 3 | Gegenprobe: `ui.js` ohne `placeDialogs` im `resize` | Platzierung nach dem Drehen rot | Gegenprobe | – |
| S-9 | 4 | Seitenleiste neu aufgebaut, während ein Menü aus ihr offen ist | Schaltfläche bleibt blau hinterlegt | `ablauf-markierung-menues` | grün (bleibt) |
| S-10 | 4 | Gegenprobe: `markHeld` ohne Wirkung | S-9 rot | Gegenprobe | – |
| S-11 | 5 | Teilen-Fenster öffnen | `#shareBtn` blau hinterlegt, beim Schließen nicht mehr | bestehende Prüfung (Fenster, Opener) | grün (bleibt) |
| S-12 | 6 | Großschreibung nach einem Vorschlag (R-5.2), ‚Bewegung reduzieren‘ (Teil Bedienungshilfen), ⓧ in Feldern | unverändert grün | bestehende Prüfungen | grün (bleibt) |
| S-13 | 7, 8 | Kopf von `ui.js` ohne `?v=`; `.iconbtn` nirgends mehr | `grep` ohne Treffer, `doku-regeln` grün | `doku-regeln`, Handprüfung | rot |
| S-14 | Texte | R-1.14 im Katalog, Designrichtlinie 14, 15.1, README neu, alter Text weg | `doku-regeln` grün (`checkCatalog`, `checkCollab`) | `doku-regeln` | rot |
| S-15 | alles | voller Prüflauf in `los` | grün, Wackler und längster Lauf wie bei 4.63.0 (0 Wackler, 416 s) | `los` (voll) | – |

## Testfall (User)

Je Version ein Usertest: /0 ‚Version prüfen‘ (Reiselogbuch 3.57.7 · AppDesign 4.64.0) und /1 APD-138 (am iPad ein Backup, Dateiname in einer Zeile).
