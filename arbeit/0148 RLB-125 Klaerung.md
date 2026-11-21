# RLB-125 – Reiselogbuch sperren: Klärung

Stand 21.11.2026 · Sitzung 0148 · Grundlage: `AppDesign/arbeit/0127 RLB-125 Reiselogbuch sperren.md`, Reiselogbuch 3.57.11 (`index.html`)

## Schon entschieden (Nutzer 18.11.2026, Sitzung 0127)

- Sperren und Entsperren über langes Drücken auf die Kachel (Kontextmenü). Lesen bleibt möglich, Löschen geht nicht.
- **S-1** Kachel gesperrt: `lock` rechts unten in der Farbe der Nebenschrift. **S-2** nicht gesperrt: kein Symbol.
- **S-3** geöffnetes Reiselogbuch gesperrt: `lock` neben dem Titel; Antippen öffnet die Sprechblase ‚Reiselogbuch entsperren?‘ mit ‚Entsperren‘ und
  ‚Abbrechen‘. plus und alle Bearbeiten-Schaltflächen sind ausgeblendet, die Felder nur lesbar. **S-4** nicht gesperrt: kein Symbol.
- **L-1** Kontextmenü gesperrt: ‚Reiselogbuch löschen‘ blass und nicht antippbar, darunter klein ‚Gesperrt‘; dazu ‚Entsperren‘.
- **L-2** Wischaktionen gesperrt: keine Kapsel ‚Löschen‘, kein Durchwischen; nur ‚Entsperren‘ (`lock-open`).
- **L-3** Die Sperre gilt auch beim Abgleich und beim Backup: Der Sperrstatus wird mit abgeglichen, und ein gesperrtes Reiselogbuch wird auf dem
  anderen Gerät nicht gelöscht.
- **L-4** Die Abfrage beim Löschen nennt die Anzahl: ‚‚<Titel>‘ mit allen 42 Einträgen löschen? …‘
- **L-5** In der Abfrage beim Löschen zusätzlich ‚Erst Backup erstellen‘: startet das Backup und fragt danach erneut.

## So macht es Apple

- **Belegt (HIG ‚Menus‘, developer.apple.com, Stand 8.6.2026):** „Show people when a menu item is unavailable.“ – „An unavailable menu item often
  appears dimmed and doesn't respond to interactions.“ Das bestätigt L-1: blass zeigen statt ausblenden.
  Quelle: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/menus.json
- **Weiß ich nicht:** Wie Apple ein ganzes Dokument gegen Änderungen sperrt (Mac ‚Geschützt‘ in ‚Informationen‘, Pages ‚Sperren‘ für Objekte). Die
  Apple-Hilfe (support.apple.com) ist von hier nicht erreichbar, der Hilfsagent bekam ‚ENOTFOUND‘. Für den Abgleich vor dem Muster könntest du mir
  1–2 Screenshots schicken, z. B. Pages am iPad: ein Objekt antippen, ‚Sperren‘, dann noch einmal antippen.

## Heute im Code (Reiselogbuch 3.57.11)

Diese Stellen ändern ein Reiselogbuch:

| Stelle | Handlung |
|---|---|
| Tag antippen (Tabelle, Kästen) | öffnet das Tagesfenster (`openDayDialog`) |
| Mehr der Kopfzeile, Kontextmenü, Wischaktion | ‚Reiselogbuch einstellen‘ (`openTripDialog`) |
| Mehr der Kopfzeile, Kontextmenü, Wischaktion | ‚Reiselogbuch löschen‘ (`deleteTrip`) |
| Abgleich, ‚Backup laden‘ | ‚Abgleichen‘ (Feld für Feld) oder ‚Ersetzen‘ (alles aus der Datei) |

Nichts ändern: Suchen, ‚Alle Tage‘/‚Nur erfasste Tage‘ (Einstellung je Gerät), Vorschau, Teilen (HTML, PDF), Backup erstellen.

Das Menü kennt blasse Einträge mit Untertext schon (`openMenu`: `disabled`, `sub`). L-1 braucht also nichts Neues in AppDesign.

## Offene Fragen

**1. Was sperrt die Sperre?**
- a) **(Empfohlen)** Alles, was das Reiselogbuch ändert: Tage erfassen und ändern, ‚Reiselogbuch einstellen‘, Löschen. Suchen, Ansicht, Vorschau,
  Teilen und Backup erstellen bleiben. – Damit passiert nichts aus Versehen, Lesen und Ausgeben gehen wie bisher.
- b) Nur Löschen und ‚Reiselogbuch einstellen‘; Tage bleiben erfassbar.

**2. Tag antippen bei Sperre**
- a) **(Empfohlen)** Das Tagesfenster öffnet zum Lesen: Felder nur lesbar, oben links nur x, kein Häkchen, ⓧ und Smiley-Leisten aus. – Lesen
  bleibt möglich, wie in S-3 entschieden, auch lange Texte ganz.
- b) Statt des Fensters die Sprechblase ‚Reiselogbuch ist gesperrt‘ mit ‚Entsperren‘ und ‚Abbrechen‘.

**3. ‚Backup laden‘ → ‚Ersetzen‘ mit gesperrten Reiselogbüchern**
- a) **(Empfohlen)** Ersetzen bleibt ‚alles aus der Datei‘. Die Abfrage nennt zusätzlich ‚Darunter N gesperrte Reiselogbücher.‘ – Ersetzen ist eine
  bewusste Wahl für alles, Ausnahmen würden einen Mischstand ergeben.
- b) Ersetzen behält gesperrte Reiselogbücher von diesem Gerät.

‚Abgleichen‘ übernimmt Änderungen von drüben wie bisher (die Sperre schützt vor Irrtum beim Bedienen) und löscht ein gesperrtes Reiselogbuch nicht (L-3).

**4. Allgemein oder App**
- a) **(Empfohlen)** App (Reiselogbuch). In AppDesign ändert sich nichts, das Menü kann blasse Einträge schon. Ob ein ‚Fenster nur zum Lesen‘ später
  allgemein wird (AD-Bean nach R-1.13), entscheiden wir am Muster.
- b) Gleich allgemein als AD-Bean (Sperren, Symbol, Fenster nur lesen) für jede App.

## Danach

Muster (iPad quer, hell): Kachel mit `lock`, Kontextmenü gesperrt, Kopfzeile mit `lock`, Tagesfenster nur lesen. Dazu die Testfall-Liste
(Gerät × Lage × Handlung × Daten), dann der Eintrag in ‚0. Nächste Version‘ – eigene Version nach 4.67.2.

## Entschieden (Nutzer 21.11.2026, Sitzung 0148, im Fenster)

- **RLB-125/J-1** (Frage 1): a – die Sperre sperrt alles, was ändert (Tage, ‚Reiselogbuch einstellen‘, Löschen); Suchen, Ansicht, Vorschau, Teilen,
  Backup erstellen bleiben.
- **RLB-125/J-2** (Frage 2): a – Tag antippen öffnet das Tagesfenster nur zum Lesen (nur x, kein Häkchen, ⓧ und Smiley-Leisten aus).
- **RLB-125/J-3** (Frage 3): a – ‚Ersetzen‘ ersetzt alles; die Abfrage nennt ‚Darunter N gesperrte Reiselogbücher.‘
- **RLB-125/J-4** (Frage 4): a – App; ob ‚Fenster nur lesen‘ allgemein wird, am Muster.
