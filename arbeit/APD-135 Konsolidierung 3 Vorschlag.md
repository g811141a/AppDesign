# APD-135 Konsolidierung 3 – Vorschlag zum Umfang

**Stand 16.11.2026** · Sitzung 0120 · noch nichts geändert, nur gezählt und gelesen

## Ausgangslage (gemessen in dieser Sitzung)

| Was | Umfang |
|---|---|
| Designrichtlinie allgemein | 221 KB, Katalog mit 79 R-Regeln und 19 G-Regeln |
| Zusammenarbeit allgemein | 56 KB – jede Sitzung liest sie ganz |
| Designrichtlinie Reiselogbuch, `PROMPT.md` (App) | 22 KB, 28 KB |
| Import: `PROMPT.md`, `ERKENNTNISSE.md` | 13 KB, 3 KB |
| Prüfdateien | AppDesign `tests/` 19 Dateien, Reiselogbuch `tests/` 65 Dateien |
| Voller Prüflauf 4.59.3 | 160 Läufe in 74:37, 1 Wackler (laut Übergabe) |
| `arbeit/` | 270 Dateien, 14 MB |
| `fassung/` | 70 Fassungen, 57 MB |
| `VERLAUF.md`, `ZUORDNUNG.md` | 184 KB, 44 KB |
| CHANGELOG AppDesign / Reiselogbuch | 216 KB / 391 KB |

Frühere Konsolidierungen: APD-39 (21.10.2026) und APD-84 (26.10.2026).

## A. Dein Auftrag (fest im Umfang)

1. Alle Regeln durchgehen: Zusammenarbeit, Designrichtlinie allgemein mit Katalog, Designrichtlinie Reiselogbuch, beide `PROMPT.md`,
   alle drei `CLAUDE.md`, `ERKENNTNISSE.md`.
2. Gegeneinander abgleichen: Doppeltes, Widersprüche, überholte Stellen – jede Regel an genau einer Stelle.
3. Reihenfolge der Regelprüfungen: welche Prüfung deckt was, wo prüfen zwei dasselbe nur wegen der Reihenfolge.
4. Einsparungen beim Bau einer Version über alle Repos.

## B. Sicherheitsnetz (gilt für alles, oberste Priorität)

- **Nichts fällt ohne Beweis weg.** Vor dem Entfernen einer Prüfung baue ich den Fehler absichtlich ein (Gegenprobe); die
  verbleibende Prüfung muss ihn rot zeigen. Gelingt das nicht, bleibt die Prüfung.
- **Regeln ändern nur mit deinem ‚Ja‘ zum Wortlaut** (0 Nr. 29): alter und neuer Text nebeneinander.
- **Nachweis-Tabelle:** jede entfernte oder verschobene Regel mit ‚stand in … → steht jetzt in … → geprüft durch …‘.
- **Feste Fassungen bleiben unberührt**; die App wird erst nach dem vollen Prüflauf gehoben.
- **Eigene Version** nur für die Konsolidierung, voller Prüflauf – so ist ein Fehler eindeutig zuzuordnen.
- **Erst Befund und Plan, dann die Bau-Frage** – gebaut wird nichts ohne dein ‚Ja‘.

## C. Was wir zusätzlich prüfen können (meine Empfehlungen)

**Paket 1 – Prüfungen und Bauzeit (empfohlen)**
- Z-1 Katalog gegen Prüfungen: hat jede R-Regel genau eine Prüfung, gehört jede Prüfung zu einer Regel; tote oder doppelte Prüfungen.
- Z-2 Laufzeit: Zeit je Prüfung aus einem vollen Lauf, die teuersten zuerst ansehen. Auffällig: `hig` läuft in 8 Teilen, 5 Abläufe je
  in 3 Varianten, alles in zwei Browsern – ob sich Teile überdecken, ist zu prüfen.
- Z-3 Veröffentlichungs-Skript: Schritte in `vorbereiten`, `fassung`, `stufe`, `los`, die doppelt arbeiten; Wartezeiten.
- Z-4 Wackler APD-134 mit erledigen, weil er jeden vollen Lauf verlängern kann.

**Paket 2 – Lesekosten und Ablage (empfohlen)**
- Z-5 Startkosten je Sitzung: die Versionsgeschichte der Zusammenarbeit ist ein großer Teil der Datei und wird jedes Mal mitgelesen –
  auslagern spart in jeder Sitzung Kontext, ohne eine Regel zu ändern.
- Z-6 `arbeit/` (270 Dateien): abgeschlossene Themen in ein Archiv, damit die Suche nur Laufendes trifft.
- Z-7 `fassung/` (70 Fassungen): prüfen, welche noch eine App lädt; nur Vorschlag, gelöscht wird nichts ohne Rückfrage.
- Z-8 `VERLAUF.md`, `ZUORDNUNG.md`, CHANGELOGs: was davon noch gelesen oder geprüft wird.

