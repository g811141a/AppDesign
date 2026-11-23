# P-123 nicht ok – Nachbau, Ursachen, Vorschlag (Sitzung 0160)

**Stand 23.11.2026** · zu Usertest P-123 (Reiselogbuch 3.58.3, AppDesign 4.70.0) · Korrekturversion **AppDesign 4.70.1 / Reiselogbuch 3.58.4**

## 1. Nachbau als feste Prüfung (0 Nr. 1)

Neue Teile in `ReiseLogBuch/tests/ablauf-p120.mjs` (`PRUEF_TEIL=P-123/F-1` …), je genau der Ablauf des Nutzers.

| Teil | Ablauf | gegen 3.58.3 (Chromium / WebKit) | mit dem Vorschlag (Chromium / WebKit) |
|---|---|---|---|
| P-123/F-1 | iPad quer und hoch: Teilen → ‚Vorschau‘ → Teilen gesichert, abgebrochen, PDF → Dateiname im Hinweisfenster | **rot** – 12 / 12 Fehler (3 bzw. 2 Zeilen statt 1, Breite 360 statt 549–558 px) | grün / grün |
| P-123/F-2 | iPhone hoch, iPad quer: Teilen → HTML, Teilen → PDF, Vorschau → Teilen, Vorschau → PDF → Fenster und Höhe des Ergebnisses | **rot** – 5 / 5 Fehler (iPhone: direkt 842 von 852 px im Fenster `dlg`, aus der Vorschau 483 px im Hinweisfenster `msg`) | grün / grün |
| P-123/F-3 | iPad quer, iPhone hoch: vorher Teilen → HTML (Fenster mit Erinnerung, schließen), dann Backup-Kachel → Teilen-Menü abgebrochen bzw. gesichert | **rot** – 4 / 4 Fehler (kein Hinweis; ohne Ausgabe vorher grün) | grün / grün |

Angepasst, weil das Ergebnis künftig im Hinweisfenster steht (grün mit dem Vorschlag, Chromium): `ablauf-p120` Teile P-122/F-2 und P-120/F-3, `ablauf-sperre`, `ablauf-gesamt` (`checkDateiname` für Ausgabe HTML/PDF jetzt in `#msg`).

## 2. Ursachen

- **F-1:** `showOutputResult` öffnet erst das Hinweisfenster (`inform(title, boxes)` mit leeren Kästen), dann setzt die AD-Bean `notice` den Text mit dem Dateinamen ein.
  `alert` misst die Breite (`fitFileName`, `passen()`) nur in `showModal` – da gibt es noch kein `.fname`. Die Vermutung aus 0159 ist damit bestätigt.
- **F-2:** Direkt über Teilen öffnet `showOutputResult` das große Fenster `dlg` (am iPhone ein Blatt in voller Höhe), aus der Vorschau das Hinweisfenster `msg` (seit 3.58.2, P-121/F-2).
- **F-3:** `saveBackup` zeigt den Hinweis nur, wenn `dlg` kein `#reminder` enthält – das Fenster `dlg` behält seinen Inhalt aber auch geschlossen. Nach einer Ausgabe
  (Fenster mit Erinnerung, geschlossen) schweigt jedes spätere Backup. Am iPhone ist es in der Nachbildung genauso (vermutlich ist dort vor /3 ein anderes Fenster
  geöffnet worden, das den Inhalt ersetzt hat – Vermutung).
- **Warum die Prüfung es übersah:** `checkDateiname` prüfte die Breite nur auf dem direkten Weg (Fenster `dlg`), nicht über der Vorschau; die Backup-Prüfungen
  starteten nie nach einer Ausgabe; die Höhe des Ergebnisfensters wurde nicht zwischen den Wegen verglichen.

## 3. So macht es Apple (Quelle: HIG, abgerufen 23.11.2026 als JSON von developer.apple.com)

- [HIG – Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts): „Avoid using an alert merely to provide information.“ ·
  „If you need to add an informative message, keep it as short as possible …“ · „When possible, avoid displaying an alert that scrolls.“
