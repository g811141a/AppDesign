# Übergabe an die nächste Sitzung

**Stand 23.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0035‘ (Ende, Übergabe bei etwa 250.000 Token auf Wunsch, vor der
Fall-Liste Teil 2) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15);
die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.29.0** online (Fassung 4.31.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.31.0** online (feste Fassungen 4.14.0–4.31.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md` |
| Zusammenarbeit allgemein | **2.19.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.2.2 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0036**; die danach 0037.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – prüfen nach 0 Nr. 15 (in 0035 beides richtig).
- **Offene Prüfpunkte:** keine.
- **‚0. Nächste Version‘ (voll, Nutzer sagte zum Bau ‚Nein‘):** AppDesign **A-61/2** + Reiselogbuch **T-99** (Blatt auf dem iPhone) und
  AppDesign **A-69** + Reiselogbuch **T-98** (Startposition) – als AppDesign 4.32.0 / Reiselogbuch 3.30.0.
- **Bereit für die Version danach:** AppDesign **A-43 Teil 1** + Reiselogbuch **T-100** (Barrierefreiheit: VoiceOver, Tastatur, Kontrast,
  Bewegung) – voraussichtlich 4.33.0 / 3.31.0, Nebenversion (kein 5.0.0, Designrichtlinie 11; Nutzer fragte 0035 danach).
- **In Arbeit:** **A-43 Teil 2 Textgröße** – Muster A ok, als allgemeine Regel: Ja; als Nächstes die Fall-Liste (siehe 3).
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0035

- **A-43 Teil 1 abgeschlossen:** M7 (Bewegungswächter in `pruefe.mjs`), P1 (Schalter `PRUEF_BEDIENUNG=beide`), P2
  (`--gegenprobe bedienung`) übernommen; Abschnitte 1 und 2 der Fall-Liste `arbeit/A-43 Teil 1 Fall-Liste.md` an Abschnitt 4
  angeglichen; **Fall-Liste ok** → A-43 im AppDesign-Backlog ‚Teil 1 bereit‘, Reiselogbuch **T-100** neu (App-Teil). Fundstelle:
  Reiselogbuch `index.html:1323` rollt beim Häkchen mit Fehler sanft (wird mit V10/M7 behoben).
- **Nebenbefund Umgebung:** Chromium von Playwright 1.56.1 startet in der Cloud nur mit `executablePath: '/opt/pw-browsers/chromium'`
  (Abbild bringt Shell 1243, Playwright erwartet 1194) – vor dem nächsten vollen Prüflauf klären (in Fall-Liste Teil 1, P1, notiert).
- **A-70 Mehrsprachfähigkeit** ins AppDesign-Backlog (Prio 3, Nutzer).
- **Fragen des Nutzers beantwortet:** Barrierefreiheit kommt zentral über ui.js/design.css in jede App mit der neuen Fassung (nach
  Rückfrage gehoben, nie ohne Ja gebaut); künftige Apps haben sie von Anfang an, die Prüfungen erzwingen es. Fassungen und
  Einstellung der App (Reiselogbuch lädt 4.31.0).
- **A-43 Teil 2 Textgröße:** Apple-Abgleich `arbeit/A-43 Teil 2 Klärung.md` (Apple: 12 Stufen, Body 14–23 pt, AX1–AX5 28–53 pt; App
  Store ‚Größerer Text‘ ab 200 %; Leisten wachsen nicht, dafür Großanzeige – im Web nicht vorhanden). Muster
  `arbeit/A-43 Teil 2 Muster.html` (Prüfskript `… Muster prüfen.mjs`, Bilder `arbeit/bilder/A-43 T2 …`). **Entschieden:** Variante
  **A wie Apple**, **bis 53 pt**; Versuch am Gerät: `-apple-system-body` meldet die Stufe bis AX5 und **wechselt bei offener App**,
  auch auf dem Home-Bildschirm; Muster A dunkel und hochkant **ok**; **allgemeine Regel: Ja**.
- **Gelernt:** Linear skalierte Überschriften werden bei AX5 riesig (106 px) – Apples Textstile wachsen unterschiedlich (Large Title 34 →
  60, Body 17 → 53); im Muster mit `--u`/`--k` nachgebildet. Die eigene Prüfung des Musters fand die zu breite Tabelle am iPhone hoch.

Frühere Sitzungen: `VERLAUF.md` und Versionsgeschichten.

## 3. Nächster Schritt

1. **Fall-Liste A-43 Teil 2** anlegen (`arbeit/A-43 Teil 2 Fall-Liste.md`) und **Fall für Fall** durchgehen – Format wie Teil 1: je
   Antwort **ein** Fall, Überschrift ‚Fall X von N: …‘, **Worum es geht**, **Aktuell** (im Code nachgesehen), **Apple-Standard**,
   **Meine Idee**, **Meine Empfehlung**, Auswahlfenster (Übernehmen (Empfohlen) · Alternative · Nicht übernehmen · Ich schreibe im
   Chat); Antwort in Abschnitt 4 eintragen, committen, Zeitzeile, ‚Schreib **w** …‘. Grundlage: Klärung Abschnitte 3–5 und das
   Muster. Vorgesehene Fälle (Vorschlag):
   - **Regel:** neue Katalog-Regel (z. B. R-1.10 bzw. R-3.x) ‚Schrift folgt der Textgröße des Geräts‘ mit Prüfung.
   - **Grundgröße:** `html { font: -apple-system-body }` mit Systemschrift-Familie dahinter, Rückfall 17 px (Mac, Chromium).
   - **Textstile:** alle 45 px-Größen in `design.css` (und 6 im Reiselogbuch) auf Apples Stile mit Standard → AX5 (Tabelle in Apples
     HIG nachschlagen, nicht nur annähern).
   - **Abstände, Höhen, Icons:** feste px-Höhen (44, 32, 36 …) wachsen mit bzw. Mindesthöhen; Icons im Inhalt wachsen mit.
   - **Leisten** (Kopf, Kapsel, Suche, schwebende Knöpfe, Fensterkopf) wachsen nur bis 23 pt.
   - **Umbau ab 28 pt** (Datum unter Titel, Tabelle als Karten, Menü-Zusatzinfos) und **iPhone hoch** schon ab 21 pt; Tabelle der
     Tage am iPhone hoch immer Karten (Reiselogbuch – mit dem heutigen Aufbau abgleichen).
   - **Menüs, Sprechblasen, Seitenleiste** (Breite am iPad, Zeilenhöhe), **Fenster** (Notizfeld wächst mit), **Eingabefelder ≥ 16 px**.
   - **Wechsel bei offener App** (sofort, oberster Eintrag bleibt), **Ausgabe HTML/PDF** unverändert (R-6.2), Messmodus notiert die Stufe.
   - **Prüfungen:** Grundregeln in 14, 17, 23, 33, 53 px (Schalter wie `PRUEF_BEDIENUNG`), Gegenprobe; Prüfliste am Gerät.
2. Danach ‚Fall-Liste Teil 2 ok?‘ → A-43/2 bereit; Version erst nach Ja (0 Nr. 21), höchstens 2 Themen (0 Nr. 8).

## 4. Danach

A-62 Paket B · A-30 (mit Paket D und T-10 Wischaktionen; Kollision Wegwischen hoch klären) · A-32 ‚Problem melden‘ · A-40 Prüfungen
für G-1 bis G-19 · A-44 bis A-60 · A-70 Mehrsprachfähigkeit · T-06 Ausschreibungstexte (Prio 3) · A-01 Startseite (später).

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`), für Konvertierungen auch
**ReiseLogBuch-Import** (privat).

```
Reiselogbuch 0036 – A-43 Barrierefreiheit Teil 2 Textgröße: Fall-Liste Fall für Fall

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann gezielt die Zusammenarbeit (Abschnitte 0 und 1) und die Überschriften der Designrichtlinien; prüfe Modell und Aufwand (Sitzungsdatei) und hole die Repos g811141a/ReiseLogBuch und g811141a/ReiseLogBuch-Import (privat) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘. Gib das Lagebild und mach mit A-43 Teil 2 weiter: Fall-Liste arbeit/A-43 Teil 2 Fall-Liste.md anlegen (Grundlage arbeit/A-43 Teil 2 Klärung.md und Muster) und Fall für Fall im Format von UEBERGABE.md Abschnitt 3 durchgehen (Worum es geht, Aktuell, Apple-Standard, Meine Idee, Meine Empfehlung, Auswahlfenster), je Antwort ein Fall.
```
