# Übergabe an die nächste Sitzung

**Stand 31.10.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0062‘ (APD-97 und APD-99 veröffentlicht; automatische Übergabe bei
Kontext 310.872, ‚⚠ Übergabe fällig‘) – Aufbau nach Zusammenarbeit allgemein 2.5. **Claude liest diese Datei zu Beginn jeder Sitzung
zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.43.0** veröffentlicht (Fassung 4.45.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.45.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.4.0** | `README - Zusammenarbeit allgemein.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0063**; die danach 0064.
- **Modell und Aufwand:** Opus 5.5, Aufwand hoch – in 0062 alle Aufrufe so, kein `model_fallback`.
- **Sitzungsgröße 0062:** etwa 311.000 Token.
- **Regelwächter läuft** (`tests/regelwaechter.mjs` jetzt W-1 bis W-14 grün, Gegenprobe grün); **neu W-14**: vor jedem Auswahlfenster ein
  Satz mit ‚Kontext N‘ aus `messung.mjs` (APD-99) – ist die Ausgabe vor dem Fenster nach einem Denkschritt nicht wörtlich gespeichert,
  lässt er durch (Selbstkontrolle).
- **Usertests:** **P-84** (3.43.0, P-84/0 bis P-84/7, CHANGELOG Reiselogbuch) **jetzt prüfbar – Rückmeldung noch nicht erfragt**.
- **Backlog ‚0. Nächste Version‘:** leer (beide Repos).
- **Offen:** Prio 1 APD-38 (Frameworks, gemeinsam durchgehen); Prio 3 APD-85 Teil 3 (Wackler zählen: bisher einer, `ablauf-blatt` in 0061),
  APD-57, APD-80, APD-88, APD-40, APD-62, APD-30, RLB-6 u. a.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** (kein dunkel) – gilt, bis der Nutzer sie
  aufhebt; in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0062

- **APD-68/Q-8 (rot in WebKit am iPad hoch) behoben – in der Prüfung, die App war richtig:** der Mauszug ‚nach links‘ (APD-68/Q-7) begann
  auf einem Link im Kasten und startete Ziehen-und-Ablegen; WebKit schickte danach weder `pointerup` noch `pointercancel`, der nächste
  Klick kam ohne `pointerdown` an. Neu `mausWieFinger` in `tests/safari.mjs` (verhindert `dragstart`), genutzt von `checkNavigation`.
- **Regeltexte (Wortlaut bestätigt):** Designrichtlinie 13 ‚Kein Scroll-Anker‘ (erster Eintrag beim Umbau durch die App: Abstand in px),
  15.4 ‚Drehen‘ (Auslöser nur panel-left bzw. Hereinwischen); Zusammenarbeit 3.4.0 mit APD-99 (Kasten 9 mit **W**, 0 Nr. 28, 0 Nr. 21, 2.8).
- **APD-99 gebaut:** Regelwächter W-14 (`pruefeKontext`), Testfall-Liste `arbeit/APD-99 Testfall-Liste.md` (APD-99/C-1 bis C-13).
- **APD-94 hinfällig durch APD-97** (Erledigt); `ablauf-markierung-menues` dreht mit offenem Menü in beide Richtungen.
- **Veröffentlicht:** `los` – alle 124 Läufe grün in 51:01; danach brach das Skript beim Zusammenführen nach `main` ab (Konflikt in
  `UEBERGABE.md`: auf `main` lag die Übergabe an 0062, im Zweig die ältere). Behoben von Hand: Fassung von `main` behalten, die übrigen
  Schritte des Skripts einzeln (push, Pages-Läufe beider Repos ‚success‘, `AD_VERSION` 4.45.0 in `v4/ui.js` und `fassung/4.45.0/ui.js`,
  `APP_VERSION` 3.43.0 und `AD_NEEDED` 4.45.0 auf `main`). Lokale Vorbereitungs-Zweige gelöscht.
- **Selbstkritik 0062:** vier Zwischenmeldungen ohne Uhrzeitzeile (vom Wächter gemeldet), zwei Uhrzeiten eine Minute daneben (04:05 bzw.
  04:15 statt 04:04 bzw. 04:14); vor den Fenstern zu Regel 13 und 15.4 fehlte der Kontextstand (Selbstkontrolle APD-99) – Fall 13 ist jetzt
  echter Fall der Prüfung.
- **Der erste `los` wurde von der Prüfung der Rechte gesperrt** (‚Production Deploy‘); der Nutzer hat ihn im Fenster bestätigt.

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen (beide
   Repos auf `main`).
2. **Rückmeldung zu P-84** erfragen: alle Testfälle P-84/0 bis P-84/7 wörtlich aus dem CHANGELOG Reiselogbuch 3.43.0 im Chat, dann das
   Fenster ‚P-84: Wie ist die Prüfung ausgegangen?‘ (2.3). Bei ‚alles ok‘: Backlog P-84 nach Erledigt (APD-97 am Gerät bestätigt).
3. **Vorschlag fragen (0 Nr. 24, noch nicht im Backlog):** `veroeffentlichen.mjs los` führt `main` vorher in den Vorbereitungs-Zweig
  zusammen bzw. bricht **vor** dem vollen Prüflauf ab, wenn `main` neuer ist (z. B. eine Übergabe) – in 0062 lief der Prüflauf 51 min, dann
  der Konflikt. Empfehlung Prio 2.

## 4. Danach

APD-38 · APD-85 Teil 3 (Wackler zählen) · APD-80 · APD-88 · APD-57 · APD-62 Paket B · APD-30 · APD-32 · APD-40 · APD-44 bis APD-60 · APD-70 ·
RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein (alles auf Branch `main`).

```
Reiselogbuch 0063 – Rückmeldung P-84 (3.43.0 / 4.45.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild, dann alle Testfälle P-84 im Chat und frage im Auswahlfenster nach der Rückmeldung (UEBERGABE.md 3).
```
