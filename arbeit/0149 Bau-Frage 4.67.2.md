# Bau-Frage: AppDesign 4.67.2 / Reiselogbuch 3.57.12

Stand 21.11.2026 · Sitzung 0149 (erneut gestellt, Inhalt aus 0148 unverändert) · Korrekturversion aus Usertest P-118 (0 Nr. 8)

## Inhalt

### 1. P-118/F-1 – jede gedrückte Schaltfläche vergrößert sich

- `design.css` und `ui.js` (`GROSS_SEL`): Das Heben gilt für **jede Schaltfläche**, nicht nur in Leisten. Faktor nach Variante B: 1,3-fach, höchstens 24 px breiter (Faktor aus der Breite). Das Blass-Werden entfällt.
- **Ausnahme:** Die Auswahl-Kapsel wird weiter nach 80 ms blass.
- Listen- und Tabellenzeilen und Menüeinträge werden weiter grau.
- R-3.6 im Wortlaut, den du heute freigegeben hast (`arbeit/0148 P-118 F-1 Satz R-3.6.md`).
- Prüfungen: Der Zweig `p118-pruefung` kommt in den Vorbereitungs-Zweig (`checkBeruehren`, `katalog.mjs` APD-140/Z-7). In der App kommt in `ablauf-beruehren` eine Schaltfläche außerhalb der Leisten dazu.
- **AD-Bean: keine**, weil das Heben ein Grundstil von `design.css` und `ui.js` ist.

### 2. P-118/F-2 – ‚Schaltfläche‘ statt ‚Knopf‘

- Neue Regel in Designrichtlinie 6 und **R-10.9**, Prüfung `doku.mjs` – `checkBegriffe` mit Gegenprobe. Dazu ein Verweis in Zusammenarbeit 1.
- Umbenannt wird in Designrichtlinie, `ui.js`, `design.css`, Katalog, Prüfungen und Backlog (AppDesign) sowie in `index.html` (Kommentare), PROMPT.md, Designrichtlinie Reiselogbuch, Prüfungen und Backlog (Reiselogbuch).
- Namen im Code, Geschichte, `fassung/` und `arbeit/` bleiben unverändert (`arbeit/0148 P-118 F-2 Wortlaut.md`).
- **AD-Bean: keine**, weil sich nur Texte und Kommentare ändern.

### Versionen

- AppDesign 4.67.2 · Reiselogbuch 3.57.12 (feste Fassung 4.67.2)
- Designrichtlinie allgemein 4.67.2 · Zusammenarbeit allgemein **3.19.0** (neuer Verweis in Abschnitt 1)

## Testfall-Liste (automatisch)

**P-118/F-1**

| Nr. | Fall |
|---|---|
| T-1 | Jede sichtbare Schaltfläche (rund, Text, Hauptaktion, Löschen) hebt sich beim Berühren und wird größer. Das gilt in App, Prüfseite und Katalog, auf iPad und iPhone, quer und hoch, hell und dunkel. Listen-, Tabellenzeilen und Menüeinträge werden grau. |
| T-2 | Maß nach Variante B; die vergrößerte Schaltfläche bleibt ganz im Bildschirm bzw. Fenster (R-1.7) |
| T-3 | ‚Bewegung reduzieren‘: kein Vergrößern, nur Schatten |
| T-4 | Wegziehen über 10 px oder Rollen hebt es auf, ohne auszulösen; Loslassen senkt in 0,2 s |
| T-5 | Gesperrte Schaltflächen zeigen nichts |
| T-6 | Gegenprobe: Eine Schaltfläche außerhalb der Leisten wird blass → rot (gegen 4.67.1 rot: `#bkMenu`, `#bkQ1`) |
| T-7 | Auswahl-Kapsel: nach 80 ms blass, kein Heben; langes Drücken hebt nach R-3.5 |

**P-118/F-2**

| Nr. | Fall |
|---|---|
| Z-1 | `checkBegriffe` gegen 4.67.1 rot (Datei und Zeile) |
| Z-2 | nach dem Umbenennen grün in AppDesign und Reiselogbuch |
| Z-3 | Gegenprobe ‚Knopf‘ in `ui.js`, ‚Knöpfe‘ in der Designrichtlinie, ‚Mehr-Knopf‘ im Katalog → je rot |
| Z-4 | Namen im Code (`checkMehrKnopf`, `bk-knoepfe`) und das Sperrwort in Anführungszeichen ‚Knopf‘ (Regeltext) nicht gemeldet |
| Z-5 | CHANGELOG, `fassung/`, `arbeit/`, ‚Erledigt‘ nicht geprüft |
| Z-6 | Katalog `sourcehighlight` zeigt ‚Erste Schaltfläche‘, ‚Zweite Schaltfläche‘ |

## Testfälle (User), Entwurf für P-119

- **/0** Version prüfen: Reiselogbuch 3.57.12, AppDesign 4.67.2.
- **/1** Katalog, ‚Hervorgehobene Quelle‘: Mehr-Schaltfläche drücken und halten. Erwartet: Sie hebt sich und wird größer wie in der Seitenleiste.
- **/2** App: ‚Backup erstellen‘ (Fenster) drücken und halten. Erwartet: Sie hebt sich und wird größer.
- **/3** App, Tageserfassung: in der Smiley-Leiste einen Smiley kurz drücken. Erwartet: Er wird blass wie bisher und hebt sich nicht.
- **/4** Katalog, ‚Hervorgehobene Quelle‘. Erwartet: ‚Erste Schaltfläche‘ und ‚Zweite Schaltfläche‘, nirgends ‚Knopf‘.

## Prüflauf

**Stufe voll**, weil sich `design.css`, `ui.js` und die Prüfungen ändern. Dauer laut letzten Läufen rund 75–80 min.

## Offener Usertest

**P-118** (Reiselogbuch 3.57.11, AppDesign 4.67.1): /0, /2, /3, /4, /5 ok; **/1 nicht ok** → P-118/F-1 und P-118/F-2 (dieser Bau).

## Wann gebaut wird (Sitzung 0149)

Der Kontext dieser Sitzung steht bei rund 275.000. Die Übergabe ist ab 300.000 fällig (0 Nr. 13), und ein Bau darf nicht mittendrin übergeben werden. F-2 ändert viele
Dateien und der volle Prüflauf dauert rund 75 min, beides passt hier nicht mehr hinein. Bei ‚Ja‘ schreibe ich darum sofort die Übergabe. Die Sitzung **Reiselogbuch 0150**
baut dann als ersten Schritt, ohne neue Bau-Frage (dein ‚Ja‘ gilt).
