# Übergabe an die nächste Sitzung

**Stand 02.11.2026** · geschrieben in der Sitzung ‚Reiselogbuch 0074‘ (Usertest P-90, Messung am iPad, Bau und Veröffentlichung 4.49.1 / 3.47.1
mit APD-109; automatische Übergabe, Kontext etwa 300.000, 0 Nr. 13) – Aufbau nach Zusammenarbeit allgemein 2.5.
**Claude liest diese Datei zu Beginn jeder Sitzung zuerst, dann die ganze Zusammenarbeit** (0 Nr. 15); die Arbeitsumgebung steht in der
AppDesign-`CLAUDE.md`.

## 1. Lagebild

| Teil | Version | Datei |
|---|---|---|
| Reiselogbuch | **3.47.1** veröffentlicht (Fassung 4.49.1) | g811141a/ReiseLogBuch |
| AppDesign | **4.49.1** veröffentlicht | g811141a/AppDesign |
| Zusammenarbeit allgemein | **3.5.0** | `README - Zusammenarbeit allgemein.md` |
| AppDesign-`CLAUDE.md` | **2.10.0** | `CLAUDE.md` |
| ReiseLogBuch-Import (privat) | 1.3.0 | g811141a/ReiseLogBuch-Import |

- Alles liegt auf **`main`** (beide Repos); lokale Vorbereitungs-Zweige gelöscht.
- **Chatnummer:** die nächste Sitzung heißt **Reiselogbuch 0075**; die danach 0076.
- **Modell und Aufwand:** in 0074 Opus 5.5, Aufwand hoch, kein `model_fallback`; der Arbeitsprozess wurde dreimal neu gestartet.
- **Sitzungsgröße 0074:** Kontext etwa 300.000 vor der Übergabe.
- **Regelwächter läuft.**
- **Offener Usertest: P-91** (3.47.1, AppDesign 4.49.1) – Testfälle P-91/0 bis P-91/5 im CHANGELOG des Reiselogbuchs; **in der neuen Sitzung
  zuerst die Rückmeldung erfragen** (Auswahlfenster ‚P-91: Wie ist die Prüfung ausgegangen?‘, 2.3), vorher alle Testfälle P-91 vollständig im Chat.
- **Vereinbarung (Nutzer 30.10.2026, Sitzung 0058):** Muster bis auf Weiteres **nur hell** – in jede Übergabe übernehmen.
- **Erinnerung:** ‚Backlog-Erinnerung (AppDesign und Reiselogbuch)‘ montags 8:58.

## 2. Ergebnisse der Sitzung 0074

- **Usertest P-90 nicht ok** (Nutzer 02.11.2026): P-90/1 und /4 am iPad, P-90/2 auf beiden Geräten – Titel antippen ohne Wirkung; /0, /3, /5, /6 ok.
- **Messung am iPad** (`tests/messungen/2026-11-02 iPad quer Titel antippen Messmodus.txt`): mit Messmodus (Hörer am `document`) kam der Klick
  auf den Titel, ohne nicht. Ursache: Safari schickt den Klick auf ein nicht antippbares Element nur mit Hörer am Element, darüber oder am
  `document`; R-2.7 hörte am `window`.
- **4.49.1 / 3.47.1 veröffentlicht** (APD-109, dein Ja 02.11.2026; voller Lauf 136 grün in 61:23 im dritten `los`):
  - R-2.7 hört am `document` (`ui.js`); Designrichtlinie 13 neu ‚Klick nur mit Hörer‘ (Wortlaut bestätigt).
  - Safari-Modell `safariKlick` (`tests/safari.mjs`) in **jeder** Seite (`pruefe.mjs`), Selbsttest `checkSafariKlick` (APD-109/C-1, C-2);
    gegen 3.47.0 rot genau wie am Gerät (iPad Kopfzeile, Seitenleiste, iPhone Startliste), mit 3.47.1 grün.
  - Testfall-Liste `arbeit/APD-109 Testfall-Liste.md`.
  - Erstes `los` rot: Selbsttest APD-109/C-1 in der App-Seite (die App hört jetzt selbst am `document`) und `ablauf-tastatur-still` spielte die neue
    Messung nach – behoben. Zweites `los` rot: Nummer ohne Elternnummer im CHANGELOG, APD-36/B-8 (feste Pause 500 ms, jetzt `warteBis`) und
    `ablauf-markierung-menues` WebKit (R-3.1 `#fPriceOn` 51×31 – allein grün, wackelt unter Last).
- **Selbstkritik 0074:** mehrere Ausgaben ohne Uhrzeitzeile bzw. mit geschätzter Uhrzeit (0 Nr. 26, 27), zwei englische Zwischenmeldungen am
  Anfang (Abschnitt 1), einmal ein Fenster ohne Erklärung und Kontextsatz davor; Selbsttest nach dem Einbau nicht laufen lassen, Nummer ohne
  Elternnummer geschrieben – beides kostete je einen `los`-Lauf (~35 min).

## 3. Nächster Schritt

1. `UEBERGABE.md`, die ganze Zusammenarbeit, Überschriften der Designrichtlinien; Lagebild; Regelwächter; ReiseLogBuch dazuholen (`main`).
2. **Usertest P-91:** alle Testfälle vollständig im Chat, dann Rückmeldung im Auswahlfenster (0 Nr. 22).
3. Danach nach Priorität: **APD-108** (Prio 2, Muster/Testfall-Liste), APD-85 Teil 4 (Laufzeit `ablauf-blatt`, übrige Wackler – dazu
   `ablauf-markierung-menues` WebKit R-3.1 `#fPriceOn` unter Last).

## 4. Danach

APD-62 (APD-38/T-16, APD-38/T-1, APD-38/T-37) · APD-88 · APD-80 · APD-57 · APD-30 · APD-40 · APD-44 bis APD-60 · APD-70 · RLB-6 · APD-1.

## 5. Starttext für die neue Sitzung

In der neuen Sitzung müssen **AppDesign** und **ReiseLogBuch** verfügbar sein; alles liegt auf `main`.

```
Reiselogbuch 0075 – Usertest P-91 (AppDesign 4.49.1)

Lies im Repo g811141a/AppDesign (Branch main) zuerst UEBERGABE.md, dann die GANZE Zusammenarbeit allgemein (Kasten ‚Immer‘ und ‚Jede Antwort‘ oben in Abschnitt 0 gilt ab der ersten Antwort) und die Überschriften der Designrichtlinien. Prüfe Modell und Aufwand (Sitzungsdatei, auch model_fallback), hole das Repo g811141a/ReiseLogBuch (Branch main) dazu, wie in der AppDesign-CLAUDE.md unter ‚Arbeitsumgebung‘, und prüfe, ob der Regelwächter läuft. Gib kurz das Lagebild. Dann zeige alle Testfälle P-91 vollständig im Chat und frage im Auswahlfenster nach der Rückmeldung (UEBERGABE.md 3.).
```
