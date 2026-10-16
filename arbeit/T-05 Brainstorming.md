# T-05 – Brainstorming: Ablauf für die Übernahme der alten Reiselogbücher

Stand 16.10.2026 · Sitzung ‚Reiselogbuch 0007 – T-05 Alte Reiselogbücher‘ · geklärt sind schon: alle Formen
(Word/PDF, Excel, Fotos/HTML), mehr als 10 Stück, Weg **a2** (Datei nur mit den alten Reisen → ‚Backup laden‘ →
‚Abgleichen‘).

Jede Idee hat eine Nummer (I-1 …) und meine Empfehlung. Die Entscheidungen kommen danach im Auswahlfenster.

---

## 1. Wo die Dateien liegen – ⚠️ wichtig

- **Beide Repos (ReiseLogBuch, AppDesign) sind öffentlich** – nötig für GitHub Pages. Was dort hochgeladen wird,
  kann jeder lesen und es bleibt in der Geschichte, auch nach dem Löschen.
- Alte Reiselogbücher sind privat (Namen, Hotels, Bewertungen, Ausgaben).

| | Idee | Bewertung |
|---|---|---|
| **I-1** | **Neues privates Repo** `g811141a/ReiseLogBuch-Import` (Empfehlung): Ordner je Reiselogbuch mit den Originalen, daraus erstellte Dateien, Fragen, Status | jede Sitzung findet alles wieder, beliebig viele Dateien, nichts Öffentliches; du legst es auf GitHub an (aus der Cloud kann ich kein Repo anlegen) und lädst die Dateien über die GitHub-App/Webseite hoch |
| I-2 | Anhang im Chat | einfach, aber nur in dieser Sitzung vorhanden; bei mehr als 10 Reiselogbüchern über mehrere Sitzungen unpraktisch |
| I-3 | öffentliches Repo | **nein** – Datenschutz |

## 2. Reihenfolge – erst ein Probelauf

- **I-4 Probelauf (Empfehlung):** zuerst **ein** Reiselogbuch je Form (z. B. 1× Word, 1× Excel, 1× Fotos). Daran
  legen wir die **Zuordnungsregeln** fest (Abschnitt 3). Erst danach der Rest – dann fast ohne Rückfragen.
- **I-5 Stapel:** danach 3–4 Reiselogbücher je Runde, eine Datei je Runde zum Laden.
- Alternative: alle auf einmal – viele Rückfragen gleichzeitig, Fehler wirken sich auf alle aus.

## 3. Zuordnung: alte Unterlage → Felder der App

Die App kennt je Reise: Titel, Teilnehmer (Pflicht), Von/Bis, Reisemittel; je Tag: Wetter, Verlauf, Wie war was?,
Essen und Trinken, Quartier (+ Ort für Google Maps); am Ende Fazit und Gesamtausgaben. **Fotos (als Bilder) gibt es
in der App nicht** – Fotos werden nur gelesen (Text auf den Bildern), nicht übernommen.

- **I-6 Zuordnungsregeln als Tabelle** in einer Datei `Regeln.md` (im Import-Repo): z. B. ‚Überschrift „3. Tag“ →
  Datum aus Reisebeginn + 2‘, ‚Hotel/Unterkunft → Quartier‘, ‚Bewertung, Eindruck → Wie war was?‘, ‚Restaurant →
  Essen und Trinken‘. Gilt für alle weiteren Reiselogbücher und später für **T-06** (Ausschreibungen).
- **I-7 Text bleibt wie er ist (Empfehlung):** nichts umformulieren, nichts erfinden. Nur aufräumen: eine Zeile je
  Punkt, offensichtliche Tippfehler bleiben (oder: korrigieren – Frage im Fenster).
- **I-8 Smileys und Wetter nur, wenn sie in der Unterlage stehen** (oder eindeutig beschrieben sind: ‚sonnig‘ → ☀️).
  Keine geschätzten Bewertungen.
- **I-9 Fehlende Angaben:** Jahr fehlt, Tage ohne Datum, Teilnehmer fehlen → **Frage**, nie raten. Fehlt etwas
  nicht Pflichtiges, bleibt das Feld leer.

## 4. Rückfragen – gesammelt statt einzeln

- **I-10 Eine Fragenliste je Reiselogbuch** (Datei vor dem Fenster), die eindeutigen Fragen im Auswahlfenster (bis
  4), der Rest als Antwortzeile (`1 a · 2 ja …`). Was die Regeln (I-6) schon beantworten, wird nicht gefragt.
- **I-11 Unsicheres markieren:** Wo ich nur vermute (unleserliche Handschrift auf Fotos), steht es in der Vorschau
  gelb hinterlegt.

## 5. Vorschau

- **I-12 Vorschau = echte Ausgabe der App (Empfehlung):** Ich lade die erstellte Datei automatisch in die echte App
  (Prüfbrowser) und erzeuge daraus die **HTML/PDF-Ausgabe** der App – du siehst genau, was später auf dem iPad steht.
  Dazu je Reiselogbuch eine kurze Gegenüberstellung ‚Original-Seite ↔ übernommen‘ für Stichproben.
