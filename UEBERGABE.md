# Übergabe an die nächste Sitzung

**Stand 31.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0065‘ (Usertest P-85 ok, APD-101 und APD-102 geklärt und bereit; Übergabe
vor dem Bau, damit der Bau mit frischem Kontext läuft, 0 Nr. 13) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu
Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.44.0** veröffentlicht (Fassung 4.46.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.46.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.4.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- Alles liegt auf **`main`** (beide Repos).
- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0066**; die danach 0067.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0065 alle Aufrufe so, kein `model_fallback`.
- **Sitzungsgröße 0065:** etwa 245.000 Token (Kontext 242.689 vor der Übergabe); der Arbeitsprozess wurde mehrmals neu gestartet.
- **Regelwächter läuft.** Lücke gefunden: nach einem Neustart des Arbeitsprozesses stehen Ausgaben nicht wörtlich in der Sitzungsdatei –
  ein Fenster ohne Satz ‚Kontext N‘ ging durch (jetzt APD-103).
- **Usertests offen:** keine (P-85 alles ok, Nutzer 31.10.2026).
- **Backlog ‚0. Nächste Version‘:** AppDesign **2 Punkte bereit** (APD-101, APD-102); Reiselogbuch **1 Punkt bereit** (APD-101).
- **Offen:** Prio 1 APD-38 (Frameworks, gemeinsam durchgehen); Prio 2 APD-103 (Regelwächter-Lücke APD-84/W-14); Prio 3 APD-85 Teil 3 (Wackler
  zählen: bisher einer, `ablauf-blatt` in 0061), APD-57, APD-80, APD-88, APD-40, APD-62, APD-30, RLB-6 u. a.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** (kein dunkel) – gilt, bis der Nutzer sie
  aufhebt; in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0065

- **P-85 alles ok** – in beiden Backlogs unter ‚Erledigt‘.
- **APD-101 bereit** (aus RLB-113/E-6): ein mit ‚…‘ gekürzter Titel in Kopfzeile (15.3) oder Fenster-Kopfzeile (15.8) zeigt beim langen
  Drücken den ganzen Titel in einer **Sprechblase darunter** (Variante B, Muster `arbeit/bilder/APD-101 4` und `5`) – nur wenn gekürzt,
  bleibt bis Tippen (der Tipp schließt nur sie), Rollen, Esc oder Drehen; neue Regel **R-2.5**. Apple-Abgleich belegt (Apple-Ingenieur,
  developer.apple.com/forums/thread/831754; WWDC 2019/261): Apple zeigt die Großanzeige in der Mitte – unsere Sprechblase ist eine
  Abweichung (Wunsch des Nutzers, HIG-Checkliste 16). Testfall-Liste `arbeit/APD-101 Testfall-Liste.md` (APD-101/L-1 bis L-13), Wortlaut
  `arbeit/APD-101 Wortlaut.md` (15.8, 15.3, R-2.5, Zeile ‚Keine Großanzeige‘ in 16) – beides bestätigt. Leisten-Knöpfe (Großanzeige mit
  Icon) später als eigenes Thema vorschlagen.
- **APD-102 bereit** (aus 0062): `veroeffentlichen.mjs los` holt vor dem Prüflauf `origin/main` und führt neuere Commits in die
  Vorbereitungs-Zweige zusammen; bei Konflikt Abbruch **vor** dem Prüflauf. Testfall-Liste
  `arbeit/APD-102 Testfall-Liste.md` (APD-102/M-1 bis M-8, im Selbsttest), Wortlaut `CLAUDE.md` in `arbeit/APD-102 Wortlaut.md` (auch ‚~60 min‘ statt ‚~8 min‘) – bestätigt.
- **APD-103 neu** (Prio 2): Regelwächter lässt ein Fenster durch, wenn die Ausgabe davor nicht gespeichert ist.
- **Selbstkritik 0065:** eine englische Zwischenmeldung ohne Uhrzeitzeile; ein Fenster (Vorschlag 1) ohne Erklärung und ohne Satz
  ‚Kontext N‘ nach einem Neustart; eine geschätzte Uhrzeit (14:51 statt 14:48); ein Commit mit roter Doku-Prüfung (APD-84/W-14 ohne
  Elternnummer, sofort korrigiert).

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen (`main`),
   Tests einrichten (AppDesign-`CLAUDE.md`).
2. **Version bauen – das Ja liegt vor** (Nutzer 31.10.2026, Sitzung 0065: ‚Soll ich Version AppDesign 4.47.0 mit Reiselogbuch 3.45.0 mit
   APD-101 und APD-102 erstellen?‘ – ‚Ja – in Sitzung 0066‘). Nicht erneut fragen. Ablauf: Vorbereitungs-Zweige `vorbereitung-4.47.0` und
   `vorbereitung-3.45.0`; `vorbereiten --ad 4.47.0 --app reiselogbuch=3.45.0`; APD-101: Baustein in `v4/ui.js`/`design.css` (Sprechblase am
   gekürzten Titel von `.dlg-head h3`, `.nb-title`, `.pnav-title`; `onLongPress`, R-3.5), neue Prüfung `ablauf-titel-blase` im Reiselogbuch
   (rot gegen 3.44.0, Gegenprobe), R-2.5 in `ablauf.mjs`; Wortlaut unverändert aus `arbeit/APD-101 Wortlaut.md`; APD-102: `los` nach
   Testfall-Liste, Fälle APD-102/M-1 bis M-8 im Selbsttest, `CLAUDE.md` nach `arbeit/APD-102 Wortlaut.md`; Texte (CHANGELOG mit Testfällen P-86,
   Backlog, Versionsgeschichten); `fassung`; committen; `los --app reiselogbuch` im Hintergrund. Mit APD-102 gebaut führt `los` eine
   neuere `main` schon selbst zusammen.
3. Bericht mit Usertest **P-86** vollständig im Chat (iPhone hoch, größte Schrift: Fenstertitel, Titel der Reise, Titel des Tages lange
   drücken; bei normaler Schrift nichts).

## 4. Danach

APD-38 · APD-103 · Vorschlag ‚Großanzeige für Leisten-Knöpfe‘ (aus APD-101) · APD-85 Teil 3 (Wackler zählen) · APD-80 · APD-88 · APD-57 ·
APD-62 Paket B · APD-30 · APD-32 · APD-40 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0066 – Version bauen: AppDesign 4.47.0 · Reiselogbuch 3.45.0 (APD-101, APD-102)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch (Branch main) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild und baue dann die Version AppDesign 4.47.0 mit Reiselogbuch 3.45.0 mit APD-101 und APD-102 – das Ja liegt vor (UEBERGABE.md 3.2), Wortlaut und Testfall-Listen in arbeit/APD-101 … und arbeit/APD-102 ….
```
