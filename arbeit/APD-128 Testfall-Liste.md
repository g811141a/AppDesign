# APD-128 Prüfumfang nach Art der Änderung – Testfall-Liste

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0108‘ · Wortlaut APD-128/V-1 bis V-3 bestätigt (Nutzer 13.11.2026), Entscheidungen APD-128/D-1 bis D-4 ·
noch nichts gebaut · **V-4 und M-1 bis M-18 bestätigt (Nutzer 13.11.2026)**

Die Nummern M-1 … gelten nur in dieser Datei (außerhalb: APD-128/M-n). Jeder Fall wird ein Testfall (automatisch) in
`werkzeug/veroeffentlichen-selbsttest.mjs`; er baut wie die bisherigen Fälle kleine Übungs-Repos (AppDesign und App) und vergleicht mit `origin/main`.

## Lücke im Wortlaut – bitte entscheiden (V-4)

Die echte Änderung aus 3.55.1 hat neben dem Text **eine Kommentarzeile** in `index.html` dazubekommen
(`// seit 3.55.1 (RLB-124/W-1): …`). Nach dem bestätigten Wortlaut V-1 („ohne die Inhalte der Zeichenketten unverändert“) wäre 3.55.1 damit
**voll** geprüft worden. Kommentare ändern nichts am Verhalten. Vorschlag:

- **Alt (V-1, eben bestätigt):** … (`index.html` ohne die Inhalte der Zeichenketten unverändert, sonst nur Doku und Versionsstellen, AppDesign unverändert) …
- **Neu (V-4):** … (`index.html` ohne die Inhalte der Zeichenketten **und die Kommentare** unverändert, sonst nur Doku und Versionsstellen, AppDesign unverändert) …

Die Liste unten geht von V-4 aus (M-3). Ohne V-4 wird M-3 zu ‚voll‘.

## Wie das Skript ‚nur Texte‘ erkennt

Verglichen wird der Vorbereitungs-Zweig der App mit `origin/main` (veröffentlichter Stand).

1. **Dateien:** erlaubt sind `*.md`, `index.html`, `sw.js` und `tests/*.mjs`. Jede andere geänderte Datei (z. B. `manifest.json`, Icons) → voll.
2. **AppDesign unverändert:** `AD_NEEDED` und die Fassungs-Pfade wie auf `origin/main`, und es wird nur die App veröffentlicht (`--nur-app`).
3. **Versionsstellen:** `APP_VERSION`, `APP_BUILT` (index.html) und `CACHE` (sw.js) dürfen sich ändern, sonst nichts in `sw.js`.
4. **index.html und tests/\*.mjs:** Das Skript zerlegt beide Stände in Code, Zeichenketten (`'…'`, `"…"`, die Textteile von `` `…` ``) und Kommentare.
   Der Code muss gleich sein. Jede geänderte Zeichenkette muss **wie ein Text aussehen**:
   - sie enthält ein Leerzeichen oder einen Buchstaben außerhalb von ASCII (ä, ö, ü, ß, ‚, ‘, …),
   - und einen Großbuchstaben oder einen Buchstaben außerhalb von ASCII,
   - und weder vorher noch nachher `<`, `>`, `{`, `}`, `;` oder `=`.

   So bleiben Schlüssel (`'reiselogbuch.v1'`), Ereignisse (`'click'`), Klassen (`'mi on'`), CSS (`'display:none'`) und HTML in Zeichenketten
   ‚voll‘. Ein einzelnes Wort ohne Umlaut (`'Vorschau'` → `'Ansicht'`) wird auch ‚voll‘ – im Zweifel voll (D-2).
5. Jede Änderung innerhalb von `<style>` → voll.
6. **Vorige Version voll (D-4):** `los` schreibt die Stufe in den Merge-Commit auf `main` (`Merge vorbereitung-X.Y.Z: Reiselogbuch X.Y.Z (Prüfstufe Text)`).
   Trägt der letzte Merge-Commit der App auf `origin/main` diesen Zusatz → voll. Ältere Merge-Commits ohne Zusatz zählen als voll geprüft.

## Welche Prüfungen in Stufe Text laufen (D-3)

- immer `doku-regeln`, `version-regeln`, `text-regeln`;
- jede Prüfung, deren Datei den alten oder den neuen Inhalt einer geänderten Zeichenkette enthält;
- jede geänderte Prüfdatei;
- nie `hig`; geteilte Prüfungen (z. B. `ablauf-blatt`) mit allen Teilen; jeweils in Chromium und WebKit.

