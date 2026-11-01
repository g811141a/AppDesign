# Übergabe an die nächste Sitzung

**Stand 01.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0071‘ (Usertest P-88 ausgewertet, Messung, Muster APD-107 Variante C,
Bau 4.48.2 freigegeben; Übergabe vor dem Bau, weil der Bau über Kontext 300.000 liefe, 0 Nr. 13) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der
AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.46.1** veröffentlicht (Fassung 4.48.1) | g811141a/ReiseLogBuch |
| AppDesign | **4.48.1** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.5.0** | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- Alles liegt auf **`main`** (beide Repos); keine Vorbereitungs-Zweige angelegt.
- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0072**; die danach 0073.
- **Modell und Aufwand:** in 0071 Opus 5.5, Aufwand hoch, kein `model_fallback`; der Arbeitsprozess wurde einmal neu gestartet.
- **Sitzungsgröße 0071:** Kontext etwa 250.000 vor der Übergabe.
- **Regelwächter läuft.**
- **Usertest P-88 ausgewertet (Nutzer 01.11.2026):** /0, /2, /3, /5, /6 ok; **/1 und /4 nicht ok** → APD-107. P-88 bleibt unter ‚prüfen‘, bis
  4.48.2 veröffentlicht ist (dann P-89).
- **Freigegeben (Nutzer 01.11.2026, Sitzung 0071): Bau AppDesign 4.48.2 · Reiselogbuch 3.46.2 mit APD-107 – ‚Ja‘** (0 Nr. 21), Wortlaut R-3.6
  bestätigt und allgemein (0 Nr. 29, 0 Nr. 4) – `arbeit/APD-107 Wortlaut.md`; Testfall-Liste `arbeit/APD-107 Testfall-Liste.md` S-1 bis S-13.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0071

- **P-88/1 Messung** (iPad quer, Safari 26.6.3, `messung-2026-11-01-1603.txt` – nur im Chat, Inhalt in der Testfall-Liste S-A): beim Wegziehen
  in der Kopfzeile meldet Safari **kein pointercancel** und löst beim Loslassen ‚tippen‘ aus; die Sperre `beruehrWeg` (ui.js, R-3.6) gilt nur
  **600 ms ab dem Abbruch** – Loslassen 843 ms danach öffnete das Menü, 558 ms danach nicht. Chromium mit echter Touch-Eingabe (CDP) meldet
  pointercancel – darum nicht nachgestellt. **Korrektur:** das eine Loslassen nach dem Abbruch ist gesperrt, ohne Zeitgrenze (so im Muster).
- **P-88/1 ‚Icon ändert sich gar nicht‘:** Safari berechnet am Gerät Deckkraft 0,35 (Messung APD-106) – zu sehen ist nichts (Vermutung: der
  Finger deckt das Icon). **Muster `arbeit/APD-107 Muster.html`, Variante C gewählt:** ein Leisten-Knopf hebt sich als helle Fläche mit
  Schatten auf das 1,3-Fache über seine Kapsel (CSS im Muster: `.vC button.b`; Leisten = `GROSS_SEL` in ui.js).
- **P-88/4:** der Kreis `.schwebt` (onLongPress, ui.js) hängt an `body` und liegt hinter dem modalen Fenster (oberste Ebene) – Bild in
  Chromium und WebKit. **Korrektur:** in das offene Fenster hängen (`btn.closest('dialog') || document.body`, wie die Großanzeige);
  `checkAnheben` muss prüfen, dass der Kreis zuoberst liegt (z. B. Pixel an seiner Mitte bzw. `elementFromPoint` mit `pointer-events`
  kurz an).
- **Pages hing einmal** (‚in progress deployment‘ von 9a02556; ein Neustart blieb in der Schlange) – ein neuer Commit löste es.
- **Selbstkritik 0071:** ein Fenster ohne ‚(Empfohlen)‘ (vom Regelwächter abgelehnt, W-5); die Anleitung zur Messung zuerst ohne Link (2.3,
  vom Nutzer bemerkt).

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen (`main`).
2. **Bau 4.48.2 / 3.46.2 (APD-107) – das Ja liegt vor** (oben 1.), nicht noch einmal fragen: `arbeit/APD-107 Testfall-Liste.md` und
   `arbeit/APD-107 Wortlaut.md` lesen; Prüfungen zuerst (rot gegen 4.48.1: S-1, S-2, S-4, S-7, S-10, S-12), dann ui.js/design.css in `v4/`,
   Regeltexte (Abschnitt 4, Katalog R-3.6), CHANGELOG mit Testfällen P-89 (Schritt für Schritt), Backlog; veröffentlichen nach der
   AppDesign-`CLAUDE.md`. **Lehre aus 0070:** vor `los` alle Prüfungen suchen, die dieselbe Sperre, Zeit oder Deckkraft messen (`grep` nach
   `beruehrWeg`, `opacity - 0.35`, `.schwebt`, `beruehrt`).
3. Bericht mit allen Änderungen, Usertest **P-89** vollständig im Chat, Fenster ‚P-89: Wie ist die Prüfung ausgegangen?‘.

## 4. Danach

4.49.0: APD-85 Teil 3 · APD-62/T-43 · dann APD-62 (APD-38/T-16, APD-38/T-1, APD-38/T-37) · APD-88 · APD-80 · APD-57 · APD-30 · APD-40 ·
APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0072 – Korrektur 4.48.2 / 3.46.2 (APD-107)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch (Branch main) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild. Dann baue und veröffentliche AppDesign 4.48.2 / Reiselogbuch 3.46.2 mit APD-107 – das Ja des Nutzers liegt vor (UEBERGABE.md 1. und 3., arbeit/APD-107 Testfall-Liste.md und arbeit/APD-107 Wortlaut.md); danach Bericht und Usertest P-89 vollständig im Chat mit dem Fenster ‚P-89: Wie ist die Prüfung ausgegangen?‘.
```