- [HIG – Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets): „If you need to give people important information or present a set of
  choices, consider using an alert or action sheet.“ · „The system defines two detents: large is the height of a fully expanded sheet and medium is about half
  of the fully expanded height.“ · „… the compose sheets in Messages and Mail display only at full height to give people enough room to create content.“
- **Folgerung:** Ein volles Blatt ist für Inhalte zum Erstellen gedacht, nicht für ein kurzes Ergebnis. Für wichtige Informationen nennt die HIG Alert oder Action Sheet.
  **Abweichung:** Ein reiner Erfolgshinweis widerspricht ‚Avoid using an alert merely to provide information‘. Wir behalten ihn trotzdem, denn Designrichtlinie 10
  verlangt eine ehrliche Meldung und die Backup-Erinnerung hat eine Handlung. Die Abweichung besteht schon heute und bleibt unverändert.

## 4. Vorschlag

| Nr. | Änderung | Wo | allgemein / App |
|---|---|---|---|
| F-1 | `alert` misst neu, sobald sich der Inhalt des offenen Fensters ändert (`MutationObserver` auf dem Dialog; die eigene Messprobe zählt nicht) – wirkt für jeden späteren Inhalt, nicht nur für `notice` | AppDesign `v4/ui.js` (`createAlert`) | allgemein |
| F-2 | Das Ergebnis jeder Ausgabe steht **auf jedem Weg im Hinweisfenster** (`inform`) – direkt über Teilen wie aus der Vorschau; so hoch wie nötig, am iPad mittig | Reiselogbuch `index.html` (`showOutputResult`, `exportPdf`) | App (Regel siehe 5) |
| F-3 | `saveBackup(anchor, { inBox })`: der Hinweis ‚Backup‘ kommt immer, außer wenn die Erinnerung das Ergebnis selbst zeigt. Damit verschwindet auch das **zusätzliche Hinweisfenster ‚Backup‘** über der Vorschau (0159 ‚auffällig‘): Das Ergebnis steht in der Erinnerung, wie bisher im Fenster | Reiselogbuch `index.html` | App (gehört später zu APD-148) |

**AD-Bean:** `alert` – neue Eigenschaft: misst die Breite neu, wenn sich der Inhalt des offenen Fensters ändert (`fitFileName` wirkt auch für später eingesetzten Inhalt).

## 5. Wortlaut (0 Nr. 4, 29) – Designrichtlinie 10, Punkt ‚Speichern immer über das Teilen-Menü …‘

**Alt:** „Speichern immer über das Teilen-Menü („In Dateien sichern“); PDF über das Drucken-Menü. Die App meldet ehrlich, dass das Menü geöffnet bzw. abgebrochen
wurde; **der Dateiname steht dabei allein in einer Zeile unter dem Satz (R-10.8).**“

**Neu:** „Speichern immer über das Teilen-Menü („In Dateien sichern“); PDF über das Drucken-Menü. Die App meldet ehrlich, dass das Menü geöffnet bzw. abgebrochen
wurde – **auf jedem Weg im Hinweisfenster** (AD-Bean `alert`, so hoch wie nötig, kein Blatt in voller Höhe; aus der Vorschau darüber); **der Dateiname steht dabei
allein in einer Zeile unter dem Satz (R-10.8).**“

Dazu Designrichtlinie 7, Vorschaufenster: „… nach Teilen bzw. PDF folgt das Ergebnisfenster mit ggf. Backup-Erinnerung.“ → „… nach Teilen bzw. PDF folgt darüber
das Hinweisfenster mit dem Ergebnis und ggf. der Backup-Erinnerung (10).“

## 6. Testfall-Liste (automatisch) – P-123/T-1 bis T-9