Für 3.55.1 hieße das: die drei Grundprüfungen und `ablauf-abgleich`, `ablauf-gesamt`, `ablauf-texte-ablaeufe`, `link-name`, `regeln-ablauf`
(Datei enthält ‚PDF‘). Das sind 8 Prüfungen und 16 Läufe. Gemessen habe ich heute 6 davon in 05:14; die 8 messe ich nach dem Bau.

## Befehle

- `node werkzeug/veroeffentlichen.mjs stufe --app reiselogbuch` – nur lesen: ‚Vorschlag: Stufe Text – 8 Prüfungen: …‘ oder ‚Vorschlag: voll – Grund: …‘
  (z. B. ‚index.html Zeile 1287: Code geändert‘). Das nenne ich in der Bau-Frage.
- `node werkzeug/veroeffentlichen.mjs los --nur-app --app reiselogbuch --stufe text` – prüft die Stufe vor dem Prüflauf erneut; passt sie nicht:
  Abbruch vor dem Prüflauf mit Grund, nichts geändert. Ohne `--stufe` wie heute voll.

## Testfälle (automatisch)

| Nr. | Fall | Erwartet |
|---|---|---|
| M-1 | Nachbau 3.55.1 ohne Kommentarzeile: ein Menütext `'PDF'` → `'PDF (mit iOS 27 zurzeit nicht möglich)'`, Prüfdatei angepasst, Versionsstellen, CHANGELOG | `stufe`: ‚Stufe Text‘; Liste = Grundprüfungen + Prüfungen mit ‚PDF‘ bzw. dem neuen Text + die geänderte Prüfdatei, ohne `hig` |
| M-2 | nur Doku (`*.md`) und Versionsstellen | Stufe Text, nur die drei Grundprüfungen |
| M-3 | wie M-1, dazu eine neue Kommentarzeile (das echte 3.55.1) | Stufe Text (mit V-4) |
| M-4 | Text im Textteil einer `` `…${n}…` ``-Zeichenkette geändert | Stufe Text |
| M-5 | Ausdruck in `${…}` geändert | voll – ‚Code geändert‘ |
| M-6 | eine Zahl, ein Vergleich oder ein Funktionsaufruf geändert | voll – ‚Code geändert‘ mit Zeile |
| M-7 | Zeichenkette mit `<`, `{`, `;` oder `=` geändert (HTML oder CSS in einer Zeichenkette) | voll |
| M-8 | Schlüssel `'reiselogbuch.v1'` → `'reiselogbuch.v2'`, Ereignis `'click'` → `'pointerdown'`, Klasse `'mi on'` → `'mi off'` | je voll |
| M-9 | Änderung in `<style>` | voll |
| M-10 | `manifest.json` oder ein Icon geändert | voll – Datei genannt |
| M-11 | `AD_NEEDED` bzw. Fassungs-Pfad geändert, oder AppDesign vorbereitet und noch nicht veröffentlicht | voll – ‚AppDesign geändert‘ |
| M-12 | `sw.js` außerhalb von `CACHE` geändert | voll |
| M-13 | letzter Merge-Commit auf `origin/main` trägt ‚(Prüfstufe Text)‘ | voll – ‚vorige Version mit Stufe Text‘ (D-4) |
| M-14 | `los --stufe text` bei einem Fall aus M-5 bis M-13 | Abbruch vor dem Prüflauf mit Grund, Zweig unverändert, nichts gepusht |
| M-15 | `los --stufe text` bei M-1 | ruft `tests/alle.mjs --nur …` mit genau der Liste aus `stufe` auf; die Prüfung `messung` von AppDesign läuft nicht mit; Merge-Commit mit ‚(Prüfstufe Text)‘; Schlusszeile ‚Prüfstufe Text: N Prüfungen‘ |
| M-16 | `los` ohne `--stufe` bei M-1 | voll wie heute, Merge-Commit ohne Zusatz |
| M-17 | **Gegenprobe:** die Erkennung absichtlich ‚Code wird nicht verglichen‘ (`VEROEFF_GEGENPROBE=stufe`) | M-5, M-6 und M-9 werden rot |
| M-18 | Zeichenkette mit `\'`, eine URL `'https://…'` und `//` in einer Zeichenkette | richtig zerlegt: kein Kommentar erkannt, Stufe Text nur bei Text |

Am Gerät gibt es dazu nichts zu prüfen: Das Skript ändert nichts an der App. Den ersten echten Lauf mit Stufe Text bekommst du in der Bau-Frage der
nächsten passenden Version genannt.

## Danach

AppDesign 4.58.0 mit V-1 bis V-3 (und V-4), dem Befehl `stufe`, `los --stufe text` und dem Selbsttest. Die Bau-Frage stelle ich gesondert.