- Alternative: einfache Tabelle als Markdown – schneller, aber nicht das echte Bild.

## 6. Überschneidungen und doppeltes Laden

- **I-13 Feste Kennungen (Empfehlung):** jede alte Reise bekommt eine feste `id` aus Titel und Reisebeginn
  (z. B. `import-2019-05-12-kreta`). Lädst du eine **korrigierte** Datei noch einmal, **aktualisiert** ‚Abgleichen‘
  die Reise statt sie doppelt anzulegen. Was du inzwischen auf dem iPad geändert hast, bleibt (neuere Felder gewinnen).
- **I-14 Abgleich mit dem Bestand:** Du gibst mir einmal ein aktuelles Backup (ins private Repo). Ich prüfe, ob eine
  alte Reise schon in der App ist (gleicher Zeitraum oder ähnlicher Titel) und frage nach: weglassen, ergänzen oder
  getrennt behalten.
- Innerhalb der alten Unterlagen: dieselbe Reise in zwei Dateien (z. B. Word **und** Excel) → zusammenführen, Frage
  nur bei Widerspruch.

## 7. Automatische Prüfung jeder erstellten Datei

- **I-15 Prüfskript** (nur im Import-Repo, kein Teil der App, keine App-Version): lädt jede Datei über ‚Backup
  laden‘ → ‚Abgleichen‘ in die echte App und prüft: wird gelesen, alle Reisen ‚hinzugefügt‘, kein Tag außerhalb von
  Von/Bis, Pflichtfelder gefüllt, kein leerer Tag, Zeichen (Umlaute, Emojis) korrekt, nichts doppelt. Mit Fall-Liste
  (Zusammenarbeit 0 Nr. 1).
- **I-16 Prüfliste für dich auf dem iPad:** vorher Backup erstellen → Datei laden → Abgleichen → Stichprobe → bei
  Fehler: altes Backup mit ‚Ersetzen‘ zurück.

## 8. Überblick über mehr als 10 Reiselogbücher

- **I-17 Statusliste** `Status.md` im Import-Repo: je Reiselogbuch eine Zeile – erhalten · ausgelesen · Fragen offen ·
  Vorschau ok · Datei erstellt · auf dem iPad geladen. Jede neue Sitzung macht dort weiter (Übergabe).
- **I-18 Sitzungen:** etwa 3–5 Reiselogbücher je Sitzung (Grenze 300.000 Token). Optional ein Hilfsagent je
  Reiselogbuch für das reine Auslesen (klar abgegrenzt, 0 Nr. 2).

## 9. Werkzeuge (geprüft in dieser Umgebung)

- Word (`python-docx`, LibreOffice für alte `.doc`), PDF (`pdfplumber`, `pdftotext`), Excel (`openpyxl`, LibreOffice
  für `.xls`), HTML (`BeautifulSoup`) – vorhanden.
- Fotos: lese ich selbst (Bilderkennung); eine Texterkennung (OCR-Programm) ist nicht installiert und wird nicht
  gebraucht. Handschrift geht, ist aber unsicherer → I-11.

## 10. Was ich empfehle (kurz)

1. Privates Repo `ReiseLogBuch-Import` (I-1)
2. Probelauf mit je einem Reiselogbuch pro Form (I-4), danach Stapel zu 3–4 (I-5)
3. Text unverändert, nichts erfinden (I-7, I-8, I-9)
4. Vorschau als echte App-Ausgabe (I-12)
5. Feste Kennungen + Abgleich mit deinem aktuellen Backup (I-13, I-14)
6. Prüfskript und Statusliste im Import-Repo (I-15, I-17)

---

## Entscheidungen (16.10.2026)

1. Ablage: **Anhang im Chat** (I-2) – kein privates Repo
2. Reihenfolge: schreibt der Nutzer im Chat
3. Text: **Tippfehler korrigieren**, sonst unverändert (statt I-7)
4. I-8 bis I-18: **ja, alle** – offen, wo Prüfskript, Statusliste und das aktuelle Backup liegen, weil es kein privates
   Repo gibt (Vorschlag: Prüfskript ohne Daten in `ReiseLogBuch/werkzeug/`, Statusliste nur mit Nummer und Jahr)

## Neuausrichtung (16.10.2026)

Der Nutzer: nur Eingabedatei → Backup-Datei umformen. Entschieden: privates Repo `ReiseLogBuch-Import` mit Anleitung
(`PROMPT.md`), Prüfskript (`werkzeug/pruefen.mjs`) und `CLAUDE.md`; **Daten nur im Chat**. Übernommen bleiben
Tippfehler korrigieren, nichts erfinden, Rückfragen gesammelt, feste Kennungen, Prüfung in der echten App. Entfallen:
Statusliste, Vorschau als App-Ausgabe, Probelauf und Stapel. Neu: Startfrage (Zusammenarbeit 0 Nr. 19).