| Nr. | Gerät × Lage | Handlung × Daten | Prüfung |
|---|---|---|---|
| T-1 | iPad quer, hoch | Vorschau → Teilen gesichert, langer Dateiname | eine Zeile, Breite wie neu gemessen (`P-123/F-1`) |
| T-2 | iPad quer, hoch | Vorschau → Teilen abgebrochen | dasselbe |
| T-3 | iPad quer, hoch | Vorschau → PDF | dasselbe |
| T-4 | iPad quer, hoch | Teilen → HTML direkt | eine Zeile (`P-123/F-1`) |
| T-5 | iPhone hoch, iPad quer | Teilen → HTML / PDF, Vorschau → Teilen / PDF | dasselbe Fenster, gleich hoch, unter 70 % der Bildschirmhöhe (`P-123/F-2`) |
| T-6 | iPad quer, iPhone hoch | Ausgabe vorher, Backup-Kachel → abgebrochen / gesichert | Hinweis ‚Backup‘ (`P-123/F-3`) |
| T-7 | iPad quer, iPhone hoch | ohne Ausgabe vorher, dasselbe | Hinweis ‚Backup‘ (`P-123/F-3`) |
| T-8 | iPad quer, iPhone hoch | Vorschau → Teilen → Erinnerung ‚Backup erstellen‘ | Ergebnis in der Erinnerung, kein zweites Fenster (`P-122/F-2`) |
| T-9 | alle Ansichten | Dateiname bei Textgröße l, xxxl, ax3, Ausgabe HTML/PDF | `checkDateiname` jetzt im Hinweisfenster (`ablauf-gesamt`) |

Nach jedem Schritt gelten die Grundregeln (`pruefe.mjs`), R-3.10 mittig prüft `hig.mjs`.

## 7. Usertest P-124 (Entwurf)

- **P-124/0 Version prüfen:** iPad und iPhone → Seitenleiste → Mehr → Versionszeile. Erwartet: ‚Reiselogbuch 3.58.4 · AppDesign 4.70.1‘.
- **P-124/1** (iPad quer): 1. Reiselogbuch mit langem Titel öffnen (nicht gesperrt). 2. Teilen → ‚Vorschau‘ → Teilen → ‚In Dateien sichern‘. 3. Erwartet: Hinweisfenster ‚Ausgabe V…‘, der Dateiname steht in einer Zeile, das Fenster ist so breit wie nötig. Dasselbe mit PDF.
- **P-124/2** (iPhone hoch): 1. Teilen (Kopfzeile) → ‚HTML‘ → sichern. 2. Erwartet: Hinweisfenster ‚Ausgabe V…‘ mittig, so hoch wie nötig – genauso wie aus der Vorschau.
- **P-124/3** (iPad quer): 1. Teilen → ‚HTML‘ → sichern, Hinweisfenster schließen. 2. Backup-Kachel ‚Backup erstellen‘ → Teilen-Menü abbrechen. 3. Erwartet: Hinweisfenster ‚Backup‘ mit ‚⚠️ Teilen-Menü abgebrochen …‘.
- **P-124/4** (iPad quer): 1. Teilen → ‚Vorschau‘ → Teilen → sichern. 2. In der Erinnerung ‚Backup erstellen‘ → sichern. 3. Erwartet: Im selben Hinweisfenster steht statt der Erinnerung ‚✅ Teilen-Menü abgeschlossen für …Backup…‘, es öffnet sich kein zweites Fenster ‚Backup‘.

## 8. Bau

- Prüflauf **Stufe voll** (`ui.js` ändert sich). Der letzte volle Lauf dauerte 83:25 (0159).
- **Hinweis zur Nutzungsgrenze:** Laut 0159 sind nur noch rund 3 % übrig, die Grenze wird am 26.11.2026 um 8:00 zurückgesetzt. Ein voller Lauf mit Bau könnte sie
  erreichen (Vermutung). Andernfalls jetzt vorbereiten und übergeben, gebaut wird ab dem 26.11.

## 9. Entscheidungen (Nutzer 23.11.2026, Sitzung 0160, im Fenster)

- **Vorschlag F-1 bis F-3: Ja** – so übernehmen (AD-Bean `alert` neue Eigenschaft; Ergebnis immer im Hinweisfenster; Backup-Hinweis immer, über der Vorschau in der Erinnerung).
- **Wortlaut Designrichtlinie 10 und 7 (Abschnitt 5): Ja** – als allgemeine Regel festhalten (0 Nr. 4, 29); wird mit dem Bau eingetragen.
- **Bau:** noch nicht – ‚Sichere alles und frage dann nach, was als nächstes kommt‘. Stand gesichert auf den Zweigen `arbeit-0160` (AppDesign und ReiseLogBuch); `main` unverändert.