**Paket 3 – Backlog, Import, Code**
- Z-9 Backlogs beider Repos: Doppeltes zwischen APD und RLB, überholte ‚später‘-Punkte.
- Z-10 Import-Repo: I-Regeln und K-Erkenntnisse gegen den heutigen Stand der App (letzter Commit dort nennt Reiselogbuch 3.34.0 und
  AppDesign 4.36.0).
- Z-11 Code und Kommentare: Geschichte in Kommentaren (‚seit 3.x …‘ in `alle.mjs`) gehört laut 0 Nr. 3 in die Versionsgeschichte;
  unbenutzte Stile und Funktionen in `v4/` und `index.html` suchen. Höchstes Risiko der drei Pakete, weil Code geändert wird.

**Paket 4 – Gekapselte Bausteine (deine Ergänzung, siehe G)**

## G. Gekapselte Bausteine – ist das schon so?

**Kurz: zum Teil. Die Wiederverwendung gibt es, die Einsparung beim Prüfen noch nicht.**

Was heute schon so ist (in dieser Sitzung im Code gelesen):
- **Gemeinsame Bausteine gibt es.** `v4/ui.js` (3.325 Zeilen, 169 Funktionen) und `design.css` (882 Zeilen) enthalten Menü mit Untermenü,
  Sprechblase, Meldung, Fenster, Auswahl-Kapsel, Navigation, Tastatur, Drehen. Eine zweite App, die `openMenu` oder `confirmPop` aufruft,
  bekommt genau dasselbe Aussehen und Verhalten wie das Reiselogbuch.
- **Die feste Fassung ist bereits eine Kapsel.** Die App lädt genau `fassung/4.59.3/`; bleibt sie auf dieser Fassung, sind die
  Bausteine Byte für Byte gleich.

Was noch fehlt:
- **Keine Grenzen in `ui.js`.** Es ist ein einziges klassisches Skript; alle 169 Funktionen sind global, auch die inneren. Die Bausteine
  teilen sich Zustand und hängen an denselben Ereignissen (rund 20 Hörer auf `resize`). Anders als eine Java-Klasse kann ein Baustein
  einen anderen beeinflussen.
- **Bausteine werden nur über die App geprüft.** AppDesign hat keine eigene Seite, auf der die Bausteine allein laufen; alle Prüfungen
  laufen über das Reiselogbuch. `vorlage/index.html` (89 Zeilen) wird nur als Text gelesen.
- **Die Stufe kennt nur ‚Text‘ oder ‚voll‘.** Ändert sich in der App eine Zeile Code, laufen alle 160 Läufe – auch die, die nur einen
  unveränderten Baustein prüfen.
- **Manches Allgemeine baut die App noch selbst,** z. B. die Kachel der Seitenleiste (`renderSide` steht in `index.html`). Die
  Wischaktionen (APD-30) kommen laut Plan als Baustein nach `ui.js`.
- **Die sperrende, graue Sprechblase ist bestätigt, aber noch nicht gebaut.** Heute schließt `choosePop` beim Tippen daneben; mit
  4.60.0 gilt das Sperren mit Grau für alle Abfragen – dann als ein Baustein.

Wo die Kapsel-Idee an Grenzen stößt (wichtig für ‚kein höheres Fehlerrisiko‘):
- **In sich geschlossene Bausteine** (Menü, Sprechblase, Meldung, Kapsel, Schalter, Icons, Beträge) lassen sich gut einzeln prüfen;
  in der App genügt dann das Ergebnis.
- **Bausteine, die in die ganze Seite eingreifen** (Drehen, Tastatur, Rollen, Layout iPhone/iPad), hängen vom Inhalt der App ab. Der
  Fehler APD-133 saß in `ui.js`, zeigte sich aber erst im Zusammenspiel mit dem Umbau der App. Diese Prüfungen müssen bleiben, sobald
  sich der Aufbau der App ändert.
- Wie viele Minuten das spart, weiß ich noch nicht – das misst die Analyse.

**Vorschlag in Stufen (jede einzeln zu entscheiden):**
- B-1 **Bestandsaufnahme** (nur lesen und messen): Karte der Bausteine in `ui.js` (Funktionen, Zustand, Ereignisse je Baustein),
  Einteilung ‚in sich geschlossen‘ oder ‚greift in die Seite ein‘; was das Reiselogbuch Allgemeines noch selbst baut. Dazu mit
  `--abdeckung` messen, welche Prüfung welche Funktionen wirklich ausführt.
