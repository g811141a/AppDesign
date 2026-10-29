# Übergabe an die nächste Sitzung

**Stand 26.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0050‘ (Usertest P-76, Analyse Regelwerk APD-84, Klärung APD-81) –
Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung zuerst** (0 Nr. 15); die
Arbeitsumgebung steht in der AppDesign-`CLAUDE.md` (mit den Chromium-Verweisen für Chrome 153 unter ‚Tests einrichten‘).

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.36.0** (Fassung 4.38.0) | g811141a/ReiseLogBuch – `CHANGELOG.md`, `BACKLOG.md`, `PROMPT.md` |
| AppDesign | **4.38.0** (feste Fassungen 4.14.0–4.38.0) | g811141a/AppDesign – `CHANGELOG.md`, `BACKLOG.md`, `ZUORDNUNG.md` |
| Zusammenarbeit allgemein | **2.20.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0051**; die danach 0052.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0050 beides richtig (Sitzungsdatei `"effort":"high"`, `CLAUDE_CODE_EFFORT_LEVEL=high`).
- **Sitzungsgröße 0050:** etwa 285.000 Token – Übergabe nach 0 Nr. 13 nach der Klärung von APD-81.
- **Offene Usertests:** keine. **P-76 geprüft:** nicht ok bei P-76/4 Schritt 3 (→ APD-83), alles andere ok (APD-72 bestätigt).
- **Offene Frage an den Nutzer (zuerst stellen, Auswahlfenster):** ‚Soll ich Version AppDesign 4.39.0 / Reiselogbuch 3.37.0 mit
  APD-84 (Regelwerk nach Plan, Zusammenarbeit 3.0.0, Regelwächter) und APD-83 (Fensterbreite) erstellen?‘ – ‚Ja (Empfohlen)‘ ·
  ‚Nein, erst besprechen‘ · ‚Ich schreibe im Chat‘. Der Nutzer hat den **Plan bestätigt** (‚Passt‘), den Bau aber noch nicht
  freigegeben (in 0050 dreimal ‚Nein‘ zu einer Version, zuletzt ‚Ich schreibe im Chat‘).
- **Backlog-Spitze:** ‚0. Nächste Version‘ – APD-83 (Prio 1, Korrektur aus P-76), APD-81 (geklärt), APD-77, P-75/6; APD-84
  (Prio 1, Plan bestätigt) in ‚2.‘; danach APD-80 (Kontrast dunkel – Austausch im Chat), APD-38.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0050

- **P-76/4 Schritt 3 nachgestellt (0 Nr. 1):** Mit dem ersten Buchstaben im Reisetitel erscheint der Hinweis zum überschneidenden
  Zeitraum (vorgeschlagen heute + 14 Tage, laufende Reise); das iPad-Fenster ist `width: fit-content` und wächst mit dem langen Satz
  (876 → 968 px, 46 px nach links); das ⓧ ist nicht die Ursache. Feste Prüfung **ReiseLogBuch `tests/ablauf-fenster-breite.mjs`**
  (RLB-107, im Repo, noch nicht in `tests/alle.mjs` und `tests/README.md`): rot gegen 3.36.0 (je 6 Fehler Chromium/WebKit), mit
  `dialog .warn { contain: inline-size; }` grün. Allgemeine Regel (Ja): ein offenes Fenster ändert Breite und Lage nicht → APD-83.
- **APD-84 Regelwerk:** Analyse und Plan in `arbeit/APD-84 Konsolidierung Regelwerk Analyse und Plan.md` (APD-84/M-1 bis M-7, Entwurf des
  Kastens ‚Jede Antwort‘, Regelwächter als Hooks über das Setup-Skript der Umgebung). Das Prüfskript für den Wächter lag in 0050
  nur als Probe im Notizordner (nicht im Repo) – neu schreiben nach Plan APD-84/M-3.
- **APD-81 geklärt** (`arbeit/APD-81 Klärung.md`): ⓧ oben rechts, ab zwei Zeilen erst Sprechblase ‚Text löschen?‘, alle mehrzeiligen
  Felder, allgemeine Regel (R-5.6, Abweichung in 16).
- **Selbstkritik 0050 (Anlass APD-84):** Fenster ohne ‚(Empfohlen)‘, Antworten ohne Fenster, Zeitzeile vor dem Fenster, Zwischenmeldungen
  ohne bzw. mit **geschätzter** Uhrzeit, `git checkout main` auf veralteten lokalen `main`. Bis zum Bau von APD-84 gilt in jeder
  Antwort der Kasten ‚Jede Antwort‘ aus dem Plan (Abschnitt 4).

## 3. Nächster Schritt

1. **Die ganze Zusammenarbeit lesen** (Plan APD-84/M-1, vom Nutzer bestätigt) und den Plan APD-84; Kasten ‚Jede Antwort‘ ab der
   ersten Antwort einhalten.
2. Lagebild (kurz), dann die offene Frage aus 1 im Auswahlfenster.
3. Bei Ja: Testfall-Liste (0 Nr. 1) für APD-84 und APD-83, dann bauen und veröffentlichen (4.39.0 / 3.37.0); dem Nutzer den Text für
   das Setup-Skript geben. APD-77, APD-81 und P-75/6 erst in der Version danach (nach Rückfrage).

## 4. Danach

APD-77 · APD-81 · P-75/6 · APD-80 Kontrast dunkel (Austausch) · APD-38 · APD-62 Paket B · APD-30 · APD-32 · APD-40 · APD-44 bis
APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`).

```
Reiselogbuch 0051 – APD-84 Regelwerk und APD-83 (4.39.0 / 3.37.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein und arbeit/APD-84 Konsolidierung Regelwerk Analyse und Plan.md, dazu die Überschriften der Designrichtlinien; halte ab der ersten Antwort den Kasten ‚Jede Antwort‘ aus dem Plan (Abschnitt 4) ein. Prüfe Modell und Aufwand (Sitzungsdatei) und hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘ (mit den Chromium-Verweisen unter ‚Tests einrichten‘). Gib kurz das Lagebild und stelle dann die offene Frage aus UEBERGABE.md 1 im Auswahlfenster (Bau 4.39.0 mit APD-84 und APD-83).
```
