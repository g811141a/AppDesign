# A-02a – Fall-Liste für AppDesign 4.12.0 (Regelkatalog neu)

**Stand 14.10.2026** · Sitzung ‚Reiselogbuch 0001 – AppDesign 4.12.0‘ · Zusammenarbeit allgemein 0 Nr. 1
(Fall-Liste vor jedem Bau). Grundlage: `arbeit/A-02 Regelkatalog-Entwurf.md` (freigegeben).

Jeder Fall wird ein automatischer Test (Spalte ‚Test‘); was nur das Gerät zeigt, kommt in die Prüfliste.

## Befund beim Lesen (vor dem Bau)

Die Prüfskripte melden heute 40 der 52 alten Nummern. **Ohne Nummer** sind: R-03, R-07, R-11, R-12, R-13, R-14,
R-15, R-16, R-17, R-24, R-28, R-35. Ein Teil davon wird schon geprüft, aber unter einem Sammelnamen ohne Regelnummer
(Antippfläche, Schrift, Kontrast, Anführungszeichen, Menü in `hig.mjs`); der Rest (z. B. R-16 Gewähltes bleibt blau,
R-24 gleiche Bezeichnung, R-35 Schatten) hat bisher **keine** laufende Prüfung. Fall K-1 deckt das auf.

## A. Katalog vollständig (Doku)

| Nr. | Fall | Test |
|---|---|---|
| K-1 | Jede der 34 Regeln R-1.1 … R-10.4 kommt in mindestens einer Prüfmeldung eines Skripts vor, das in `alle.sh` bzw. im AppDesign-Testlauf wirklich läuft | `doku.mjs` – Katalog aus Abschnitt 17 lesen, Nummern in `tests/*.mjs` beider Repos suchen |
| K-2 | Jede alte Nummer R-01 … R-52 ist in der Zuordnungstabelle genau einer oder mehreren neuen Nummern bzw. ‚Zusammenarbeit 7‘ zugeordnet – keine Regel verloren | `doku.mjs` |
| K-3 | Keine alte Nummer (R-01 … R-52) mehr in Prüfskripten, Designrichtlinien, PROMPT.md, CLAUDE.md – außer in Versionsgeschichten, CHANGELOG-Altlasten und der Zuordnungstabelle | `doku.mjs` – Suche über beide Repos |
| K-4 | Abschnitte 1–15 wiederholen keinen Regeltext, sondern verweisen auf R-x.y; jeder Verweis R-x.y zeigt auf eine vorhandene Regel | `doku.mjs` – jede genannte Nummer im Katalog vorhanden |
| K-5 | Zusammenarbeit 3 und 7 nennen ‚Abschnitt 17, R-1.1 …‘ statt ‚R-01 …‘; R-50 steht als Arbeitsregel in Zusammenarbeit 7 | `doku.mjs` |
| K-6 | Versionen stimmen überall: Designrichtlinie allgemein 4.12.0, README AppDesign, CHANGELOG, BACKLOG, Versionstabelle der README Reiselogbuch (R-10.4) | `doku.mjs`, `version.mjs` |

## B. Fünf neue Prüfungen – erst rot, dann grün

Jede neue Prüfung wird einmal mit einem eingebauten Fehler laufen gelassen (muss melden), dann ohne (muss still sein).

| Nr. | Regel | eingebauter Fehler (rot) | Test |
|---|---|---|---|
| N-1 | R-2.3 Suche | Trefferzähler ‚3 von 57‘ fehlt bzw. Pfeil läuft vom letzten zum ersten Treffer um | Ablauf Suche (`ablauf-suche-tabelle.mjs`) |
| N-2 | R-4.4 Fenster-Kopfzeile | Häkchen ist schon vor einer Änderung blau; x mit Änderung schließt ohne Abfrage | Ablauf Fenster (`ablauf-fenster.mjs`) |
| N-3 | R-5.3 Fehlermeldungen | Meldung erscheint schon beim Öffnen (vor jeder Eingabe) bzw. nicht unter dem Feld; Pflichtfeld mit Sternchen | Ablauf Fenster |
| N-4 | R-5.4 Auswahl-Kapsel | Breite der Kapsel ändert sich beim Wählen; kein Verlauf am Rand, wenn sie seitlich wischbar ist | `hig.mjs` |
| N-5 | R-6.4 Ausgabe und Vorschau | Vorschau dunkel im Dunkelmodus; Vorschau schmaler als die Seite; Kapsel ohne [PDF · Teilen] | Ablauf Ausgabe (neu in `ablauf-gesamt.mjs` oder eigenes Skript) |
| N-6 | R-6.1 Zebra je Tabellenzeile **in der App** | App-Tabelle mit zusammengefasster erster Spalte färbt Zeilen dahinter wechselnd | `hig.mjs` (wie R-6.2, aber für App-Tabellen) |

## C. Nummern in den Meldungen

| Nr. | Fall | Test |
|---|---|---|
| M-1 | Jede Meldung von `hig.mjs` trägt die neue Nummer (auch die Sammelprüfungen: Antippfläche → R-3.1, Schrift und Kontrast → R-10.2, Anführungszeichen → R-10.1, Menü → R-4.1) | Lauf mit eingebautem Fehler je Sammelprüfung |
| M-2 | Die Prüfskripte des Reiselogbuchs (`*-regeln.mjs`, `ablauf-*.mjs`, `hig.mjs`) melden neue Nummern | K-3 |
| M-3 | Regeln ohne bisherige Prüfung bekommen ihre eine Prüfung: R-1.1 (R-03), R-3.2 (R-35 Schatten), R-3.3 (R-16 Gewähltes bleibt blau), R-5.2 (R-07/R-17), R-2.1 (R-28), R-10.1 (R-24) – je erst rot, dann grün | K-1 |

## D. Gesamtlauf (keine Rückschritte)

| Nr. | Fall | Test |
|---|---|---|
| G-1 | Alle Tests des Reiselogbuchs grün: `sh tests/alle.sh` (AppDesign daneben) | `alle.sh` |
| G-2 | Alle AppDesign-Tests grün (abgleich, backup, doku, kontextmenue, version, hig) | AppDesign-Testlauf |
| G-3 | Jede Ansicht in iPad und iPhone × quer und hoch × hell und dunkel (wie bisher in `hig.mjs`); Daten leer, lang (100 × ‚a‘), viele | `hig.mjs` |
| G-4 | `v4/design.css` und `v4/ui.js` unverändert (nur Richtlinie und Prüfskripte); `AD_VERSION` bleibt – oder, falls die Versionszeile 4.12.0 zeigen soll, Kopplung R-10.3 überall nachgeführt | `version.mjs` |

## E. Nur am Gerät (Prüfliste, ab /0)

- /0 Version prüfen (App- und AppDesign-Version in der Versionszeile, iPad und iPhone).
- Kein sichtbarer Unterschied in der App erwartet; Prüfliste nur kurz: Suche (R-2.3), Fenster x/Häkchen (R-4.4),
  Fehlermeldung (R-5.3), Vorschau seitlich wischen (R-6.4) – je iPad quer und iPhone hoch, hell.

## Offene Frage zur Version

- G-4: Ändert sich nur Doku und Tests, bleibt `v4/` gleich. Zeigt die Versionszeile der App dann weiter
  ‚AppDesign 4.11.4‘ (Bausteine) oder 4.12.0 (Repo)? Vorschlag: `AD_VERSION` auf 4.12.0 heben (nur Zahl), damit
  Versionszeile, README und Richtlinie übereinstimmen – das berührt `v4/` und die App (Reiselogbuch 3.11.5 mit T-83).