- B-2 **Zuordnung Prüfung → Baustein → Regel** als Tabelle; daraus neue Stufen: ‚App‘ (AppDesign unverändert: Bausteine nicht erneut
  einzeln prüfen, nur ihr Ergebnis in der App und alles Seitenweite) und ‚Baustein‘ (geänderter Baustein intensiv, dazu alle, die ihn
  nutzen). Das Skript schlägt die Stufe vor wie heute; im Zweifel voll. Regeländerung in 0 Nr. 2 – nur mit deinem ‚Ja‘ zum Wortlaut.
- B-3 **Baustein-Prüfseite in AppDesign:** eine Seite, auf der jeder Baustein allein läuft, mit eigenen Prüfungen und Gegenprobe. Sie
  wird bei jeder Änderung an AppDesign geprüft und ist die Grundlage für jede weitere App.
- B-4 **Schnittstelle absichern:** eine Liste der Funktionen, die Apps aufrufen dürfen; eine Prüfung meldet, wenn eine App innere
  Funktionen nutzt. Wenig Aufwand, kein Umbau.
- B-5 **`ui.js` echt kapseln** (Module mit privatem Zustand, wie Klassen): großer Umbau am Herzstück, höchstes Risiko – empfehle ich
  jetzt nicht; erst nach B-1 bis B-4 entscheiden, ob es noch nötig ist.

Sicherheit dabei: eine Prüfung wandert erst in eine kleinere Stufe, wenn die Gegenprobe zeigt, dass ein Fehler im Baustein auf der
Prüfseite rot wird; jede AppDesign-Version und jede Hebung der App auf eine neue Fassung läuft weiter voll.

## D. Reihenfolge mit 4.60.0

- **Empfehlung: Befund jetzt, dann 4.60.0 (APD-30) wie bestätigt bauen, danach die Konsolidierung in mehreren kleinen Versionen**
  (Regeln und Texte · Prüfungen und Stufen · Baustein-Prüfseite). Der Wortlaut von APD-30 ist gegen die heutigen Abschnitte bestätigt
  (15.4, 15.7, 15.18 …); R-7.8 und der neue Wisch-Baustein werden dann gleich mit eingeordnet.
- Alternative: Konsolidierung zuerst – dann muss ich den Wortlaut von APD-30 an die neue Gliederung anpassen und dir neu vorlegen.

## E. Modell und Aufwand

- **Empfehlung: Fable 5.2 mit Aufwand ‚hoch‘.** Die Aufgabe ist anspruchsvoll: viele Dateien gegeneinander lesen, feine
  Überschneidungen erkennen, und ein Irrtum kostet später einen Fehler am Gerät.
- ‚Mittel‘ reicht für das Zählen und Auflisten, nicht für das Urteil ‚diese Prüfung ist entbehrlich‘. ‚Niedrig‘ ist ungeeignet.
- ‚Höchste‘ halte ich nicht für nötig: die Sicherheit kommt aus der Gegenprobe und dem vollen Prüflauf, nicht aus noch mehr
  Nachdenken; es würde vor allem länger dauern und mehr Kontingent brauchen.
- **Eigene Sitzung empfohlen.** Diese Sitzung steht bei rund 150.000 Kontext, die Übergabe ist bei 300.000 fällig; allein die
  Designrichtlinie ist 221 KB groß. Eine neue Sitzung ‚Reiselogbuch 0121 – Konsolidierung 3‘ beginnt mit vollem Platz.

## F. Ergebnis der Analyse (bevor gebaut wird)

Eine Datei ‚APD-135 Konsolidierung 3 Befund und Plan‘ im Ordner `arbeit` mit: Liste der Mehrgleisigkeiten, Wortlaut alt und neu, Nachweis-Tabelle,
Einsparung je Vorschlag in Minuten, Risiko je Vorschlag – jeder Punkt einzeln zum Entscheiden.

## H. Deine Entscheidungen (16.11.2026, Sitzung 0120, im Auswahlfenster)

| Frage | Entscheidung |
|---|---|
| Umfang | Auftrag A, dazu **Paket 1, 2 und 3** (Z-1 bis Z-11) |
| Gekapselte Bausteine | **B-1 bis B-5 mit Umbau** von `ui.js` (im Chat noch mit dem Buchstaben K genannt; hier B, weil K für Erkenntnisse der Konvertierung vergeben ist) |
| Reihenfolge | **Befund, dann 4.60.0 (APD-30), dann Bau der Konsolidierung** |
| Aufwand und Ort | **Neue Sitzung, Fable 5.2, Aufwand hoch** |

Hinweis zu B-5: Ich hatte den Umbau von `ui.js` nicht empfohlen (höchstes Risiko). Du hast ihn gewählt – er kommt in den Umfang. Der
Befund legt dafür einen eigenen Plan in kleinen Schritten vor (je Baustein eine Version, voller Prüflauf, Gegenprobe); gebaut wird jeder
Schritt erst nach deinem ‚Ja‘.
