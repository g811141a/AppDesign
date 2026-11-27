# APD-154 – Testfall-Liste und Befund beim Drehen

**27.11.2026 · Sitzung Reiselogbuch 0169** · **Testfall-Liste APD-154/T-1 bis T-11 freigegeben** (Nutzer 27.11.2026, im Fenster); der Befund ist als **RLB-128** (Prio 1) im Backlog des Reiselogbuchs.
Abgelegt nach Nachricht an AppDesign 0005 (Vorgabe parallele Ketten, `arbeit/APD-149 0004 Parallele Ketten.md`).

## 1. Messung mit 4.71.0 / 3.59.0 (Chromium und WebKit der Prüfumgebung)

Messskripte lagen im Notizordner der Sitzung 0169 (nicht abgelegt). Gedreht wurde quer 1180×820 ↔ hoch 820×1180, hin und zurück.

| Fall | Ergebnis |
|---|---|
| Kontextmenü und Sprechblase ‚Endgültig löschen‘ an der **obersten** Kachel in ‚Zuletzt gelöscht‘, Start quer und Start hoch | **richtig:** daneben, oben bündig mit der Kachel (Oberkante 129 = 129), links bei rechter Rand − 40 (297 = 337 − 40), Kachel bleibt blau |
| Kontextmenü an einer Kachel **weit unten**, Backup-Kachel sichtbar | Vor dem Drehen richtig: Unterkante 1033 = Backup-Kachel 1045 − 12. **Nach dem Drehen liegt die Kachel außerhalb des Bildes** (Oberkante 1251), das Menü bleibt offen daneben |
| Liste ‚Zuletzt gelöscht‘ auf 400 gerollt, dann drehen | **springt nach oben:** `scrollTop` 400 → 48 (WebKit 46), oben z3 → z0 |
| Liste der Reiselogbücher auf 400 gerollt, der gewählte Eintrag (t0) liegt oberhalb des Bildes | **springt zum gewählten Eintrag:** `scrollTop` 400 → 39, oben t3 → t0 |
| Liste der Reiselogbücher, gewählter Eintrag nicht weggerollt | bleibt stehen (400 → 399 bzw. 392) |

## 2. Befund: Die Seitenleiste springt beim Drehen zum gewählten Eintrag (RLB-128)

- **Ursache (belegt im Code):** Nach dem Drehen baut das Reiselogbuch die Seitenleiste neu auf. `keepSideScroll` (`ReiseLogBuch/index.html:1423`) stellt die Rollposition wieder her und rollt dann den gewählten Eintrag ins Bild (`.side-row.current`).
  - Ist der gewählte Eintrag weggerollt, springt die Liste deshalb zu ihm.
  - In ‚Zuletzt gelöscht‘ ist immer einer gewählt (das zuletzt gelöschte ist gleich offen). Dort springt die Liste fast immer.
- **Regel:** R-8.1 ‚Drehen ändert nur die Anordnung … oben bleibt derselbe Eintrag stehen‘. Das ist verletzt.
- **Folge:** Ist dabei ein Kontextmenü an einer Kachel offen, rollt die Kachel aus dem Bild, und das Menü bleibt ohne sichtbare Kachel stehen.
  - Das verletzt Designrichtlinie 15.6: ‚Ist eine Schaltfläche danach nicht mehr da, schließt sich ihr Menü‘.
- **Warum die Prüfung es übersah:**
  - `topKeep` prüft den obersten Eintrag nur im Inhalt (`#app`), nicht in der Seitenleiste.
  - `sideKeep` prüft nur, ob die Seitenleiste sichtbar bleibt.
  - `rotate` hält eine Schaltfläche für ‚da‘, solange sie überhaupt Rechtecke hat (`getClientRects`), auch wenn sie aus der Liste gerollt ist.
- **Vorschlag:** Beim Neuaufbau durch Drehen bzw. eine Größenänderung bleibt die Liste genau stehen, wie bei `sideHold`. Der gewählte Eintrag wird nur ins Bild gerollt, wenn sich die Auswahl ändert.
- **So macht es Apple:** Weiß ich nicht, ich prüfe es vor dem Muster (0 Nr. 23).
- Das ist App-Code (`index.html`), also ein Thema des Reiselogbuchs (RLB). Die Prüfung dafür gehört zu APD-154.
- Eine reine App-Version 3.59.1 wäre ohne AppDesign-Version möglich. Ob die Vorgabe aus AppDesign 0004 auch Reiselogbuch-Versionen anhält, ist offen.

