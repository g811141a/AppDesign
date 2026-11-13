# APD-128 Prüfumfang nach Art der Änderung – Klärung

**Stand 13.11.2026** · Sitzung ‚Reiselogbuch 0108‘ · noch nichts gebaut, keine Regel geändert

## Erledigt vorab

- **P-102: alles ok** (Nutzer 13.11.2026) → im ReiseLogBuch-Backlog unter ‚Erledigt‘ (Commit auf dem Sitzungszweig).

## Messung heute (statt Schätzung)

Die Änderung aus 3.55.1 (eine Zeile im Teilen-Menü) mit nur den Prüfungen, die die Stelle berühren, gemessen in dieser Sitzung (4 Kerne):

| Lauf | Läufe | Dauer | Quelle |
|---|---|---|---|
| voller Lauf 3.55.1 | 152 | 70:19 | UEBERGABE.md 0107 |
| Auswahl für Stufe 1 | 12 (6 Prüfungen × Chromium/WebKit) | **05:14**, alle grün | `node tests/alle.mjs --nur doku-regeln,version-regeln,text-regeln,ablauf-gesamt,ablauf-titel-blase,ablauf-texte-ablaeufe` |

Die Auswahl: feste Grundprüfungen (`doku-regeln`, `version-regeln`, `text-regeln`) und alle Prüfungen, in denen ‚Teilen‘ bzw. der Text vorkommt
(`ablauf-gesamt`, `ablauf-titel-blase`, `ablauf-texte-ablaeufe`). Nicht dabei: `hig` (Darstellung in allen Textgrößen, 8 Teile), `ablauf-blatt`,
`ablauf-abgleich` – sie erwähnen ‚Teilen‘ auch, laufen aber lang. Das Werkzeug kann schon heute mit `--nur` auswählen; es fehlt nur die Auswahl im
Veröffentlichungs-Skript.

## Meine Einschätzung

- **Stufe 1 (Text) lässt sich sicher und automatisch erkennen:** Das Skript vergleicht `index.html` mit dem veröffentlichten Stand. Ohne die Inhalte der
  Zeichenketten sind beide gleich, es haben sich also nur Texte geändert. Dazu kommen Doku-Dateien (CHANGELOG, BACKLOG, PROMPT, README) und die
  Versionsstellen, die `vorbereiten` ohnehin setzt. Die Prüfungen sucht das Skript, indem es den alten und den neuen Text in `tests/*.mjs` sucht.
- **Stufe 2 (App, ‚betroffener Bereich‘) ist schwer zu fassen:** Es bräuchte eine gepflegte Zuordnung Bereich → Prüfungen. Fehlt darin eine Prüfung,
  übersieht die Stufe genau die Nebenwirkung, die der volle Lauf finden soll. **Empfehlung: zunächst nur zwei Stufen** – Stufe 1 Text, sonst voller Lauf.
  Stufe 2 kommt erst, wenn sich zeigt, dass sie gebraucht wird.
- **Sicherheitsnetz:** Nach einer Version mit Stufe 1 läuft die nächste Version immer voll, also nie zwei Stufe-1-Versionen hintereinander.
- **Usertest bei Stufe 1:** /0 und die Fälle zur geänderten Stelle. Das ist heute schon fast so, für 3.55.1 hätten /0 bis /2 genügt.

## Fragen im Fenster

1. Wie viele Stufen? a) zwei: Text oder voll (Empfohlen) · b) drei wie im Brainstorming · c) alles bleibt beim vollen Lauf
2. Wer legt die Stufe fest? a) das Skript schlägt aus dem Unterschied vor, ich nenne sie in der Bau-Frage, du bestätigst (Empfohlen) · b) du sagst sie
   bei jeder Bau-Frage selbst
3. Was läuft in Stufe 1? a) Grundprüfungen und alle Prüfungen mit dem alten oder neuen Text, ohne `hig` (Empfohlen, gemessen 05:14) · b) wie a, dazu
   `hig` hell in allen Textgrößen (länger, prüft Umbruch und Abschneiden)
4. Sicherheitsnetz? a) nach einer Stufe-1-Version ist die nächste immer voll (Empfohlen) · b) kein eigenes Netz, die nächste Sammelversion genügt

Danach folgen der Wortlaut für 0 Nr. 2 (alt und neu, Bestätigung nach 0 Nr. 29) und die Testfall-Liste für das Skript (`los --stufe`, Selbsttest).
