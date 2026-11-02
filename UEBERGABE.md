# Übergabe an die nächste Sitzung

**Stand 01.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0073‘ (Bau und Veröffentlichung 4.49.0 / 3.47.0 mit APD-62/T-43 und APD-85
Teil 3; automatische Übergabe, Kontext über 300.000, 0 Nr. 13) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der
AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.47.0** veröffentlicht (Fassung 4.49.0) | g811141a/ReiseLogBuch |
| AppDesign | **4.49.0** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.5.0** | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- Alles liegt auf **`main`** (beide Repos); lokale Vorbereitungs-Zweige gelöscht.
- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0074**; die danach 0075.
- **Modell und Aufwand:** in 0073 Opus 5.5, Aufwand hoch, kein `model_fallback`; der Arbeitsprozess wurde einmal neu gestartet.
- **Sitzungsgröße 0073:** Kontext etwa 305.000 vor der Übergabe.
- **Regelwächter läuft.**
- **Offener Usertest: P-90** (3.47.0, AppDesign 4.49.0) – Testfälle P-90/0 bis P-90/6 im CHANGELOG des Reiselogbuchs; **in der neuen Sitzung
  zuerst die Rückmeldung erfragen** (Auswahlfenster ‚P-90: Wie ist die Prüfung ausgegangen?‘, 2.3), vorher alle Testfälle P-90 vollständig im Chat.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0073

- **4.49.0 / 3.47.0 veröffentlicht** (voller Lauf 136 grün in 65:59, davon 1 ‚wackelt‘: `ablauf-blatt` Chromium – Zeitgrenze 10:00 unter Last,
  allein grün; WebKit 9:46):
  - **APD-62/T-43 Titel antippen = nach oben (R-2.7):** Kopfzeile, Seitenleiste, Fenster-Kopfzeile; eigenes Rollen Bild für Bild (Chromium hält
    `scrollTo` smooth unter Last nicht verlässlich an); ein Tipp hält an und löst nichts aus (beim Bau ergänzt, im Bericht genannt);
    `checkTitelOben` APD-62/H-1 bis H-8, `ablauf-titel-oben` in allen Ansichten, Gegenprobe gegen 3.46.2 rot (APD-62/H-10).
  - **APD-85 Teil 3:** `warteBis` in `tests/pruefe.mjs` (Selbsttest in `lauf-selbsttest.mjs`, Gegenprobe rot); `ablauf-blatt` ohne feste Pausen;
    dazu (Ja des Nutzers) die 600 ms in `checkSheet`. Lastprobe APD-85/Z-4 (zehnmal, vierfach langsam): alt 10/10 rot, neu 10/10 grün.
    **APD-85/Z-5 nicht erfüllt:** `ablauf-blatt` dauert unter Last länger (im vollen Lauf Zeitgrenze) – im Backlog APD-85 Teil 4.
- **APD-108 (Prio 2) neu:** Wischen löst in Safari trotzdem einen Tipp aus (`navKlickWeg`).
- **Selbstkritik 0073:** zwei Zwischenmeldungen mit geschätzter Uhrzeit (17:41, 17:51) statt der Zeile des Regelwächters (0 Nr. 26); APD-85/Z-4 zuerst
  so gebaut, dass alt und neu an einer anderen festen Pause scheiterten – erst die Lastprobe zeigte die Pause in `checkSheet`.

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen (`main`).
2. **Usertest P-90:** alle Testfälle vollständig im Chat, dann Rückmeldung im Auswahlfenster (0 Nr. 22).
3. Danach nach Priorität: **APD-108** (Prio 2, Muster/Testfall-Liste), APD-85 Teil 4 (Laufzeit `ablauf-blatt`, übrige Wackler).

## 4. Danach

APD-62 (APD-38/T-16, APD-38/T-1, APD-38/T-37) · APD-88 · APD-80 · APD-57 · APD-30 · APD-40 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0074 – Usertest P-90 (AppDesign 4.49.0)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch (Branch main) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild. Dann zeige alle Testfälle P-90 vollständig im Chat und frage im Auswahlfenster nach der Rückmeldung (UEBERGABE.md 3.).
```