## 3. Testfall-Liste APD-154 (Testfälle automatisch)

Gilt für das iPad. Am iPhone ist die Kachel so breit wie der Bildschirm, das Menü steht darunter, und es bleibt bei der heutigen Prüfung.
Jeder Fall wird quer → hoch → quer und hoch → quer → hoch gedreht, hell und dunkel, in Chromium und WebKit. Nach jedem Drehen gelten die Grundregeln (`pruefe.mjs`).

| Nr. | Fall | Erwartet nach jedem Drehen | Prüfung |
|---|---|---|---|
| T-1 | Kontextmenü (lange drücken) an einer Kachel der Seitenleiste, Kachel oben | daneben: links = min(rechter Rand der Kachel − 40, Bildbreite − Breite − Rand), Oberkante = Oberkante der Kachel (±2 px), ganz sichtbar, Kachel blau | `hig.mjs` – `rotate` |
| T-2 | Sprechblase ‚Endgültig löschen‘ an einer Kachel in ‚Zuletzt gelöscht‘ | wie T-1 | `rotate`; Reiselogbuch `tests/hig.mjs` misst sie am iPad mit Drehen (der Umweg über das iPhone entfällt) |
| T-3 | Kachel weit unten, Menü passt nicht ganz daneben | unten bündig über der Backup-Kachel (Unterkante ≤ Oberkante der Backup-Kachel − 12), nie über den oberen Rand, Inhalt rollt (R-4.5) | `rotate` |
| T-4 | Kein Platz daneben (Menü breiter als der Platz rechts, z. B. große Schrift) | darunter bzw. darüber, linksbündig an der Kachel, ganz sichtbar, über der Backup-Kachel | `rotate` |
| T-5 | Kachel nach dem Drehen nicht mehr im sichtbaren Teil der Liste (zwischen Listenkopf und Backup-Kachel) | das Menü ist zu, die Sprechblase steht mittig und ganz sichtbar | `rotate`: ‚sichtbar‘ heißt künftig im sichtbaren Teil der Liste |
| T-6 | Liste der Reiselogbücher gerollt, gewählter Eintrag weggerollt | oben bleibt derselbe Eintrag stehen (Kennung `data-id`) | neu: `topKeep` auch für `#side .side-list` |
| T-7 | wie T-6 in ‚Zuletzt gelöscht‘ | wie T-6 | wie T-6 |
| T-8 | T-6 mit offenem Kontextmenü an der untersten sichtbaren Kachel | Liste steht still, Menü bleibt an seiner sichtbaren Kachel | `rotate` und `topKeep` |
| T-9 | Gegenprobe ‚beside‘: Menü nach dem Drehen unter die Kachel gerückt | rot: ‚nicht neben der Kachel‘ | `--gegenprobe` (die Stelle genau einmal in `v4/` bzw. `v5/`, APD-153) |
| T-10 | Gegenprobe ‚oben bündig‘: Menü nach dem Drehen 30 px tiefer | rot: ‚nicht oben bündig mit der Kachel‘ | `--gegenprobe` |
| T-11 | Gegenprobe ‚Liste springt‘: `keepSideScroll` rollt wie heute zum gewählten Eintrag | rot: ‚in der Seitenleiste steht oben ein anderer Eintrag‘ | `--gegenprobe` |

- **Rot gegen 4.71.0 / 3.59.0** (0 Nr. 1) müssen sein: T-5, T-6, T-7 und T-8. Das ist mit den Messungen oben belegt.
- T-1 bis T-4 sind vermutlich grün, wo gemessen (T-1, T-2 oben).
- **Wortlaut:** R-8.1 bleibt. Nur der Kommentar in `rotate` wird genauer, und die Spalte Prüfung nennt zusätzlich `topKeep (Seitenleiste)`. Den Wortlaut der Spalte lege ich vor dem Bau vor (0 Nr. 29).
- **AD-Bean:** keine, weil nur Prüfungen.
- **Usertest (am Gerät):** iPad, ‚Zuletzt gelöscht‘ mit vielen Einträgen. Nach unten rollen, ein Kontextmenü öffnen, drehen. Erwartet: Die Liste bleibt stehen, das Menü steht neben seiner Kachel.
- **Wann:** mit `v5/` (AppDesign 5.0.0), nach der Vorgabe aus AppDesign 0004. Der App-Teil (RLB-128) bei Bedarf früher.
