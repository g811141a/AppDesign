# Bau-Frage AppDesign 4.57.0 / Reiselogbuch 3.55.0

**Stand 08.11.2026** · Sitzung ‚Reiselogbuch 0105‘ · zurzeit **keine gültige Freigabe** (in 0103 zweimal ‚Nein‘)

## RLB-120 erledigt (diese Sitzung)

Wortlaut W-8a/W-8b bestätigt, Testfall B-11 ok. RLB-120 steht jetzt in beiden Backlogs unter ‚0.‘ und in `arbeit/4.57.0 Testfall-Liste.md` (Abschnitt 1, Abschnitt 2 B-1 bis B-11, Abschnitt 3 P-101/15 und /16). Gepusht: AppDesign `301f75a`, ReiseLogBuch `de5599a`.

## Alle bereiten Punkte (10)

| Thema | Punkte | Inhalt |
|---|---|---|
| **Eingabefelder** | APD-126, APD-124, RLB-123 | Cursor beim ersten Antippen am Ende, leeres Feld einzeilig · Rückgängig-Icon nach dem Leeren · Verlauf-Vorschläge über dem Feld, am Ende, klein weiter (**behebt P-100/1**) |
| **Darstellung** | RLB-120 (AppDesign + App), RLB-122 (AppDesign + App), APD-116 | Tageskachel und Kopfverlauf · Statistik-Umbruch nur nach ‚·‘ · Dateiname allein in einer Zeile |
| **Gleiten** | APD-127 | Gleitbewegungen wie die Seitenleiste in Notizen, R-1.12 |
| **Regeltext** | APD-125 | Zusammenarbeit 3.11.0: Datei vor jeder Kachel |

## Hinweis 0 Nr. 8 (Sammelversionen)

Höchstens 2 Themen je Version, 2–3 Punkte. Alle 10 Punkte sind **vier Themen**. P-100/1 ist ein Fehler aus der Prüfrunde – ‚Korrekturen sofort‘ vor allem Neuen.

**Vorschlag (Empfehlung): aufteilen**

1. **4.57.0 / 3.55.0 – Eingabefelder** (APD-126, APD-124, RLB-123) **+ APD-125** (nur Regeltext). Behebt P-100/1. ← diese Bau-Frage
2. **4.58.0 / 3.56.0 – Darstellung** (RLB-120, RLB-122, APD-116), nach dem Usertest von 1.
3. **4.59.0 – Gleiten** (APD-127), danach.

Die Testfall-Liste ist für alle bestätigt; beim Bau wird sie auf die Punkte der Version gekürzt, die Testfälle (User) P-101 neu nummeriert.

## Auffällig (nicht von mir verursacht)

Die Doku-Prüfung (`ReiseLogBuch/tests/doku-regeln.mjs`) meldet schon auf `main` **35 Fehler**: lokale Nummern ohne Themennummer davor (z. B. ohne ‚RLB-122/‘ vor der lokalen Nummer) in `arbeit/` – APD-116 Klärung, APD-124 Klärung, RLB-120 Klärung, RLB-122 Klärung und Muster-Prüfungen, 4.57.0 Testfall-Liste, BACKLOG.md Zeile 17 (APD-124). Meine Änderungen von heute fügen keinen hinzu (vorher und nachher gleich viele, nach Korrektur der neuen Datei 35). Der volle Lauf in `los` würde daran rot. **Vorschlag:** beim Bau als Erstes die Themennummer davorsetzen (reine Schreibweise, kein Inhalt).

## Ablauf nach ‚Ja‘

1. Vorbereitungs-Zweige `vorbereitung-4.57.0` (AppDesign) und `vorbereitung-3.55.0` (ReiseLogBuch), `veroeffentlichen.mjs vorbereiten`.
2. Doku-Fehler oben beheben; bauen nach der Testfall-Liste, dabei nur die betroffenen Prüfungen.
3. CHANGELOG mit Testfällen P-101, Backlog, Versionsgeschichten; `… fassung`; committen.
4. `veroeffentlichen.mjs los --app reiselogbuch` im Hintergrund: voller Prüflauf, erst AppDesign, dann die App, Pages (~60 min).
5. Bericht mit allen Änderungen und Usertest P-101.

## Offene Usertests

- **P-100** (Reiselogbuch 3.54.0, AppDesign 4.56.0): ok bis auf **P-100/1** (Verlauf-Vorschläge) → RLB-123, kommt mit 3.55.0.

## Backlog-Erinnerung

Nächste Version AppDesign 4.57.0: **7 Punkte bereit** (APD-125, APD-126, APD-127, APD-124, APD-116, RLB-122-Teil, RLB-120-Teil) · Reiselogbuch 3.55.0: **3 Punkte bereit** (RLB-123, RLB-122, RLB-120) · Offen im Backlog: RLB-121 · RLB-6 · APD-85 Teil 6 (Wackler WebKit) · APD-80 · APD-30 · APD-57 · APD-62.

## Ergebnis

**‚Ja, alle 10 Punkte‘** (Nutzer 08.11.2026, Sitzung 0105) – **gültige Bau-Freigabe** für AppDesign 4.57.0 / Reiselogbuch 3.55.0 mit APD-125, APD-126,
APD-127, APD-124, APD-116, RLB-122 (AppDesign-Teil und App), RLB-120 (AppDesign-Teil und App), RLB-123 – eine Version mit vier Themen, bewusst abweichend
von 0 Nr. 8 (Nutzer). Testfall-Liste `arbeit/4.57.0 Testfall-Liste.md` vollständig (P-101/0 bis /16), dazu als Erstes die 35 Doku-Fehler (Schreibweise).

## Kontext vor dem Bau

Kontext beim ‚Ja‘: **196.356** (Übergabe ab etwa 300.000, 0 Nr. 13 – nie mitten in einem Bau). Zehn Punkte bauen braucht deutlich mehr als die
verbleibenden etwa 100.000; eine Übergabe mitten im Bau verbietet 0 Nr. 13. **Empfehlung:** jetzt übergeben, die neue Sitzung 0106 baut mit der hier
festgehaltenen Freigabe von Anfang an.
